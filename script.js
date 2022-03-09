const graphics = document.getElementById("graphs");
const stationSelect = document.getElementById("choseStation");

const baseURL ='https://apitempo.inmet.gov.br/estacoes/T';


async function getApi(){
  const response = await fetch(baseURL);
   return response.json()
};

let stationsId= [];
async function getIdList(){
   const data = await getApi();
   let stationsIDList = data.map(obj=>
        obj.CD_ESTACAO
   );
    return  stationsIDList;
};
(async () => {
  stationsId.push(await getIdList());
})()













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