var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'swordanchorthesis@gmail.com',
        pass: 'hackreactor1'
    }
});


exports.invite = function(req, res) {
    // setup e-mail
    var mailOptions = {
        from: 'SnapIt Team <swordanchorthesis@gmail.com>', // sender address
        to: req.query.inviteeEmail,
        subject: req.query.username + ' wants you to join them on SnapIt!', // Subject line
        html: '<a href="http://localhost:9000/signup">Get started now</a><b> with SnapIt; we make the internet better</b>' // html body
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });

    res.end();
};