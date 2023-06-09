const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

const createEmailTemplate = require('./../utils/createEmailTemplate');

module.exports = class Email {
  constructor(user, url, from, to) {
    this.to = to;
    this.userName = user.user_name.split(' ')[0];
    this.url = url;
    this.from = from;
  }

  /**
   *
   * @returns an email transport object
   */
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //production email service
    } else {
      return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
    }
  }

  async send(subject, action, ...emailContent) {
    //TODO: Get the HTML Template for email
    const html = createEmailTemplate(
      subject,
      this.userName,
      this.url,
      action,
      emailContent[0],
      emailContent[1]
    );

    //TODO: Set the email options
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };

    //TODO: Create a transport and send the mail
    await this.newTransport().sendMail(emailOptions);
  }

  async sendPasswordResetMail() {
    let firstParagraph = `Forgot your password? Click <a href='${this.url}'>Here</a>  for a password reset.`;

    await this.send(
      'You have only 10 minutes !',
      'Reset your password',
      firstParagraph
    );
  }
};
