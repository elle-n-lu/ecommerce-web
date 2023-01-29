import nodemailer from "nodemailer";

export async function nodemail(to: string, html: string) {

//   let testAccount = await nodemailer.createTestAccount();
//   console.log("testaccount", testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'kvdgahd52dsg72qh@ethereal.email', // generated ethereal user
      pass: 'U9cZ4jew1aScJxMNfD', // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: "change password", // Subject line
    text: "Hello world?", // plain text body
    html: html, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
