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

    async sendMail(userMail:string, context = {}):
        Promise<SentMessageInfo> {
        const { subject, templateName } = emailInfo.WELCOME;
        Object.assign(context, { frontendUrl: 'https://google.com' });

        const html = await this.templateRenderer.render(templateName, context);
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
