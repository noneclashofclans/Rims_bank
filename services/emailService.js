const nodemailer = require("nodemailer");

const email_transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
    },
});

// verifying the transporter success
email_transporter.verify((error, success) => {
    if (error){
        console.log("Error while connecting to email service", error);
    }
    else {
        console.log("Email service is ready to take messages");
    }
});

// Function to send email
const send_email_to_user = async(to, subject, text, html) => {
    try{

        const mail_information = {
            from: `Rims Bank <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        }

        const info = await email_transporter.sendMail(mail_information);
        console.log('Message sent: %s', info.messageId);
    }
    catch(error){
        console.log("Error while sending email", error);
        throw error; 
    }
}


async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to Rims Bank!';
    const text = `Hello ${name},\n\nThank you for registering at Rims Bank. We're excited to have you on board!\n\nBest regards,\nThe Rims Bank Team`;
    const html = `<p>Hello ${name},</p><p>Thank you for registering at Rims Bank. We're excited to have you on board!</p><p>Best regards,<br>The Rims Bank Team</p>`;

    await send_email_to_user(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Successful!';
    const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Rims Bank Team`;
    const html = `<p>Hello ${name},</p><p>Your transaction of $${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Rims Bank Team</p>`;

    await send_email_to_user(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = 'Transaction Failed';
    const text = `Hello ${name},\n\nWe regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Rims Bank Team`;
    const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of $${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Rims Bank Team</p>`;

    await send_email_to_user(userEmail, subject, text, html);
}


module.exports = {
    sendRegistrationEmail,
    sendTransactionEmail,
    sendTransactionFailureEmail
};