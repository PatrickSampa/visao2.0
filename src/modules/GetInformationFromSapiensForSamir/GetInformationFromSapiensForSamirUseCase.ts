import axios from 'axios';
import { getUserResponsibleIdUseCase } from '../GetUserResponsibleId';
import { loginUserCase } from '../Login';

export class GetInformationFromSapiensForSamirUseCase {
  async execute(
    email: string,
    password: string,
    etiqueta_sapiens: string,
  ): Promise<string> {
    const token = await loginUserCase.execute({ email, password });
    const user_id = await getUserResponsibleIdUseCase.execute(token);

    const URL = `https://supersapiensbackend.agu.gov.br/v1/administrativo/tarefa?where=%7B%22usuarioResponsavel.id%22:%22eq:${user_id}%22,%22dataHoraConclusaoPrazo%22:%22isNull%22,%22especieTarefa.generoTarefa.nome%22:%22eq:ADMINISTRATIVO%22,%22folder.id%22:%22isNull%22,%22andX%22:%5B%7B%22postIt%22:%22like:%25${etiqueta_sapiens}%25%22%7D%5D%7D&limit=10&offset=0&order=%7B%7D&populate=%5B%22processo%22,%22setor.especieSetor%22,%22setor.generoSetor%22,%22setor.parent%22,%22setor.unidade%22,%22processo.especieProcesso%22,%22processo.especieProcesso.generoProcesso%22,%22processo.modalidadeMeio%22,%22processo.documentoAvulsoOrigem%22,%22especieTarefa%22,%22usuarioResponsavel%22,%22setorResponsavel%22,%22setorResponsavel.unidade%22,%22setorOrigem%22,%22setorOrigem.unidade%22,%22especieTarefa.generoTarefa%22,%22vinculacoesEtiquetas%22,%22vinculacoesEtiquetas.etiqueta%22,%22vinculacaoWorkflow%22,%22vinculacaoWorkflow.workflow%22,%22criadoPor%22,%22atualizadoPor%22,%22apagadoPor%22,%22folder%22%5D&context=%7B%22modulo%22:%22administrativo%22%7D`;

    const response = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
}
