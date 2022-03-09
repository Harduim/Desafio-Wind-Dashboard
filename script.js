const graphics = document.getElementById("graphs");
const baseURL ='https://apitempo.inmet.gov.br/estacoes/T';


async function getApi(){
  const response =  (await fetch(baseURL)).json();
  return response; 
};


async function getIdList(){
  const data = await getApi();
  let stationsIDList = data.map(obj=>
    obj.CD_ESTACAO
    );
    return stationsIDList;
  };
  
  const populatedSelect =async()=>{
    const stationSelect = document.getElementById("chose-station"); 
    const data = await getIdList(); 
    return data.map(id=>{
      const options= document.createElement("option");
      options.setAttribute("value",id);
      options.innerHTML=id;
      stationSelect.appendChild(options);
  })};
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