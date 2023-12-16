import { MinhaErroPersonalizado } from '../../../Help/ErroMessage';
import { getXPathText } from '../../../Help/GetTextoPorXPATH';
import { ResponseFolder } from '../../SapiensOperations/Response/ResponseFolder';
import { coletarCitacao } from '../Help/coletarCitacao';
import { getInformaçoesIniciasDosBeneficiosSuperDosprev } from '../Help/getInformaçoesIniciasDosBeneficiosSuperDosprev';
import { getInformaçoesSecudariaDosBeneficiosSuperDossie } from '../Help/getInformaçoesSecudariaDosBeneficiosSuperDossie';

export class GetNewDosprevForSamirFromSuperSapies {
  async execute(
    paginaDosprev: any,
    processo_id: string,
    idDosprev: number,
    idComponentesGigitais: number,
    arrayDeDocumentos: ResponseFolder,
    tarefaId: string,
  ) {
    const xpaththInformacaoCabecalho = '/html/body/div/div[3]/p/strong';
    const informacaoDeCabeçalho = getXPathText(
      paginaDosprev,
      xpaththInformacaoCabecalho,
    );

    const informacaoDeCabecalhoNaoExiste = !informacaoDeCabeçalho;
    if (informacaoDeCabecalhoNaoExiste) {
      throw new MinhaErroPersonalizado('DOSPREV FORA DO PRAZO DE VALIDADE');
    }

    // eslint-disable-next-line no-var
    var beneficios =
      await getInformaçoesIniciasDosBeneficiosSuperDosprev(paginaDosprev);

    if (beneficios.length <= 0) {
      throw new MinhaErroPersonalizado('DOSPREV SEM BENEFICIO VALIDOS');
    }

    beneficios = await getInformaçoesSecudariaDosBeneficiosSuperDossie(
      beneficios,
      paginaDosprev,
    );

    const xptahNumeroProcesso = '/html/body/div/div[4]/table/tbody/tr[1]/td';
    const numeroDoProcesso: string | undefined = getXPathText(
      paginaDosprev,
      xptahNumeroProcesso,
    )?.replace(/\D/g, '');
    console.log(numeroDoProcesso);
    const xpathdataAjuizamento = '/html/body/div/div[4]/table/tbody/tr[2]/td';
    const dataAjuizamento: string | null = getXPathText(
      paginaDosprev,
      xpathdataAjuizamento,
    );
    console.log(dataAjuizamento);
    const xpathNome = '/html/body/div/div[4]/table/tbody/tr[6]/td';
    const nome: string | null = getXPathText(paginaDosprev, xpathNome);
    console.log(nome);
    const xpathCpf = '/html/body/div/div[4]/table/tbody/tr[7]/td';
    const cpf: string | null = getXPathText(paginaDosprev, xpathCpf);
    console.log(cpf);
    const urlProcesso = `https://supersapiens.agu.gov.br/apps/processo/${processo_id}/visualizar/${idDosprev}-${idComponentesGigitais}`;
    console.log(urlProcesso);

    const citacao = coletarCitacao(arrayDeDocumentos);
    console.log(citacao);
    console.log(tarefaId);
    return beneficios;
  }
}
