var graphics = document.getElementById("graphs");

const baseURL ='https://apitempo.inmet.gov.br/estacoes/T';


fetch(baseURL)
.then((response)=>{
    return response.json();
}).then((data)=>{
    const stationsCode = [data.map(obj =>
        obj.DC_NOME)];
  console.log(stationsCode);
})


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