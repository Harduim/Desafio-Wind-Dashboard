const graphics = document.getElementById("graphs");
const baseURL = "https://apitempo.inmet.gov.br/estacoes";

async function getApi() {
  const response = (await fetch(`${baseURL}/T`)).json();
  return response;
}

async function getWindInfoByDate(initDate, finalDate, id) {
  const response = (
    await fetch(`${baseURL}/${initDate}/${finalDate}/${id}`)
  ).json();
  return response;
}

async function getStations() {
  const data = await getApi();
  const stations = data.map((station) =>
    Object({
      id: station.CD_ESTACAO,
      value: station.DC_NOME,
    })
  );

  return stations;
}

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
window.addEventListener(onload, populatedSelect());

const processRequest = async () => {
    // TODO: pegar info dos valores do input
    const windeData = await getWindInfoByDate()
};

const trace1 = {
  x: [1, 2, 3, 4],

  y: [10, 15, 13, 17],

  type: "scatter",
};

const trace2 = {
  x: [1, 2, 3, 4],

  y: [16, 5, 11, 9],

  type: "scatter",
};

const data = [trace1, trace2];
const layout = {
  title: "Wind Dashboard",
};

Plotly.newPlot(graphics, data, layout, { scrollZoom: true });