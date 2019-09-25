const express = require('express');
const app = express();
const ejs = require('ejs')
const fs = require('fs')
const nodemailer = require('nodemailer');
const bodyparser = require('body-parser')
app.use(bodyparser.json());
app.set('view engine', 'ejs');


app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Origin,Accept,X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});



app.get('/', (req, res) => {
  res.type('html');
  res.render('template.ejs', {
    header: {
      a: 1
    },
    header1: {
      a: 2
    },
    data: {
      a: 3
    },
    remark:'hasijdhasuioswadfnwasilkodadasodioasdnjlkadjasd'
  })
})

app.post('/', async (req, res) => {

  const {
    header,
    header1,
    data,
    subject,
    account,
    password,
    remark
  } = req.body


  const options = { //阿里
    host: 'smtp.mxhichina.com',
    port: 465,
    secure: true,
    pool:true,
    auth: {
      user: account,
      pass: password,
    },
  };

  const transporter = nodemailer.createTransport(options);

  const verify = await transporter.verify(); // 验证SMTP连接配置
  console.log(verify);

  if (verify) {

    for (const i of data) {
      const keys = Object.keys(i)
      const to = i[keys[keys.length - 1]]
      const message = {
        from: account, //tester <zhouwei@smartahc.com>
        to,
        subject: subject,
        html: await ejs.renderFile('./views/template.ejs', {
          header,
          header1,
          data: i,
          remark
        })
      };


      transporter.sendMail(message)

    }
    console.log('send end');

    res.send('发送完毕')


  } else {
    res.send('账号或密码错误')
  }

});



app.listen(3333);