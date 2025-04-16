const mailer = require('nodemailer');

const sendingMail = async (to, subject, text) => {

    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: "akshayrajsinhrathod9@gmail.com",
            pass: "bsxt poce xolh pbpi"
        }
    })

    const mailOptions = {
        from: 'akshayrajsinhrathod9@gmail.com',
        to: to,
        subject: subject,
        html: text
        //html:"<h1>"+text+"</h1>"
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;


}

module.exports ={
    sendingMail
}