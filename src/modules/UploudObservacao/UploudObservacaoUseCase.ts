import { payloadUploadObservacao } from '../SapiensOperations/RequestPayload';
import { ResponseProcess } from '../SapiensOperations/Response/ResponseProcess';

export class UploudObservacaoUseCase {
  async execute(ProcessSapiens: ResponseProcess, observacao: string) {
    const payload = payloadUploadObservacao.execute(ProcessSapiens, observacao);
  }
}
