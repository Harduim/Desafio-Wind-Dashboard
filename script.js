function variancia(list) {
  let media = calcMedia(list);
  let variancia = list.reduce(
    (total, valor) => total + Math.pow(media - valor, 2) / list.length,
    0
  );
  alert(variancia);
}

function desvioPadrao() {}

function covar() {}

function rmse() {}

function linearReg() {}

function calcMedia(list) {
  return (media = list.reduce((total, num) => total + num / list.length, 0));
}
