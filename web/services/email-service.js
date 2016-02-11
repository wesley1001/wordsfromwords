function EmailService() {}

EmailService.prototype = {
    
    createVerifyCode: function() {
        var rawCode = '';
        var pool = '0123456789';
        for (var i = 0; i < 12; i++) {
            rawCode += pool.charAt(Math.floor(Math.random() * pool.length));
        }
        return rawCode;
    },

    sendVerifyCode: function(email, rawCode, transport) {
        var prettyCode = '';
        var result = rawCode.match(/\d{3}/g);
        for (var i = 0; i < result.length; i++) {
            prettyCode += (result[i] + ' ');
        }
        
        var mailOptions = {
            from: 'Words From Words <no-reply@wordsfromwords.com>',
            to: email,
            subject: 'Words From Words Code',
            text: 'Hello!\n\n' +
            'If you requested a Words From Words account for this email address, please confirm it using this code within the next few minutes:\n\n' +
            prettyCode + '\n\n' +
            'Otherwise, just delete this email.\n\n' +
            'The absoulte warmest of regards,\n' +
            'Words From Words'
        };
        transport.sendMail(mailOptions, function(err, info) {
            if (err) {
                console.log('Error sending email:', err);
            }
        });
    },
    
    sendPasswordReset: function() {
        
    }
    
};

module.exports = new EmailService();
