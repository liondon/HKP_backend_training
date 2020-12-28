/* This is adopted from w3schools.com - Node.js Tutorial: https://www.w3schools.com/nodejs/default.asp */
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourmail@gmail.com',
    pass: 'yourpassword'
  }
})

const mailOpts = {
  from: 'yourmail@gmail.com',
  to: 'yourothermail@nyu.edu, yourothermail2@yahoo.com',
  subject: 'Sending mail with Node.js',
  text: 'Hello World!',
  html: '<h1>THIS IS HTML H1 TITLE!</h1>'
}

transporter.sendMail(mailOpts, (err, info) => {
  if (err) console.log(err)
  else console.log('Email sent: ' + info.response)
})