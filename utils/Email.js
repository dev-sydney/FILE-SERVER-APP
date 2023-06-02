const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

const createEmailTemplate = require('./../utils/createEmailTemplate');
const accountVerificationTemplate = require('./../utils/createAccVerificationTemplate');
const fileShareTemplate = require('./../utils/fileShareTemplate');

module.exports = class Email {
  /**
   *
   * @param {*} user The current user that is signing up
   * @param {*} url the URL that will be set as the href of the call-to-action button link in the email
   * @param {*} from the sender of the email
   * @param {*} to The recipient of the mail
   */
  constructor(user, url, from, to) {
    this.to = to;
    this.userName = user?.user_name?.split(' ')[0];
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
  /**
   * This method sends the email with the verification code to the users emaill
   * @param {String} verificationCode the unencrypted verification code
   */
  async sendAccountVerificationMail(verificationCode) {
    const html = accountVerificationTemplate(this.url, verificationCode);

    let subject = 'Account verification for DDS';

    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };

    await this.newTransport().sendMail(emailOptions);
  }

  /**
   * Function sends a batch email, which conatins the files which are being shared
   * @param {String} subject The subject of the email
   * @param {String} caption A breif description of the files being shared
   * @param {Array} attachments File attachments
   */
  async sendFileToClients(subject, caption, attachments) {
    const html = fileShareTemplate(caption);

    const emailOptions = {
      from: this.from,
      to: this.to,
      text: htmlToText.htmlToText(html),
      subject,
      html,
      attachments,
    };

    await this.newTransport().sendMail(emailOptions);
  }
};
