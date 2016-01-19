function EmailService() {}

EmailService.prototype = {

    sendVerifyCode: function(email, rawCode, transport) {
        console.log('Sending', rawCode, 'to', email);
        var mailOptions = {
            from: 'No Reply <no-reply@wordsfromwords.com>',
            to: email,
            subject: 'Words From Words Code',
            text: 'Hi,\n\n' +
            'If you requested a Words From Words account for this email address, confirm it using this code within 10 minutes:\n\n' +
            rawCode + '\n\n' +
            'Otherwise, just delete this email.\n\n' +
            'Warm regards,\n' +
            'Words From Words'
        };
        transport.sendMail(mailOptions, function(err, info){
            if (err) {
                console.log('Error sending email:', err);
            }
            // TODO and WYLO .... Figure out why gay Bluehost is not sending the email. Hhhhhhhhh.
        });
    }
    
};

module.exports = new EmailService();
