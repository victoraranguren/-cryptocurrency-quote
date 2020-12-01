const criptomonedasSelect = document.querySelector('#criptomonedas')
const moneda = document.querySelector('#moneda')
const form = document.querySelector('#form')
const baseURL = 'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD'
const list = document.querySelector('#list')

const fetchAPI= () => {
  return fetch(baseURL)
    .then(response => response.json())
      .then(data=> obtenerCriptomonedas(data.Data))
}

const errorPrint = () => {
  const template = 
  `<div class="alert alert-danger">
    Rellene todos los campos
   </div>`
   
   return document.querySelector('#second').innerHTML= template;
}

const cotizationPrint = (PRICE) => {
  const template = `<p>Precio ${PRICE}</p>`
  return document.querySelector('#second').innerHTML= template;
}

const cotizationVerification = () => {
  return fetchAPI().then(criptos=>criptos.filter(cripto=>{
    const {Name} = cripto.CoinInfo; 
    const {PRICE} = cripto.DISPLAY.USD; 
    if (Name === criptomonedasSelect.value ) {
      console.log(`Coincide con: ${Name} y su precio es: ${PRICE}`);
      cotizationPrint(PRICE)
    }
  }))
}

const obtenerCriptomonedas = criptomonedas => new Promise(resolve=>{
  resolve(criptomonedas)
})

const selectCriptomonedas = (criptomonedas) => {
  console.log(criptomonedas);
  criptomonedas.forEach(cripto=>{
    const {FullName, Name} = cripto.CoinInfo;

    const option = document.createElement('option');
    option.value = Name
    option.textContent = FullName
    criptomonedasSelect.appendChild(option)
  })
}

const consultarCriptomonedas = () => {
  return fetchAPI().then(criptomonedas=>selectCriptomonedas(criptomonedas))
}

document.addEventListener('DOMContentLoaded',() => {
  consultarCriptomonedas();
})
form.addEventListener('submit',(e)=>{
  e.preventDefault()
  if (criptomonedasSelect.value != '' & moneda.value != '') {
    cotizationVerification()
  } else {
    errorPrint()
  }
})
