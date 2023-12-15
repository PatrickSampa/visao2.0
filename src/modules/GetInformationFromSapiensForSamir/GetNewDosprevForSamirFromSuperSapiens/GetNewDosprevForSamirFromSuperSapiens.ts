import { MinhaErroPersonalizado } from '../../../Help/ErroMessage';
import { getXPathText } from '../../../Help/GetTextoPorXPATH';
import { getInformaçoesIniciasDosBeneficiosSuperDosprev } from '../Help/getInformaçoesIniciasDosBeneficiosSuperDosprev';

export class GetNewDosprevForSamirFromSuperSapies {
  async execute(paginaDosprev: any) {
    const xpaththInformacaoCabecalho = '/html/body/div/div[3]/p/strong';
    const informacaoDeCabeçalho = getXPathText(
      paginaDosprev,
      xpaththInformacaoCabecalho,
    );

    const informacaoDeCabecalhoNaoExiste = !informacaoDeCabeçalho;
    if (informacaoDeCabecalhoNaoExiste) {
      throw new MinhaErroPersonalizado('DOSPREV FORA DO PRAZO DE VALIDADE');
    }

    const beneficios =
      await getInformaçoesIniciasDosBeneficiosSuperDosprev(paginaDosprev);

    return beneficios;
  }
}
