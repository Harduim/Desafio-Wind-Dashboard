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

function rmse(y_hat, x) {
  let error = 0
	for (let i = 0; i < x.length; i++) {
		error += Math.pow((y_hat[i] - x[i]), 2)
	}
  error /= x.length;
  error = Math.sqrt(error);

	return error;
}

function linearRegression(x, y){
        
  var regressor = {};
  
  var x_mean = calcMedia(x);
  var y_mean = calcMedia(y);
   
  var slope = 0, slope_numerator = 0, slope_denominator = 0;
  for(i=0; i<x.length; i++){
  slope_numerator += (x[i]-x_mean)*(y[i]-y_mean);
  slope_denominator += Math.pow((x[i]-x_mean),2)
  }
  
  slope = slope_numerator/slope_denominator;
  regressor['slope'] = slope;
  
  var intercept = y_mean - x_mean*slope;
  regressor['intercept'] = intercept;
          
  return regressor;
          
  }

function predict(regressor, x) {
  var y_hat = [];

  for(i = 0; i < x.length; i++){
    y_hat.push(x[i] * regressor['slope'] + regressor['intercept']);
  }
  return y_hat;
}

function calcMedia(list) {
  return list.reduce((total, num) => total + num / list.length, 0);
}

function selectSeed(list, id) {
  list.forEach((data) => {
    var option = document.createElement('option');
    option.text = data.text;
    option.value = data.value;
    var select = document.getElementById(`${id}`);
    select.appendChild(option);
  });
}

function sidebarToggler() {
  var element = document.querySelector('.sidebar');
  var element1 = document.querySelector('.content');
  element.classList.toggle('open');
  element1.classList.toggle('open');
}

function removeOptions(id) {
  var selectElement = document.getElementById(`${id}`);
  var i, l = selectElement.options.length - 1;
  for (i = l; i >= 0; i--) {
    selectElement.remove(i);
  }
}
function handleSelect() {
  var element = document.getElementById('hour');
  var serie1 = document.getElementById('serie1');
  var serie2 = document.getElementById('serie2');
  var tipo = document.querySelector('#tipo-dado');

  serie1.disabled = false;
  serie2.disabled = false;

  if (tipo.value == 'horaria') {

    element.disabled = false;
    removeOptions('serie1');
    removeOptions('serie2');
    selectSeed(horaria, 'serie1');
    selectSeed(horaria, 'serie2');

  } else if (tipo.value === 'diaria') {

    element.disabled = true;
    element.value = '';
    removeOptions('serie1');
    removeOptions('serie2');
    selectSeed(diaria, 'serie1');
    selectSeed(diaria, 'serie2');

  }
}

