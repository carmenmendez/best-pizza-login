import './style.css'

// Obtener la refencia de los 2 inputs y los 2 error elements
var inputEmailElement = document.querySelector('input[type="email"]')
var errorEmailElement = document.querySelector('p[data-error="email"]')
var inputPasswordElement = document.querySelector('input[type="password"]')
var errorPasswordElement = document.querySelector('p[data-error="password"]')
var formElement = document.querySelector('form')

var formValidState = {
  email: false,
  password: false,
}

// Validar el email
// agregar un evento al input del email y escuchar cuando el valor cambie
// validamos si el input tiene las siguientes características
// 1.- No esta vacio
// 2.- Tiene el patrón de un email
// Si tiene error mostrar mensaje de error, de lo contrario quitar mensajes de error

inputEmailElement.addEventListener('change', (e) => {
  var value = e.target.value
  const emailRegex = new RegExp(/^\w+@\w+\.\w+$/)
  const isValid = emailRegex.test(value)
  if (!isValid) {
    e.target.classList.add('error')
    e.target.classList.remove('valid')
    errorEmailElement.classList.add('visible')
    errorEmailElement.textContent = 'Debes ingresar un correo válido';
    formValidState.email = false
  } else {
    e.target.classList.remove('error')
    e.target.classList.add('valid')
    errorEmailElement.classList.remove('visible')
    errorEmailElement.textContent = '';
    formValidState.email = true
  }
})

inputPasswordElement.addEventListener('change', (e) => {
  var value = e.target.value
  const isValid = value.length > 2
  if (!isValid) {
    e.target.classList.add('error')
    e.target.classList.remove('valid')
    errorPasswordElement.classList.add('visible')
    errorPasswordElement.textContent = 'Debes ingresar un password válido';
    formValidState.password = false
  } else {
    e.target.classList.remove('error')
    e.target.classList.add('valid')
    errorPasswordElement.classList.remove('visible')
    errorPasswordElement.textContent = '';
    formValidState.password = true
  }
})

formElement.addEventListener('submit', (e) => {
  e.preventDefault()
  if (formValidState.email && formValidState.password) {
    alert('enviando datos')
  } else {
    alert('el formulario debe ser válido')
  }
})
