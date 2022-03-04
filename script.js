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

function covar(list1, list2) {
  if (list1.length !== list2.length) {
    return alert('As duas listas precisam ser do mesmo tamanho');
  }
  let sum = 0;
  let media1 = calcMedia(list1);
  let media2 = calcMedia(list2);
  for (let i = 0; i < list1.length; i++)
    sum = sum + (list1[i] - media1) * (list2[i] - media2);

  return sum / (list1.length - 1);
}

function rmse() {}

function linearReg() {}

function calcMedia(list) {
  return list.reduce((total, num) => total + num / list.length, 0);
}
