const nodemailer = require('nodemailer')

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    accessToken: 'ya29.a0AfH6SMBUAj__UlB8I_u-nfePLnAFW66X5T8lkeOpESVv6uLF4iRmgYbCJYqYNGm3HyiRLYaYlmus2fAJqHSAHKkLnZybZaO1C_dQARDSCvjdMlpXAA_GKK-yRJ0jKHuRGtkZeL5apKKJ3eyBXr5zfmWF4hdgZqz_nMo',
    expires: 1484314697598,
    user: 'lucas.203.95@gmail.com',
    clientId: '663289076275-56kkvods3bq9a2e52katrks934e65lak.apps.googleusercontent.com',
    clientSecret: 'NaQziHiZK24XVI_GVLYwxBAR',
    refreshToken: '1//0f6Ay_Irdu3ntCgYIARAAGA8SNwF-L9IrRShnJZF-WQ9DAgQigjvaTsMm1bMxDUZrF5AN3hnOm1kjNtumuIrfyasBzvjp9gvwSJ0'
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