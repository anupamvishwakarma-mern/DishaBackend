const twilio = require('twilio');
const randomstring = require('randomstring');

// Twilio credentials
const accountSid = 'AC646d5705e8b3c75cf3c2e75659bbb23e';
const authToken = '2872b0b485e1d78eb2bbc56b126bb624';
const twilioPhoneNumber = '+918303079896';

const client = twilio(accountSid, authToken);

// Function to generate a random OTP
const generateOTP = () => {
  return randomstring.generate({
    length: 6,
    charset: 'numeric',
  });
};

// Function to send OTP via SMS
const sendOTP = (to, otp) => {
  const message = `Your OTP is: ${otp}`;

  client.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: `+${to}`, // Assuming 'to' is the recipient's phone number
    })
    .then((message) => console.log(`OTP sent successfully: ${message.sid}`))
    .catch((error) => console.error(`Error sending OTP: ${error.message}`));
};

// Example: Generate OTP and send it to a mobile number
const recipientPhoneNumber = '+919648654062'; // Replace with the recipient's phone number

const otp = generateOTP();
console.log(`Generated OTP: ${otp}`);

sendOTP(recipientPhoneNumber, otp);


