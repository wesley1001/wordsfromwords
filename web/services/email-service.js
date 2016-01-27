function EmailService() {}

EmailService.prototype = {

    sendVerifyCode: function(email, rawCode, transport) {
        console.log('Sending', rawCode, 'to', email);
        
        // TODO and WYLO .... Put spaces between each set of 3 numbers in the code (123 456 789 012)
        
        var mailOptions = {
            from: 'Words From Words <no-reply@wordsfromwords.com>',
            to: email,
            subject: 'Words From Words Code',
            text: 'Hello!\n\n' +
            'If you requested a Words From Words account for this email address, please confirm it using this code within the next few minutes:\n\n' +
            rawCode + '\n\n' +
            'Otherwise, just delete this email.\n\n' +
            'The absoulte warmest of regards,\n' +
            'Words From Words'
        };
        transport.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log('Error sending email:', err);
            }
        });
    }
    
};

module.exports = new EmailService();
