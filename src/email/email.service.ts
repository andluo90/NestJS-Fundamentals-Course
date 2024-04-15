import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as smtpTransport from 'nodemailer-smtp-transport';
import emailConfig,{EmailConfig} from './config/email.config';



@Injectable()
export class EmailService {
  private transporter;

  constructor(
    @Inject(emailConfig.KEY)
    private readonly emailConfiguration: EmailConfig,

  ) {
    this.transporter = nodemailer.createTransport(
      smtpTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: this.emailConfiguration.username,
          pass: this.emailConfiguration.password
        }
      })
    );
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'andluo90@gmail.com',
      to: to,
      subject: subject,
      text: text
    };
    
    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
