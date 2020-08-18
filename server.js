const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const multer = require('multer');
const upload = multer();

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const mailer = require('./mailer')

app.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.post('/api/contact', upload.single('cv'), async (req, res) => {

    const {
      name = '',
      email = '',
      message = '',
      area = 'General'
    } = req.body
    
    try {
      if(name == '' || email == '') throw new Error('incomplete')
      await mailer({ email, name, message, area, file: req.file })
      res.send('ok')
    } catch(e) {
      console.log('failed', e)
      res.send('fail')
    }
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Read on http://localhost:3000')
  })
})