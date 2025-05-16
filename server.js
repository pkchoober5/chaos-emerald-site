const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.post('/submit', (req, res) => {
  const { rsn, level, reason } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'New Chaos Emerald Clan Application',
    text: \`
      RuneScape Name: \${rsn}
      Combat Level: \${level}
      Reason to Join: \${reason}
    \`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email failed:', error);
      return res.send('<h2>Oops! Something went wrong.</h2>');
    }
    console.log('Email sent:', info.response);
    res.send('<h2>Thanks! We’ve received your application.</h2>');
  });
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});
