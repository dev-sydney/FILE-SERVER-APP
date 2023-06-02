const SibApiV3Sdk = require('sib-api-v3-sdk');

SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey =
  process.env.BREVO_API_KEY;

class BatchEmail {
  async sendEmailToClients() {
    return new SibApiV3Sdk.TransactionalEmailsApi().sendTransacEmail(
      JSON.stringify({
        sender: { email: process.env.BREVO_MAIL_FROM, name: 'Ms Lizzy' },
        subject: 'Testing batch emails with Brevo',
        params: {
          greeting: 'This is the default greeting',
          headline: 'This is the default headline',
        },
        textContent: 'This is still a paragraph',
        messageVersions: [
          //Definition for Message Version 1
          {
            to: [
              {
                email: 'sydney279@icloud.com',
                name: 'Sydney Anderson',
              },
              {
                email: 'sydney.otutey@gmail.com',
                name: 'Sydney Smith',
              },
            ],
            htmlContent:
              '<!DOCTYPE html><html><body><h1>Modified header!</h1><p>This is still a paragraph</p></body></html>',
            subject: 'We are happy to be working with you',
          },
        ],
      })
    );
  }
}
module.exports = BatchEmail;
