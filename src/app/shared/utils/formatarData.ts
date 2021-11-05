export function formatarData(data: string, formatoBanco?: boolean) {
  let novaData = new Date(data);

  if (formatoBanco)
    return novaData.toLocaleDateString('pt-br').split('/').reverse().join('-');

  return novaData.toLocaleDateString('pt-br');
}