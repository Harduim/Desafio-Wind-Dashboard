const baseURL ='https://apitempo.inmet.gov.br/'

//calcula a média de uma lista


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
    const graphics = document.getElementById("graphs");
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
       let nameStation='';
       const  windAverage=[];
       


       if(serieType ==='1'){

        windData.map(information=>{
          velMax.push(information.VEN_RAJ);
          velTimeTable.push(information.VEN_VEL);
          nameStation = information.DC_NOME;     
        });
          
        }
        else {
            windData.map(information=>{   
              windAverage.push(information.VEL_VENTO_MED)
              nameStation =information.DC_NOME
            });          
        };
      
        const serieDiaria ={
          windAverage,
          nameStation
        } ;

        const serieHoraria ={
          velMax,
          velTimeTable,
          nameStation
        };


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
        const linearRegression = (xArray , yArray )=>{
              const agregor = {};
              const xAverage = average(xArray);
              const yAverage = average(yArray);
        
              let slope =0;
              let slopeCount =0;
              let slopeBase = 0;
              for (i =0; i<xArray.length; i++){
                slopeCount += (xArray[i]-xAverage)*(yArray[i]-yAverage);
                slopeBase += Math.pow((xArray[i]-xAverage),2)
              }
              slope= slopeCount/slopeBase;
              agregor['slope'] = slope; 
              
              const intercept = yAverage - xAverage*slope;
              agregor['intercept'] = intercept;
              return agregor;
          };
        
          //calcula a predict
          const predict =(arr1 , arr2 ) =>{
           const first =  arr1[0];
           const second = arr2[0];
           const firstValue = arr1[1];
           const secondValue = arr2[1];
           const a = (firstValue - secondValue)/(first-second)
           const b = second - (second*a);
           return  a*b;
        }
           
        if(serieType === '1'){
          const lr =  await  linearRegression(serieHoraria.velTimeTable,serieHoraria.velTimeTable);
         
          const previst =  predict(lr,serieHoraria.velTimeTable);


         var trace1 = {
           
           x: serieHoraria.velTimeTable.length,
           
           y: serieHoraria.velTimeTable,
           
           type: 'scatter'
           
          };
          
          
          var trace2 = {
            
            x: serieHoraria.velTimeTable.length,
            
            y: previst,
            
            type: 'scatter'
            
          };
          
          
          var data = [trace1, trace2];
          var layout= {
            title:`${serieHoraria.nameStation}`
          }
          
          Plotly.newPlot(graphics, data,layout , {scrollZoom:true});
          
        } 
         else{
          

              var trace1 = {
              
                x: serieDiaria.windAverage.length,
                
                y: serieDiaria.windAverage,
                
                type: 'scatter'
                
              };
              
              
              var trace2 = {
                
                x: serieDiaria.windAverage,
                
                y: serieDiaria.windAverage.length,
                
                type: 'scatter'
                
              };
              
              
              var data = [trace1, trace2];
              var layout= {
                title:`${serieDiaria.nameStation}`
              }
              
              Plotly.newPlot(graphics, data,layout , {scrollZoom:true});
              
         }
          
          
        };
  
  
  
    
    window.addEventListener(onload, populatedSelect());
  










