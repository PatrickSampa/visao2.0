import axios from 'axios';
import { getUserResponsibleIdUseCase } from '../GetUserResponsibleId';
import { loginUserCase } from '../Login';
import { getXPathText } from '../../Help/GetTextoPorXPATH';
const { JSDOM } = require('jsdom');
import { Buffer } from 'buffer';
import { decodeBase64FileWithHash } from '../../Help/teste';

export class GetInformationFromSapiensForSamirUseCase {
  async execute(
    email: string,
    password: string,
    etiqueta_sapiens: string,
  ): Promise<string | null> {
    const token = await loginUserCase.execute({ email, password });
    const user_id = await getUserResponsibleIdUseCase.execute(token);
    const limit = 333;

    const URL = `https://supersapiensbackend.agu.gov.br/v1/administrativo/tarefa?where=%7B%22usuarioResponsavel.id%22:%22eq:${user_id}%22,%22dataHoraConclusaoPrazo%22:%22isNull%22,%22especieTarefa.generoTarefa.nome%22:%22eq:ADMINISTRATIVO%22,%22folder.id%22:%22isNull%22,%22andX%22:%5B%7B%22observacao%22:%22like:%25${etiqueta_sapiens}%25%22%7D%5D%7D&limit=50&offset=0&order=%7B%7D&populate=%5B%22processo%22,%22setor.especieSetor%22,%22setor.generoSetor%22,%22setor.parent%22,%22setor.unidade%22,%22processo.especieProcesso%22,%22processo.especieProcesso.generoProcesso%22,%22processo.modalidadeMeio%22,%22processo.documentoAvulsoOrigem%22,%22especieTarefa%22,%22usuarioResponsavel%22,%22setorResponsavel%22,%22setorResponsavel.unidade%22,%22setorOrigem%22,%22setorOrigem.unidade%22,%22especieTarefa.generoTarefa%22,%22vinculacoesEtiquetas%22,%22vinculacoesEtiquetas.etiqueta%22,%22vinculacaoWorkflow%22,%22vinculacaoWorkflow.workflow%22,%22criadoPor%22,%22atualizadoPor%22,%22apagadoPor%22,%22folder%22%5D&context=%7B%22modulo%22:%22administrativo%22%7D`;

    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const processo_id = response.data.entities[0].processo.id;

    const urlDossiesPrev = `https://supersapiensbackend.agu.gov.br/v1/administrativo/juntada?where=%7B%22volume.processo.id%22:%22eq:${processo_id}%22,%22vinculada%22:%22eq:0%22,%22andX%22:%5B%7B%22documento.tipoDocumento.id%22:%22eq:3084%22%7D%5D%7D&limit=${limit}&offset=0&order=%7B%22numeracaoSequencial%22:%22DESC%22%7D&populate=%5B%22volume%22,%22documento%22,%22documento.componentesDigitais%22,%22documento.origemDados%22,%22documento.tipoDocumento%22,%22documento.criadoPor%22,%22documento.setorOrigem%22,%22documento.setorOrigem.unidade%22,%22documento.vinculacoesDocumentos%22,%22documento.vinculacoesDocumentos.documentoVinculado%22,%22documento.vinculacoesDocumentos.documentoVinculado.juntadaAtual%22,%22documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento%22,%22documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais%22,%22documento.vinculacoesEtiquetas%22,%22documento.vinculacoesEtiquetas.etiqueta%22,%22origemDados%22%5D&context=%7B%7D`;

    const responseArvoreDocumento = await axios.get(urlDossiesPrev, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const dossie = responseArvoreDocumento.data.entities[0];
    console.log(dossie);
    const dossieBody = await axios.get(
      'https://supersapiensbackend.agu.gov.br/v1/administrativo/componente_digital/1152466538/download?context=%7B%7D',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const teste = Buffer.from(dossieBody.data.conteudo, 'base64');
    console.log(teste);

    const dosie = decodeBase64FileWithHash(
      dossieBody.data.conteudo.split('base64')[1].slice(1),
    );

    const novdossie = new JSDOM(dosie);
    const testeee = getXPathText(
      novdossie,
      '/html/body/div/div[1]/table/tbody/tr[1]/td',
    );
    return testeee;
  }
}
