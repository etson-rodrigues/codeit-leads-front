export function cnpjValidator(strCNPJ: string) {
    strCNPJ = strCNPJ.replace(/[^0-9]+/g, '');
    let multiplicador = 1;
    let soma = 0;
    let resto: number;
    const primeiroDigitoVerificador = parseInt(strCNPJ.substring(12, 13), 10);
    const segundoDigitoVerificador = parseInt(strCNPJ.substring(13, 14), 10);
    const badList = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999'
    ];
  
    if (!!badList.find(e => e === strCNPJ) || strCNPJ.length < 14) {
      return false;
    }
  
    for (let i = 12; i >= 1; i--) {
      multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
      soma = soma + parseInt(strCNPJ.substring(i - 1, i), 10) * multiplicador;
    }
    resto = soma % 11;
  
    if (resto === 0 || resto === 1) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }
  
    if (resto !== primeiroDigitoVerificador) {
      return false;
    }
  
    soma = 0;
    multiplicador = 1;
    for (let i = 13; i >= 1; i--) {
      multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
      soma = soma + parseInt(strCNPJ.substring(i - 1, i), 10) * multiplicador;
    }
    resto = soma % 11;
  
    if (resto === 0 || resto === 1) {
      resto = 0;
    } else {
      resto = 11 - resto;
    }
  
    if (resto !== segundoDigitoVerificador) {
      return false;
    }
  
    return true;
  }