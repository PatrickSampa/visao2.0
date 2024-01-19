export class RequestUrlNumberProcess{
    async execute(id: string){
        return `https://supersapiensbackend.agu.gov.br/v1/administrativo/tarefa/count?where=%7B%22usuarioResponsavel.id%22:%20%22eq:${id}%22,%20%22dataHoraConclusaoPrazo%22:%20%22isNull%22%7D&context=%7B%7D`
    }
}