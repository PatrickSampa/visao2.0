export class RequestUrlPasta {
  async execute(processo_id: string, limit: number) {
    return `https://supersapiensbackend.agu.gov.br/v1/administrativo/juntada?where=%7B%22volume.processo.id%22:%22eq:${processo_id}%22,%22vinculada%22:%22eq:0%22,%22andX%22:%5B%7B%22documento.tipoDocumento.id%22:%22eq:186%22%7D%5D%7D&limit=${limit}&offset=0&order=%7B%22numeracaoSequencial%22:%22DESC%22%7D&populate=%5B%22volume%22,%22documento%22,%22documento.componentesDigitais%22,%22documento.origemDados%22,%22documento.tipoDocumento%22,%22documento.criadoPor%22,%22documento.setorOrigem%22,%22documento.setorOrigem.unidade%22,%22documento.vinculacoesDocumentos%22,%22documento.vinculacoesDocumentos.documentoVinculado%22,%22documento.vinculacoesDocumentos.documentoVinculado.juntadaAtual%22,%22documento.vinculacoesDocumentos.documentoVinculado.tipoDocumento%22,%22documento.vinculacoesDocumentos.documentoVinculado.componentesDigitais%22,%22documento.vinculacoesEtiquetas%22,%22documento.vinculacoesEtiquetas.etiqueta%22,%22origemDados%22%5D&context=%7B%7D`;
  }
}
