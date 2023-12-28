export default () =>({
    mail: {
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
        user: '1374744754@qq.com',
        pass: ''
      }
    },
    mailCaptchaExpire: {
      expire: 60 * 30
    }
})
