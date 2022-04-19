const transpoter = require('../../../database/emailTransporter');
const nodemailer = require('nodemailer');

const sendAccountActivation = async (email, token) => {
  const info = await transpoter.sendMail({
    from: 'My App <info@my-app.com>',
    to: email,
    subject: 'Account Activation',
    html: `
        <div>
          <b>Please click below link to activate your account.</b>
        Token is ${token}
        </div>
        <div>
          <a href="http://localhost:3000/login?token=${token}">Activate</a>
        </div>
        `
  });

  console.log(nodemailer.getTestMessageUrl(info));
};

module.exports = { sendAccountActivation };
