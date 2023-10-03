import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
interface MailInfo {
    // 目标邮箱
    to: string;
    // 标题
    subject: string;
    // 文本
    text?: string;
    // 富文本，如果文本和富文本同时设置，富文本生效。
    html?: string;
  }
@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private mailConfig =  {
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
    user: '1374744754@qq.com',
    pass: 'wdoqrjpmcambhjha'
  }
  }
  constructor() {
    this.transporter = nodemailer.createTransport(this.mailConfig);
  }

  async sendEmail(mailInfo: MailInfo) {
     const info = await this.transporter.sendMail({
        from: this.mailConfig.auth.user, //发送方邮箱
        ...mailInfo
     })
     return info
  }
}




