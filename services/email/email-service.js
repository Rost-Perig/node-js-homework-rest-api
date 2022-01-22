import Mailgen from 'mailgen';
import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';

class EmailService {

    constructor(env) {
        switch (env) {
        case 'development':
            this.link = 'https://19c6-128-0-172-13.ngrok.io' //generate with ngrok
            break
        case 'test':
            this.link = 'http://localhost:5000'
            break
        case 'production':
            this.link = 'http://heroku/'
            break
        default:
            this.link = 'http://localhost:3000'
      };
    };

  createEmailTemplate(username, verifyToken) {
      const mailGenerator = new Mailgen({
          theme: 'default',
          product: {
              name: 'Rost GoIT',
              link: this.link,
          },
      });

      const email = {
          body: {
              name: username,
              intro: "Welcome! We're very excited to have you on board.",
              action: {
                  instructions: 'To get started with our API, please click here:',
                  button: {
                      color: '#22BC66', // Optional action button color
                      text: 'Confirm your account',
                      link: `${this.link}/api/users/verify/${verifyToken}`,
                  },
              },
              outro: 'Нужна помощь, напишите нам, но лучше пришлите денег, но не ложите их возле сала.',
          },
      };
      return mailGenerator.generate(email);
    };

  async sendVerifyEmail(email, username, verifyToken) {
    const emailBody = this.createEmailTemplate(username, verifyToken);
    const msg = {
        to: email,
        subject: 'Verify email',
        html: emailBody,
    };
    try {
        const result = await this.sendWithNodemailer(msg);
        console.log(result);
        return true;
        } catch (error) {
        console.error(error.message);
        return false;
        };
    };

    async sendWithSendgrid(msg) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        return await sgMail.send({ ...msg, from: process.env.SENDER_SENDGRID}); //from:'krabat@ex.ua' //from: process.env.SENDER_SENDGRID 
    };

    async sendWithNodemailer(msg) {
      const config = {
          host: 'smtp.meta.ua',
          port: 465,
          secure: true,
          auth: {user: process.env.USER_NODEMAILER,  pass: process.env.PASSWORD_NODEMAILER},
      };
      const transporter = nodemailer.createTransport(config);
      return await transporter.sendMail({...msg, from: process.env.USER_NODEMAILER});
    };
};

export default EmailService;