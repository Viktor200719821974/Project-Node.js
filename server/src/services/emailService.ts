import nodemailer, { SentMessageInfo } from 'nodemailer';
import path from 'path';
import EmailTemplate from 'email-templates';
import { config } from '../config/config';
import { emailInfo } from '../constants';

class EmailService {
    templateRenderer = new EmailTemplate({
        views: {
            root: path.join(__dirname, '../', 'email-templates'),
        },
    });

    // eslint-disable-next-line max-len
    async sendMail(userMail:string, template: string, context?: { userName: any; surname?: any; }, token?: string):
        Promise<SentMessageInfo> {
        // @ts-ignore
        let subject;
        let templateName;
        if (template === 'WELCOME') {
            subject = emailInfo.WELCOME.subject;
            templateName = emailInfo.WELCOME.templateName;
        }
        if (template === 'ACCOUNT_BLOCKED') {
            subject = emailInfo.ACCOUNT_BLOCKED.subject;
            templateName = emailInfo.ACCOUNT_BLOCKED.templateName;
        }
        if (template === 'ACCOUNT_UNLOCKED') {
            subject = emailInfo.ACCOUNT_UNLOCKED.subject;
            templateName = emailInfo.ACCOUNT_UNLOCKED.templateName;
        }
        Object.assign(context, { frontendUrl: 'http://localhost:5500', activateUrl: `http://localhost:5500/api/user/activateUser/${token}` });
        const html = await this.templateRenderer.render(String(templateName), context);
        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Node.js',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });
        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
