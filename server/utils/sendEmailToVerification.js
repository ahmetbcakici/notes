import nodemailer from 'nodemailer';

export default (emailTo, verificationCode) =>
  new Promise(async (resolve, reject) => {
    const emailTransfer = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_MAIL_PW,
      },
    });

    const emailInfo = {
      from: process.env.SENDER_MAIL,
      to: emailTo,
      subject: 'Verify your e-mail address! (NoteAppp)',
      text: `Here is your confirm code: ${verificationCode}`,
    };

    // ABC_NOTE: you can use here async await instead of callback here again

    try {
      await emailTransfer.sendMail(emailInfo);
      resolve('sccs');
    } catch (err) {
      reject(err);
    }
  });
