const graphics = document.getElementById("graphs");
const baseURL ='https://apitempo.inmet.gov.br/'

//calcula a média de uma lista
const average = (array) =>{
    const averageOfArray = array.reduce((a,b)=> a+b, 0 );
    const result = averageOfArray / array.length;
    return result;
};

//calcula a variancia
const variance = (array)=>{
  const resolvedAverage= average(array);
  const squareDiffs = array.map((value)=>{
    const diff = value - resolvedAverage;
    return diff * diff;
  });
  const variance = resolvedAverage(squareDiffs);
  return variance  
};

// calcula o desvio padrão
const standDeviation =(variance) =>{
   return Math.sqrt(variance);
};

//calcula a covariancia
const covariance = (array1, array2) =>{
  let sum = 0;
  const arrayLength = array1.length || array2.length;
  const averageFirstArr = average(array1);
  const averageSecondArr = average(array2)    
  for(let i =0;i<arrayLength; i++){
     sum = sum + (array1[i] - averageFirstArr) * (array2[i] -  averageSecondArr);
  }
  return sum / arrayLength;
};

//calcula o rmse
const rmse = (arr) =>{
 return  Math.sqrt(arr.
    map(val=> val*val).reduce((total,value)=>total+value)/arr.length
 );};

//calcula a progressão linear
const linearProgression = (xArray , yArray )=>{
  const xSum=0, ySum=0 , xxSum=0, xySum=0;
  const count = xArray.length;
  for (let i = 0; i < count; i++) {
  xSum += xArray[i];
  ySum += yArray[i];
  xxSum += xArray[i] * xArray[i];
  xySum += xArray[i] * yArray[i];
};
  const slope = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
  const intercept = (ySum / count) - (slope * xSum) / count;
  const xValues = []; 
  const yValues = [];
  for (let x = xArray[0]; x <= xArray.length; x += 1) {
    xValues.push(x);
    yValues.push(x * slope + intercept);
  }     
    const linearResult={
      slope: xValues,
      intercept: yValues
    }
    return linearResult
};

//calcula a predict
const predict =(arr1 , arr2 , val) =>{
   const first =  arr1[0];
   const second = arr2[0];
   const firstValue = arr1[1];
   const secondValue = arr2[1];
   const a = (firstValue - secondValue)/(first-second)
   const b = second - (second*a);
   return val *b;
}


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

  

  const getWindBydDate = async () =>{
    //pega todos os valores dos inputs
    const stationId= document.getElementById("chose-station").value
    const initialDate = document.getElementById("initialDate").value
    const finalDate = document.getElementById("finalDate").value
    const serieType = document.getElementById("serie").value
    
    const valuesObject = {
      stationId,
      initialDate,
      finalDate,
      serieType
    }
      //faz a tomada de decisão para qual endpoint irá fazer a requisição
      let urlRequest = ''
      valuesObject.serieType === '1' ? (urlRequest= `${baseURL}estacao/${valuesObject.initialDate}/${valuesObject.finalDate}/${valuesObject.stationId}`):(urlRequest = `${baseURL}estacao/diaria/${valuesObject.initialDate}/${valuesObject.finalDate}/${valuesObject.stationId}`);
        
       const windData = await getApi(urlRequest);
       const velMax=[];
       const velTimeTable=[];
       let nameStation= ''

       windData.map(information=>{
         velMax.push(information.VEN_RAJ),
         velTimeTable.push(information.VEN_VEL),
         nameStation = information.DC_NOME;
        });
       
      const filtredVelocity = {
        maax:velMax,
        TimeTable:velTimeTable,
        nameStation
      };
      
      console.log(filtredVelocity)

  };
  
  
    
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