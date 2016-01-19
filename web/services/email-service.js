function EmailService() {}

EmailService.prototype = {

    sendVerifyCode: function(email, rawCode) {
        // TODO and WYLO 1 .... Send the email.
    }
    
};

module.exports = new EmailService();
