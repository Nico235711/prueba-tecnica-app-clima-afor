import "./css/style.css";

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
  const form = document.querySelector(".whether")
  const message = document.createElement("p")
  message.textContent = "El campo no puede ir vacío"
  message.classList.add("error")
  form.append(message)
}

function fetchWhether() {
  const whetherInput = document.querySelector(".whether input").value
  if (whetherInput === "") {
    showMessage()
    return
  }
  document.querySelector(".error").remove()
}

document.querySelector("#search").addEventListener("click", fetchWhether)