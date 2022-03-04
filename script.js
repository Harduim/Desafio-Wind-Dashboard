function variancia(list) {
  let media = calcMedia(list);
  return list.reduce(
    (total, valor) => total + Math.pow(media - valor, 2) / list.length,
    0
  );
}

function desvioPadrao(list) {
  return Math.sqrt(variancia(list));
}

function covar() {}

function rmse() {}

function linearReg() {}

function calcMedia(list) {
  return list.reduce((total, num) => total + num / list.length, 0);
}
