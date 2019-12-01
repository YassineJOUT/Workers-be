import { createTestAccount, createTransport, getTestMessageUrl } from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
export const sendMail = async (email: string,confirmationCode: number) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'app.workers19@gmail.com', // generated ethereal user
      pass: 'workers1423' // generated ethereal password
    }
  });

  // send mail with defined transport object

  
  var textToSend = "Your confirmation code is :	"+confirmationCode.toString()+
  "If this was not your request, please contact us "
  + "Thank you, "+
   "Workers";
   var textToHTML = "<b>Your confirmation code is :	</b></br>"+confirmationCode.toString()+
   "<p>If this was not your request, please contact us<p></br>"
   + "<b>Thank you, </b></br>"+
    "<h5>Workers</b>";

  let info = await transporter.sendMail({
    from: '"Password Redefinition -Workers- " <app.workers19@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Confirmation Code", // Subject line
    text: textToSend, // plain text body
    html: textToHTML // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
