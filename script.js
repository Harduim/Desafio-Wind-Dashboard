const graphics = document.getElementById("graphs");
const baseURL ='https://apitempo.inmet.gov.br/'

//conecta a api
async function getApi(url){
  const response =  (await fetch(url)).json();
  return response; 
};

//pega as estações e os códigos delas
async function getStations(){
  const data = await getApi(`${baseURL}estacoes/T`);
  const stations = data.map((station) =>
    Object({
      id: station.CD_ESTACAO,
      value: station.DC_NOME,
    }));
    return stations;
  };
 
  //popula as estações e seus códigos em um select  
  const populatedSelect = async () => {
    const stationSelect = document.getElementById("chose-station");
    const stations = await getStations();
    return stations.map((station) => {
      const options = document.createElement("option");
      options.setAttribute("value", station["id"]);
      options.innerHTML = station["value"];
      stationSelect.appendChild(options);
    });
  };

  const getValues = ()=>{
     const stationId= document.getElementById("chose-station").value
     const initialDate = document.getElementById("initialDate").value
     const finalDate = document.getElementById("finalDate").value
     const serieType = document.getElementById("").value
  }

    window.addEventListener(onload, populatedSelect());
  










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