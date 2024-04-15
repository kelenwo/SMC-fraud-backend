const { createTransport } = require('nodemailer');

const notify = (email, subject, body) => {
    const transporter = createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        auth: {
            user: "kelenwo68@gmail.com",
            pass: "uhbipavyrsudgdme",
        },
    });

    const mailOptions = {
        from: "kelenwo68@gmail.com",
        to: email,
        subject: subject,
        html: body
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


module.exports =  {
    notify
};