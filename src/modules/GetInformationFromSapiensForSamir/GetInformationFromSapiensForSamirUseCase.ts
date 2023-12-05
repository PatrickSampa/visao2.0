//import axios from 'axios';
import { getUserResponsibleIdUseCase } from '../GetUserResponsibleId';
import { loginUserCase } from '../Login';
import { getXPathText } from '../../Help/GetTextoPorXPATH';
const { JSDOM } = require('jsdom');
//import { decodeBase64FileWithHash } from '../../Help/teste';
import { getTarefaUseCase } from '../GetTarefa';
import { ResponseProcess } from '../SapiensOperations/Response/ResponseProcess';
import { getPastaUseCase } from '../GetPasta';
import { ResponseFolder } from '../SapiensOperations/Response/ResponseFolder';
import { uploudObservacaoUseCase } from '../UploudObservacao';
import { uploadPaginaDosprevUseCase } from '../UploadPaginaDosprev';
import { VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie } from '../../Help/VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie';

export class GetInformationFromSapiensForSamirUseCase {
  async execute(
    username: string,
    password: string,
    observacao_sapiens: string,
  ): Promise<string | null | unknown> {
    try {
      const token = await loginUserCase.execute({ username, password });
      const user_id = await getUserResponsibleIdUseCase.execute(token);
      const limit = 333;

      const ProcessSapiens: ResponseProcess = await getTarefaUseCase.execute({
        user_id,
        observacao_sapiens,
        token,
      });
      for (let i = 0; i <= ProcessSapiens.length - 1; i++) {
        const processo_id = ProcessSapiens[i].processo.id;
        const getArvoreDocumento: ResponseFolder =
          await getPastaUseCase.execute({
            processo_id,
            limit,
            token,
          });

        if (getArvoreDocumento.length <= 0) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[0]],
            'DOSPREV NÃO ENCONTRADO',
            token,
          );
          continue;
        }

        const objectDosPrevMaisAtual = getArvoreDocumento.find((Documento) => {
          const movimento = Documento.descricao.split('.');
          return movimento[0] == 'JUNTADA DOSSIE DOSSIE PREVIDENCIARIO REF';
        });

        if (
          objectDosPrevMaisAtual == null ||
          objectDosPrevMaisAtual == undefined ||
          Object.keys(objectDosPrevMaisAtual).length == 0
        ) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[0]],
            'DOSPREV NÃO ENCONTRADO',
            token,
          );
          continue;
        }

        if (objectDosPrevMaisAtual.documento.componentesDigitais.length <= 0) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[0]],
            'DOSPREV COM FALHA NA PESQUISA',
            token,
          );
          continue;
        }

        const parginaDosprev = await uploadPaginaDosprevUseCase.execute(
          objectDosPrevMaisAtual.documento.componentesDigitais[0].id,
          token,
        );

        const xpaththInformacaoCabecalho = '/html/body/div/div[3]/p/strong';
        const paginaDosprevFormatada = new JSDOM(parginaDosprev);
        const informacaoDeCabeçalho = getXPathText(
          paginaDosprevFormatada,
          xpaththInformacaoCabecalho,
        );

        const informacaoDeCabecalhoNaoExiste = !informacaoDeCabeçalho;
        if (informacaoDeCabecalhoNaoExiste) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[0]],
            'DOSPREV FORA DO PRAZO DO PRAZO DE VALIDADE',
            token,
          );
          continue;
        }
        console.log(
          VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie(
            informacaoDeCabeçalho,
          ),
        );

        if (
          0 >
          VerificaçaoDaQuantidadeDeDiasParaInspirarOSuperDossie(
            informacaoDeCabeçalho,
          )
        ) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[0]],
            'DOSPREV FORA DO PRAZO DO PRAZO DE VALIDADE',
            token,
          );
          continue;
        }

        return informacaoDeCabeçalho;
      }
    } catch (e) {
      throw new Error('ERRO AO FAZER A TRIAGEM SAPIENS');
    }
  }
}
