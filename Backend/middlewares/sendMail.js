const nodeMailer=require("nodemailer");

exports.sendEmail=async (options)=>{
    const transporter=nodeMailer.createTransport({

        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,
        auth:{
            user:process.env.SMPT_MAIL,
            pass:process.env.SMPT_PASS,
        },
        service:process.env.SMPT_SERVICE
    });

    const MailOption={
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message1
    }

    await transporter.sendMail(MailOption)
}