import nodemailer from 'nodemailer';

export const sendVoteEmail = async (to, candidateName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"voting poll" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Vote Confirmation',
    html: `<p>You have successfully voted for <strong>${candidateName}</strong>.</p>`
  });
};
