import nodeMailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }: any) => {
    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASS)
    const transPorter = nodeMailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    await transPorter.sendMail({
        from:`"Collap App" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    })
};
