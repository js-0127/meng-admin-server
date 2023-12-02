export default () =>({
    mail: {
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
        user: 'xxx@qq.com',
        pass: ''
      }
    },
    mailCaptchaExpire: {
      expire: 60 * 30
    }
})
