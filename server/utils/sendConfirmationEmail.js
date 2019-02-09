import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendConfirmationEmail = async (recipient, url) => {
  const msg = {
    to: recipient,
    from: "c.stelu11@gmail.com",
    subject: "Confirm your email",
    text: "and easy to do anywhere, even with Node.js",
    html: `<html>
      < body >
      <p>Hey!! You just registered for an account at speakCode. Please confirm your email</p>
      <a href=${url}>Confirm your Email</a>
                  </body
    ></html >`
  };
  await sgMail.send(msg);
};
