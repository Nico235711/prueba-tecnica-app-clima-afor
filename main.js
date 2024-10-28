import "./css/style.css";

const kelvin = 273.15

document.querySelector("#app").innerHTML = `
  <div class="whether-data">
      <h1>Busca el clima de tu ciudad 🌤</h1>
      <form class="whether">
        <input type="text" placeholder="Ej: Buenos Aires, Madrid, Nueva York">
        <button type="button" id="search">Buscar</button>
      </form>
  </div>
`;

function showMessage() {
  const div = document.querySelector(".whether-data")
  const message = document.createElement("p")
  message.textContent = "El campo no puede ir vacío"
  message.classList.add("error")
  div.append(message)
  setTimeout(() => {
    document.querySelector(".error").remove()
  }, 2000);
}

function formatTemperature(temp) {
  return (temp - kelvin).toFixed()
}

function showDataWhether(dataWhether) {
  if (dataWhether) {
    const { humidity, temp, temp_max, temp_min } = dataWhether.main
    const whetherDiv = document.createElement("div")
    const pHumidity = document.createElement("p")
    const pTemp = document.createElement("p")
    const pTemp_max = document.createElement("p")
    const pTemp_min = document.createElement("p")
    pHumidity.textContent = `Húmedad: ${humidity}%`
    pTemp.innerHTML = `Temperatura: ${formatTemperature(temp)}&#8451;`
    pTemp_max.innerHTML = `Temperatura máxima: ${formatTemperature(temp_max)}&#8451;`
    pTemp_min.innerHTML = `Temperatura mínima: ${formatTemperature(temp_min)}&#8451;`
    whetherDiv.classList.add("whether-details")
    whetherDiv.append(pHumidity, pTemp, pTemp_max, pTemp_min)
    document.querySelector(".whether-data").append(whetherDiv)
    setTimeout(() => {
      document.querySelector(".whether-details").remove()
    }, 5000);
  }
  // else {
  //   const notFound = document.createElement("p")
  //   notFound.textContent = "Búsqueda no encontrada"
  //   document.querySelector(".whether-data").append(notFound)
  //   setTimeout(() => {
  //     document.querySelector(".whether-details").remove()
  //   }, 5000);
  // }
}

async function fetchWhether() {
  const whetherInput = document.querySelector(".whether input")
  if (whetherInput.value === "") {
    showMessage()
    return
  }
  const url = import.meta.env.VITE_API_URL
  const apiKey = import.meta.env.VITE_WHETHER_API_KEY
  const data = await fetch(`${url}?q=${whetherInput.value}&appid=${apiKey}`).then(response => response.json())
  whetherInput.value = ""
  showDataWhether(data)
}

document.querySelector("#search").addEventListener("click", fetchWhether)