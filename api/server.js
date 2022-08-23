const express = require('express')
var cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3001

app.use(cors())
app.use(bodyParser.json())

app.post('/login',(req, res) => {
  const { email, password } = req.body;
  console.log('Peticion entrando a /login')
  console.log('con body')
  console.log(req.body)
  console.log('con headers')
  console.log(req.headers)
  // Mock login process:
  if(email === 'pame@test.com' && password === 'pame123'){
    res.json({
      user: { name: 'Pame', email },
      token: 'pameHashedToken123456'
    })
  } else {
    res.status(403).json({
      error: 'Usuario o password incorrecto'
    })
  }

})

app.listen(port, () => {
  console.log(`API Server listening on port ${port}`)
})