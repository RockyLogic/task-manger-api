const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from: "Thealphahive@gmail.com",
        subject: "Thanks for joining!",
        text: `Welcome to the app, ${name}. Give us some feedback!`,
    })
}

const sendCancelEmail = (email, name) =>{
    sgMail.send({
        to:email,
        from: "Thealphahive@gmail.com",
        subject: "Sad to see you go hoe!",
        text: `Fairwell, ${name}. Give us some feedback how I could do better!`,
    })
}
module.exports = {sendWelcomeEmail, sendCancelEmail}