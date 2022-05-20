const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();





app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== Server is ready to take messages: ${success} ===`);
});

app.post("/send", function (req, res) {
  console.log(req.body);
  let mailOptions = {
    from: `${req.body.name}`,
    to:`${req.body.email}`,
    subject: `您已成功報名活動`,
    html: `${req.body.content}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent to Client==");
      res.json({
        status: "success",
      });
    }
  });
});



app.post("/send/host", function (req, res) {
  console.log(req.body);
  let mailOptions = {
    from: `${req.body.name}`,
    to:`${req.body.email}`,
    subject: `${req.body.title}有新的報名者`,
    html: `${req.body.content}`,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
      console.log("== Message Sent Hoster==");
      res.json({
        status: "success",
      });
    }
  });
});