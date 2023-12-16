import { IBeneficiosDTO } from '../../../DTO/BeneficiosDTO';
import { correçaoDoErroDeFormatoDoSapiens } from '../../../Help/CorreçaoDoErroDeFormatoDoSapiens';
import { getXPathText } from '../../../Help/GetTextoPorXPATH';

export async function getInformaçoesSecudariaDosBeneficiosSuperDossie(
  beneficios: IBeneficiosDTO[],
  paginaHTML_DOSPREV_Formatada: any,
): Promise<IBeneficiosDTO[]> {
  const numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio = 20;
  const numeroInicialParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio = 1;
  const numeroMaxioParaProcurarATabelaDoBeneeficio = 50;
  const numeroInicialParaProcurarATabelaDoBeneeficio = 1;
  for (
    let idexDoBeneficio = 0;
    idexDoBeneficio < beneficios.length;
    idexDoBeneficio++
  ) {
    for (
      let idexDaDivParaPesquisarAtabela =
        numeroInicialParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio;
      idexDaDivParaPesquisarAtabela <=
      numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio;
      idexDaDivParaPesquisarAtabela++
    ) {
      for (
        let indexDaTabela = numeroInicialParaProcurarATabelaDoBeneeficio;
        indexDaTabela <= numeroMaxioParaProcurarATabelaDoBeneeficio;
        indexDaTabela++
      ) {
        const xpathNbDaTabela =
          '/html/body/div/div[' +
          idexDaDivParaPesquisarAtabela +
          ']/div[' +
          indexDaTabela +
          ']/table[1]/tbody/tr/td[2]';
        const nb = getXPathText(paginaHTML_DOSPREV_Formatada, xpathNbDaTabela);
        let especieDifenteDoBeneficio;

        const xpathEspecie =
          'html/body/div/div[' +
          idexDaDivParaPesquisarAtabela +
          ']/div[' +
          indexDaTabela +
          ']/table[1]/tbody/tr/td[3]';
        const especie = getXPathText(
          paginaHTML_DOSPREV_Formatada,
          xpathEspecie,
        );

        const divInvalidaParaPesquisa = nb == null;
        if (divInvalidaParaPesquisa) {
          break;
        }

        const especieExist = especie ? especie.split('-')[0].trim() : null;
        if (!especieExist) {
          continue;
        } else {
          especieDifenteDoBeneficio =
            especieExist ==
            beneficios[idexDoBeneficio].beneficio?.split('-')[0].trim();
          if (!especieDifenteDoBeneficio) {
            continue;
          }
        }

        const nb_EstaDiferenteDoBeneficio =
          nb.trim() != beneficios[idexDoBeneficio].nb;
        if (nb_EstaDiferenteDoBeneficio && especieDifenteDoBeneficio) {
          continue;
        }

        const xphatRMI =
          '/html/body/div/div[' +
          idexDaDivParaPesquisarAtabela +
          ']/div[' +
          indexDaTabela +
          ']/table[2]/tbody/tr/td[1]';
        const rmi = correçaoDoErroDeFormatoDoSapiens(
          getXPathText(paginaHTML_DOSPREV_Formatada, xphatRMI),
        );
        beneficios[idexDoBeneficio].rmi = rmi;

        const xpathDIP =
          '/html/body/div/div[' +
          idexDaDivParaPesquisarAtabela +
          ']/div[' +
          indexDaTabela +
          ']/table[1]/tbody/tr/td[8]';
        const dip = correçaoDoErroDeFormatoDoSapiens(
          getXPathText(paginaHTML_DOSPREV_Formatada, xpathDIP),
        );
        beneficios[idexDoBeneficio].dip = dip;

        const xpathDibAnterior =
          '/html/body/div/div[' +
          idexDaDivParaPesquisarAtabela +
          ']/div[' +
          indexDaTabela +
          ']/table[2]/tbody/tr/td[6]';
        const dibAnterior = correçaoDoErroDeFormatoDoSapiens(
          getXPathText(paginaHTML_DOSPREV_Formatada, xpathDibAnterior),
        );

        beneficios[idexDoBeneficio].dibAnterior = dibAnterior;
        idexDaDivParaPesquisarAtabela =
          numeroMaximoParaProcurarAPosiçaoDasDivDaTabelaDeBeneficio;
        indexDaTabela = numeroMaxioParaProcurarATabelaDoBeneeficio;
      }
    }
  }

  return await beneficios;
}