document.getElementById('form').addEventListener('submit', async function submitHandler(event) {
  event.preventDefault();

  document.getElementById('pageContent').classList.toggle('loading');
  document.getElementById('loader').classList.toggle('disabled');

  var estacao = document.querySelector('#estacao').value;
  var tipo = document.querySelector('#tipo-dado').value;
  var dado = document.querySelector('#serie1').value;
  var dado2 = document.querySelector('#serie2').value;
  var hora = document.querySelector('#hour').value;
  var start = document.querySelector('#start').value;
  var finish = document.querySelector('#finish').value;
  var valorY = [];
  var valorY1 = [];
  var xSize = [];
  var lr, lr1;

  if (hora != '') {
    hora < 10 ? hora = ('00' + hora).slice(-2) : hora;
    hora += '00'
  }

  if (tipo == 'diaria') {
    await fetch(
      `https://apitempo.inmet.gov.br/estacao/${estacao ? '' : 'dados/'}${start + '/' }${finish ? finish + '/' : ''}${estacao  && !finish ? start + '/' : ''}${estacao ? estacao : ''}`
    )
      .then((reponse) => reponse.json())
      .then((data) => {
        Object.keys(data).forEach(function (key) {
          valorY.push(data[key][`${dado}`]);
          valorY1.push(data[key][`${dado2}`]);
          xSize.push(key);
        });
      })
      .catch((err) => console.error(err));
  } else if (tipo == 'horaria') {
    await fetch(
      `https://apitempo.inmet.gov.br/estacao/${estacao ? '' : 'dados/'}${start + '/' }${finish ? finish + '/' : ''}${hora ? hora + '/' : ''}${estacao ? estacao : ''}`
    )
      .then((reponse) => reponse.json())
      .then((data) => {
        Object.keys(data).forEach(function (key) {
          valorY.push(data[key][`${dado}`]);
          valorY1.push(data[key][`${dado2}`]);
          xSize.push(key);
        });
      })
      .catch((err) => console.error(err));
  }

  lr = linearRegression(xSize, valorY);
  lr1 = linearRegression(xSize, valorY1);

  var yPrevisto = predict(lr, xSize);
  var yPrevisto1 = predict(lr1, xSize);

  var max = Math.max(...valorY);
  var max1 = Math.max(...valorY1);

  var min = Math.min(...valorY);
  var min1 = Math.min(...valorY);

  var dp = desvioPadrao(valorY);
  var dp1 = desvioPadrao(valorY1);

  var vari = variancia(valorY);
  var vari1 = variancia(valorY1);

  var cr = covar(valorY, yPrevisto);
  var cr1 = covar(valorY, yPrevisto1);

  var erro = rmse(yPrevisto, valorY);
  var erro1 = rmse(yPrevisto1, valorY1);

  document.getElementById('table').classList.remove('disabled');
  document.getElementById('chart').classList.remove('disabled');

  document.getElementById('maximo').innerText = max.toFixed(2);
  document.getElementById('maximo1').innerText = max1.toFixed(2);

  document.getElementById('minimo').innerText = min.toFixed(2);
  document.getElementById('minimo1').innerText = min1.toFixed(2);

  document.getElementById('dp').innerText = dp.toFixed(2);
  document.getElementById('dp1').innerText = dp1.toFixed(2);

  document.getElementById('var').innerText = vari.toFixed(2);
  document.getElementById('var1').innerText = vari1.toFixed(2);

  document.getElementById('covar').innerText = cr.toFixed(2);
  document.getElementById('covar1').innerText = cr1.toFixed(2);

  document.getElementById('rmse').innerText = erro.toFixed(2);
  document.getElementById('rmse1').innerText = erro1.toFixed(2);

  
  var trace = {
    x: xSize,
    y: yPrevisto,
    type: 'scatter',
    line: {
      color: '#E84800',
    },
    name: 'Valor Previsto 1'
  };

  var markers = {
    x: xSize,
    y: valorY,
    mode: 'markers',
    marker: {
      color: '#18197A',
      size: 8
    },
    name: 'Valor Real 1'
  };

  var trace1 = {
   x: xSize,
    y: yPrevisto1,
    type: 'scatter',
    line: {
      color: '#C4F27A',
    },
    name: 'Valor Previsto 2'
  };

  var markers1 = {
    x: xSize,
    y: valorY1,
    mode: 'markers',
    marker: {
      color: '#12121D',
      size: 8
    },
    name: 'Valor Real 2'
  };

  var layout = {
    autosize: true,
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    title: 'Comparação das séries',
    font: { size: 18 },
    
  };

  var layout1 = {
    autosize: true,
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    title: 'Primeira série',
    font: { size: 18 },
  };

  var layout2 = {
    autosize: true,
    paper_bgcolor: 'rgba(0, 0, 0, 0)',
    plot_bgcolor: 'rgba(0, 0, 0, 0)',
    title: 'Segunda Série',
    font: { size: 18 },
  };

  var config = { responsive: true };

  var data = [trace, markers];
  var data1 = [trace1, markers1];
  var dataTotal = [trace, trace1];

  Plotly.newPlot('totalChart', dataTotal, layout, config);
  Plotly.newPlot('chart1', data, layout1, config);
  Plotly.newPlot('chart2', data1, layout2, config);

  document.getElementById('pageContent').classList.toggle('loading');
  document.getElementById('loader').classList.toggle('disabled');
});


