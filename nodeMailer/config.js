'use strict';
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

// async..await is not allowed in global scope, must use a wrapper
const nodeMailer = async (order) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  // const message = order.orderItems.map((item) => item.name, item.price);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'thewildboyscampout@gmail.com',
      pass: 'Mnbvcxz90$',
    },
  });

  let name, price, qty;
  for (let x = 0; x < order.orderItems.length; x++) {
    name = order.orderItems[x].name;
    price = order.orderItems[x].price;
    qty = order.orderItems[x].qty;
  }

  let info = await transporter.sendMail({
    from: '"The Wild Boys" <thewildboyscampout@gmail.com>', // sender address
    to: order.user.email, // list of receivers
    subject: `Order number ${order.id.slice(order.id.length - 5)}`, // Subject line
    text: 'Here is your order details', // plain text body
    html: `<b> Hey ${order.user.name} thanks!,<br/> Here are  your order details
        ${name} - $${price} x  ${qty}
        You can pick up your bracelet at the gate with valid ID that matches the name on your order
        Cheers,<br/>
        The Wild Boys
    </b>
    
    `,
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

// main().catch(console.error);

export default nodeMailer;
