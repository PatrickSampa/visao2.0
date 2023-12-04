//import axios from 'axios';
import { getUserResponsibleIdUseCase } from '../GetUserResponsibleId';
import { loginUserCase } from '../Login';
//import { getXPathText } from '../../Help/GetTextoPorXPATH';
//const { JSDOM } = require('jsdom');
//import { decodeBase64FileWithHash } from '../../Help/teste';
import { getTarefaUseCase } from '../GetTarefa';
import { ResponseProcess } from '../SapiensOperations/Response/ResponseProcess';
import { getPastaUseCase } from '../GetPasta';

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
        const getPasta = getPastaUseCase.execute({ processo_id, limit, token });
      }

      /* const idDossprev =
        responseArvoreDocumento.data.entities[0].documento
          .componentesDigitais[0].id;

      const dossieBody = await axios.get(
        `https://supersapiensbackend.agu.gov.br/v1/administrativo/componente_digital/${idDossprev}/download?context=%7B%7D`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const dosprevCriptografado = decodeBase64FileWithHash(
        dossieBody.data.conteudo.split('base64')[1].slice(1),
      );

      const paginaDosprevFormatada = new JSDOM(dosprevCriptografado);
      const testeee = getXPathText(
        paginaDosprevFormatada,
        '/html/body/div/p[2]/b',
      ); */
      return getPasta;
    } catch (e) {
      throw new Error('ERRO AO FAZER A TRIAGEM SAPIENS');
    }
  }
}
