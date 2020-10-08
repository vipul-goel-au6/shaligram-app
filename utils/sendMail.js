const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

module.exports = {
  async sendOtpMail(email, name, token) {
    try {
      await transporter.sendMail({
        to: email,
        from: "shaligram.application@gmail.com",
        subject: "Email Confirmation",
        html:`
        <h2 >Welcome to Shaligram Application, ${name}</h2>
        <h4>Congratulations! You're almost set to start using Shaligram.
            Just enter the below one time password in the browser to validate your email address.</h4>
            <h4>${token}</h4>`
        // html: `<h1>Hello ${name}, your token is <b>${token}</b></h1>`,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async sendResetPasswordMail(email, name, token) {
    try{
      await transporter.sendMail({
        to: email,
        from: "shaligram.application@gmail.com",
        subject: "Reset Account Password",
        html: `
        <p>You hanve requested for password reset<p>
        <h2>click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset yoor password</h2>
        <p>This link is valid for only 1 hour<p>
        `
      })
    }catch(err){
      console.log(err)
      throw err
    }
  }
};
