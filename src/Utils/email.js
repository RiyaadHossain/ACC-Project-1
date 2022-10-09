const nodemailer = require('nodemailer');
const { google } = require('googleapis');

// 1. Complex Way to send OAuth mail______________________________________
const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground/"
)

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

exports.sendOauthMail = async (mailInfo) => {
    const accessToken = await oAuth2Client.getAccessToken()

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_NAME,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mailData = {
        from: process.env.EMAIL_NAME,
        to: mailInfo.email,
        subject: mailInfo.subject,
        text: mailInfo.text
    }

    const mailSent = await transporter.sendMail(mailData)
    return mailSent.messageId
}

// 2. Simpler Way to send OAuth mail______________________________________
exports.sendMail = (mailInfo) => {

    //Step 1: Creating the transporter
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_PASS
        }
    });

    //Step 2: Setting up message options
    const messageOptions = {
        subject: mailInfo.subject,
        text: mailInfo.text,
        to: mailInfo.email,
        from: "put_email_of_sender"
    };

    //Step 3: Sending email
    transporter.sendMail(messageOptions);
}