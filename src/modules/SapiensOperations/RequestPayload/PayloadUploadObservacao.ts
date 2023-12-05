import { CalculeDate } from '../../../Help/CalculoComDate';
import { ResponseProcess } from '../Response/ResponseProcess';

export class PayloadUploadObservacao {
  async execute(data: ResponseProcess, observacao: string) {
    return `{
    @context: "/api/doc/#model-Tarefa"
    @id: "/v1/administrativo/tarefa/${data[0].processo.id}"
    @type: "Tarefa"
    blocoProcessos: null
    blocoResponsaveis: null
    dataHoraDistribuicao: null
    dataHoraFinalPrazo: ${data[0].dataHoraFinalPrazo}
    dataHoraInicioPrazo: ${data[0].dataHoraInicioPrazo}
    dataHoraLeitura: ${data[0].dataHoraLeitura}
    diasUteis: null
    distribuicaoAutomatica: ${data[0].distribuicaoAutomatica}
    especieTarefa: ${data[0].especieTarefa.id}
    folder: null
    grupoContato: null
    isRelevante: ${data[0].isRelevante}
    localEvento: null
    locked: ${data[0].locked}
    observacao: ${observacao}
    postIt: ${data[0].postIt == null ? null : data[0].postIt}
    prazoDias: ${await CalculeDate(
      data[0].dataHoraInicioPrazo,
      data[0].dataHoraFinalPrazo,
    )}
    processo: ${data[0].processo.id}
    processos: null
    setorOrigem: ${data[0].setorOrigem.id}
    setorResponsavel: ${data[0].setorResponsavel.id}
    setores: null
    urgente: ${data[0].urgente}
    usuarioResponsavel: ${data[0].usuarioResponsavel.id}
    usuarios: null
    }`;
  }
}
