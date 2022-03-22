export function formatarDataPtBr(data: string) {
    let novaData = new Date(data);
    return novaData.toLocaleDateString('pt-br');
}

export function formatarDataParaRequest(dataPtBr: string) {
    return dataPtBr.split('/').reverse().join('-');
}
