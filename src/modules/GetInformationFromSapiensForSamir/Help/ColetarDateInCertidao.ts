import { ResponseFolder } from '../../SapiensOperations/Response/ResponseFolder';

export async function coletarDateInCertidao(arrayDeDocument: ResponseFolder) {
  let numeroCertidao;

  for (let i = arrayDeDocument.length - 1; i >= 0; i--) {
    const movimento = arrayDeDocument[i]?.descricao.split('.');
    if (movimento[0] == 'JUNTADA DOSSIE DOSSIE PREVIDENCIARIO REF') {
      numeroCertidao = i;
      break;
    }

    if (arrayDeDocument[i]?.documento?.tipoDocumento?.sigla == 'DOSPREV') {
      numeroCertidao = i;
      break;
    }
  }
  if (
    !numeroCertidao ||
    arrayDeDocument[numeroCertidao + 1].documento.tipoDocumento.descricao !=
      'CERTIDÃO'
  )
    return null;

  if (
    arrayDeDocument[numeroCertidao + 1].documento.tipoDocumento.descricao ==
    'CERTIDÃO'
  )
    return arrayDeDocument[numeroCertidao + 1].documento.dataHoraProducao
      .split(' ')[0]
      .split('-');
}
