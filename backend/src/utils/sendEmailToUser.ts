import nodemailer from 'nodemailer';

export async function sendEmailToUser(email: string, otp: number)  {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verification email',
        html: `
           <p> 
                We’ve sent a one-time password (OTP) to your for restore your password. 
                Please enter it below to continue.
            </p>
            <p> ${otp} (6-digit input)</p>
            <p> This code will expire in 10 minutes.</p>
         `
    }

    await transporter.sendMail(mailOptions);
}