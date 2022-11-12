import getUrl from "./getUrl.js";

const selectCountry = (pais) => {
 
  let magnitudArray = [];
  let fechasArray = [];

  const url =
    "https://chilealerta.com/api/query/?user=antoniaa&select=ultimos_sismos&country=" +
    pais;

  getUrl(url).then((data) => {
    const sismos = data["ultimos_sismos_" + pais]; 
    const message = document.getElementById("message");
    if (!sismos.length) {
      message.innerHTML =
        "No hay datos para mostrar, Por favor elige otro país";
    } else {
      message.innerHTML = "";
    }

    const colorBar = [...sismos]
      .map((sismo) => {
        if (sismo.magnitude < 4) {
          return "#d1e5b7"; 
        } else if (sismo.magnitude < 5) {
          return "#4b71e5";
        }
        return "#f95d82";
      })
      .reverse();

    magnitudArray = [...sismos]
      .reverse() 
      .map((sismo) => sismo.magnitude);

    fechasArray = [...sismos]
      .reverse() 
      .map((sismo) => {
        let fecha = new Date(sismo.chilean_time);
        console.log(fecha);
        return `${fecha.getDate()}/${fecha.getMonth() +1} ${fecha.getHours()}:${fecha.getMinutes()}`;
      });

   
    myChart.data.labels = fechasArray; 
    myChart.data.datasets[0].label = pais; 
    myChart.data.datasets[0].data = magnitudArray; 
    myChart.data.datasets[0].backgroundColor = colorBar;
    myChart.update();
  });
};
export default selectCountry;