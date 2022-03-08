var graphics = document.getElementById("graphs");

const baseURL ='https://apitempo.inmet.gov.br/estacoes/T';

const getApi =(url) => {
    let request = new XMLHttpRequest();
    request.open('GET',url, false);
    return request.responseText
};
console.log(getApi(baseURL));




var trace1 = {

    x: [1, 2, 3, 4],
  
    y: [10, 15, 13, 17],
  
    type: 'scatter'
  
  };
  
  
  var trace2 = {
  
    x: [1, 2, 3, 4],
  
    y: [16, 5, 11, 9],
  
    type: 'scatter'
  
  };
  
  
  var data = [trace1, trace2];
  var layout= {
    title:'Wind Dashboard'
  }
  
  Plotly.newPlot(graphics, data,layout , {scrollZoom:true});