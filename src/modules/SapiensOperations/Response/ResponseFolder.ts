export type ResponseFolder = [
  {
    '@type': string;
    '@id': string;
    '@context': string;
    numeracaoSequencial: number;
    documento: {
      '@type': string;
      '@id': string;
      '@context': string;
      areasTrabalhos: Array<any>;
      numeroFolhas: number;
      dataHoraProducao: string;
      semEfeito: boolean;
      assinado: boolean;
      autor: string;
      redator: string;
      tipoDocumento: {
        '@type': string;
        '@id': string;
        '@context': string;
        id: number;
        uuid: string;
        nome: string;
        sigla: string;
        descricao: string;
        ativo: boolean;
        criadoEm: string;
        atualizadoEm: string;
      };
      observacao: string;
      copia: boolean;
      minuta: boolean;
      setorOrigem: {
        '@type': string;
        '@id': string;
        '@context': string;
        ativo: boolean;
        sigla: string;
        unidade: {
          '@type': string;
          '@id': string;
          '@context': string;
          ativo: boolean;
          endereco: string;
          email: string;
          sigla: string;
          expansable: boolean;
          prefixoNUP: string;
          sequenciaInicialNUP: number;
          divergenciaMaxima: number;
          apenasProtocolo: boolean;
          numeracaoDocumentoUnidade: boolean;
          apenasDistribuidor: boolean;
          distribuicaoCentena: boolean;
          prazoEqualizacao: number;
          apenasDistribuicaoAutomatica: boolean;
          comPrevencaoRelativa: boolean;
          hasChild: boolean;
          id: number;
          uuid: string;
          nome: string;
          criadoEm: string;
          atualizadoEm: string;
        };
        expansable: boolean;
        prefixoNUP: string;
        sequenciaInicialNUP: number;
        divergenciaMaxima: number;
        gerenciamento: boolean;
        apenasProtocolo: boolean;
        numeracaoDocumentoUnidade: boolean;
        apenasDistribuidor: boolean;
        distribuicaoCentena: boolean;
        prazoEqualizacao: number;
        apenasDistribuicaoAutomatica: boolean;
        comPrevencaoRelativa: boolean;
        hasChild: boolean;
        id: number;
        uuid: string;
        nome: string;
        criadoEm: string;
        atualizadoEm: string;
      };
      componentesDigitais: [
        {
          '@type': string;
          '@id': string;
          '@context': string;
          fileName: string;
          hash: string;
          numeracaoSequencial: number;
          tamanho: number;
          nivelComposicao: number;
          mimetype: string;
          extensao: string;
          editavel: boolean;
          assinado: boolean;
          highlights: string;
          id: number;
          uuid: string;
          criadoEm: string;
          atualizadoEm: string;
        },
      ];
      acessoRestrito: boolean;
      id: number;
      uuid: string;
      criadoEm: string;
      atualizadoEm: string;
      criadoPor: {
        '@type': string;
        '@id': string;
        '@context': string;
        username: string;
        nome: string;
        assinaturaHTML: string;
        email: string;
        enabled: boolean;
        nivelAcesso: number;
        roles: Array<any>;
        coordenadores: Array<any>;
        validado: boolean;
        reset: boolean;
        isDisponivel: boolean;
        id: number;
        uuid: string;
        atualizadoEm: string;
      };
      origemDados: {
        '@type': string;
        '@id': string;
        '@context': string;
        dataHoraUltimaConsulta: string;
        servico: string;
        fonteDados: string;
        status: number;
        id: number;
        uuid: string;
        criadoEm: string;
        atualizadoEm: string;
      };
    };
    volume: {
      '@type': string;
      '@id': string;
      '@context': string;
      numeracaoSequencial: number;
      encerrado: boolean;
      id: number;
      uuid: string;
      criadoEm: string;
      atualizadoEm: string;
    };
    descricao: string;
    id: number;
    uuid: string;
    ativo: boolean;
    criadoEm: string;
    atualizadoEm: string;
    origemDados: {
      '@type': string;
      '@id': string;
      '@context': string;
      dataHoraUltimaConsulta: string;
      servico: string;
      fonteDados: string;
      status: number;
      id: number;
      uuid: string;
      criadoEm: string;
      atualizadoEm: string;
    };
  },
];
