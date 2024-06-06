const nodemailer = require('nodemailer');

const notifyAdmin = async (recipients, subject, message) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'numanbnr4@gmail.com',
                pass: 'tanh uxls dshx dkpb' 
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        const listOfRecipients = recipients.split(',').map(email => email.trim());

        const info = await transporter.sendMail({
            from: 'numanbnr4@gmail.com',
            to: listOfRecipients.join(', '), 
            subject: subject,
            html: message
        });

        console.log('Message sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; 
    }
};

module.exports = {
    notifyAdmin
};
