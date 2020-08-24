const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    accessToken: process.env.AUTH_ACCESS_TOKEN,
    expires: 1484314697598,
    user: process.env.AUTH_USER,
    clientId: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    refreshToken: process.env.AUTH_REFRESH_TOKEN,
  }
});

const getHTML = (name, text, area) => `
  <div><strong>Nombre: </strong>${name}</div>
  <div><strong>Área: </strong>${area}</div>
  <div><strong>Mensaje: </strong></div>
  <p>${text}</p>
`

const formatAttachments = file => {
  if(!file) return []
  return [
    {
        filename: file.originalname,
        content: file.buffer
    }
  ]
}

const send = async ({ email, name, message: text, area, file }) => {

  const from = name && email ? `${name} <${email}>` : `${name || email}`
  const attachments = formatAttachments(file)

  const message = {
    from,
    to: 'consultas@electro3.com.ar',
    subject: `Nuevo mensaje desde Electro 3 de ${from}`,
    text,
    html: getHTML(name, text, area),
    replyTo: from,
    attachments
  }

  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
}

module.exports = send