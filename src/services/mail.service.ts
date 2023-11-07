import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
  constructor(
    private readonly configService:ConfigService
  ) {
    this.transporter = nodemailer.createTransport(this.configService.get('mail'));
  }

  /**ConfigService
   * @description 发送邮箱
   * @date 10/16/2023
   * @param mailInfo 
   */
  async sendEmail(mailInfo: MailInfo) {
     const info = await this.transporter.sendMail({
        from: this.configService.get('mail').auth.user, //发送方邮箱
        ...mailInfo
     })
     return info
  }
}




