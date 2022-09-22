import nodemailer from "nodemailer";

export default (user, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,

    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPass,
    },
  });

  const url = `http://localhost:5000/confirmation/${token}`;

  const mailOptions = {
    from: "Expressjs email sender <rpaudel379@gmail.com>",
    to: user.email,
    subject: "Account Verification",
    html: ` <div>
    <h1> hello ${user.username},
    </h1>
    <p>please verify your email <span style="font-weight: bold;">${user.email}</span> by going through this link below:</p>
    <a href=${url}>${url}</a>
</div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

/* attachments: [
    { filename: "image1.jpg", path: img, cid: "unique@app.com" },
    {
      href: "/style.css",
      path: csspath,
    },
  ], */
