import './style.css'
import toastr from 'toastr'

var inputEmailElement = document.querySelector('input[type="email"]')
var errorEmailElement = document.querySelector('p[data-error="email"]')
var inputPasswordElement = document.querySelector('input[type="password"]')
var errorPasswordElement = document.querySelector('p[data-error="password"]')
var formElement = document.querySelector('form')

var validForm = {
  email: false,
  password: false
}

function handleState(isValid, stateKey) {
  validForm[stateKey] = isValid
}

function handleValidation(isValid, inputElement, errorElement) {
  if (isValid) {
    inputElement.classList.add('valid')
    inputElement.classList.remove('error')
    errorElement.classList.remove('visible')
  } else {
    inputElement.classList.remove('valid')
    inputElement.classList.add('error')
    errorElement.classList.add('visible')
    errorElement.textContent = 'El email no es válido'
  }
}

function handleLogin(email, password) {
  // create Payload and fetch configuration
  const data = {
    email,
    password
  }

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  // fetch POST /login
  fetch('http://localhost:3001/login', fetchOptions)
    .then((rawResponse) => {
      return rawResponse.json()
    })
    .then((loginResponse) => {
      if(loginResponse.error){
        toastr.error(loginResponse.error)
      } else {
        toastr.success(`${loginResponse.user.name} bienvenid@ a Best Pizza`)
      }
    }).catch((error) => {
      console.log(error)
      toastr.error('Ups! Ha ocurrido un error por favor intenta mas tarde')
    })
}

inputEmailElement.addEventListener('change', (e) => {
  var regExp = new RegExp(/^\w+@\w+\.\w+$/);
  const emailValid = regExp.test(e.target.value)
  handleValidation(emailValid, inputEmailElement, errorEmailElement)
  handleState(emailValid, 'email')
})

inputPasswordElement.addEventListener('change', (e) => {
  const passwordValid = e.target.value.length > 2;
  handleValidation(passwordValid, inputPasswordElement, errorPasswordElement)
  handleState(passwordValid, 'password')
})

formElement.addEventListener('submit', (e) => {
  e.preventDefault()
  if (validForm.email && validForm.password) {
    // Get form data
    const email = inputEmailElement.value
    const password = inputPasswordElement.value
    handleLogin(email, password)
  } else {
    toastr.warning('El formulario debe llenarse correctamente')
  }
})