//import axios from 'axios';
import { getUserResponsibleIdUseCase } from '../GetUserResponsibleId';
import { loginUserCase } from '../Login';

const { JSDOM } = require('jsdom');
//import { decodeBase64FileWithHash } from '../../Help/teste';
import { getTarefaUseCase } from '../GetTarefa';
import { ResponseProcess } from '../SapiensOperations/Response/ResponseProcess';
import { getPastaUseCase } from '../GetPasta';
import { ResponseFolder } from '../SapiensOperations/Response/ResponseFolder';
import { uploudObservacaoUseCase } from '../UploudObservacao';
import { uploadPaginaDosprevUseCase } from '../UploadPaginaDosprev';

import { coletarCitacao } from './Help/coletarCitacao';
import { getNewDosprevForSamirFromSuperSapies } from './GetNewDosprevForSamirFromSuperSapiens/index';

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
      let objetoDosprevFinal;
      let verifyDosprevOld: boolean = false;

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
        console.log(ProcessSapiens[i].processo.id);
        if (getArvoreDocumento.length <= 0) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[i]],
            'DOSPREV NÃO ENCONTRADO',
            token,
          );
          continue;
        }

        const objectDosPrevMaisAtual = getArvoreDocumento.find((Documento) => {
          const movimento = Documento?.descricao.split('.');
          return movimento[0] == 'JUNTADA DOSSIE DOSSIE PREVIDENCIARIO REF';
        });

        const objetoAntigoDosprevMaisAtual = getArvoreDocumento.find(
          (Documento) =>
            Documento?.documento?.tipoDocumento?.sigla == 'DOSPREV',
        );

        if (!objectDosPrevMaisAtual && !objetoAntigoDosprevMaisAtual) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[i]],
            'DOSPREV NÃO ENCONTRADO',
            token,
          );
          continue;
        } else if (objectDosPrevMaisAtual && !objetoAntigoDosprevMaisAtual) {
          objetoDosprevFinal = objectDosPrevMaisAtual;
        } else if (objetoAntigoDosprevMaisAtual && !objectDosPrevMaisAtual) {
          objetoDosprevFinal = objetoAntigoDosprevMaisAtual;
          verifyDosprevOld = true;
        } else {
          if (
            objetoAntigoDosprevMaisAtual?.numeracaoSequencial != undefined &&
            objectDosPrevMaisAtual?.numeracaoSequencial != undefined &&
            objetoAntigoDosprevMaisAtual?.numeracaoSequencial >
              objectDosPrevMaisAtual?.numeracaoSequencial
          ) {
            objetoDosprevFinal = objetoAntigoDosprevMaisAtual;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            verifyDosprevOld = true;
          } else if (
            objetoAntigoDosprevMaisAtual?.numeracaoSequencial != undefined &&
            objectDosPrevMaisAtual?.numeracaoSequencial != undefined &&
            objetoAntigoDosprevMaisAtual?.numeracaoSequencial <
              objectDosPrevMaisAtual?.numeracaoSequencial
          ) {
            objetoDosprevFinal = objectDosPrevMaisAtual;
          } else {
            await uploudObservacaoUseCase.execute(
              [ProcessSapiens[i]],
              'DOSPREV COM FALHA NA LEITURA',
              token,
            );
            continue;
          }
        }

        if (Object.keys(objetoDosprevFinal).length == 0) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[i]],
            'DOSPREV COM FALHA NA LEITURA',
            token,
          );
          continue;
        }
        console.log('citacao ' + coletarCitacao(getArvoreDocumento));
        if (objetoDosprevFinal.documento.componentesDigitais.length <= 0) {
          await uploudObservacaoUseCase.execute(
            [ProcessSapiens[i]],
            'DOSPREV COM FALHA NA PESQUISA',
            token,
          );
          continue;
        }

        const parginaDosprev = await uploadPaginaDosprevUseCase.execute(
          objetoDosprevFinal.documento.componentesDigitais[0].id,
          token,
        );

        const paginaDosprevFormatada = new JSDOM(parginaDosprev);

        const idDosprev = objetoDosprevFinal.id;
        const idComponentesGigitais =
          objetoDosprevFinal.documento.componentesDigitais[0].id;
        const tarefaId = ProcessSapiens[i].id;
        console.log(
          await getNewDosprevForSamirFromSuperSapies.execute(
            paginaDosprevFormatada,
            processo_id,
            idDosprev,
            idComponentesGigitais,
            getArvoreDocumento,
            tarefaId,
          ),
        );

        return objetoDosprevFinal;
      }
    } catch (e) {
      throw new Error('ERRO AO FAZER A TRIAGEM SAPIENS');
    }
  }
}
