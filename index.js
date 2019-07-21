const path = require('path')

module.exports = (options, ctx) => {
    return {
        enhanceAppFiles: [
            path.resolve(__dirname, 'enhanceAppFile.js')
        ],
        globalUIComponents: 'ContactUs',
        define:{
            VUEPRESS_CONTACT_US_ENVOLOPE_COLOR: options.buttonColor || '#3eaf7c',
            VUEPRESS_CONTACT_US_ENVOLOPE_SIZE: options.buttonSize || '2x',
            VUEPRESS_CONTACT_US_SEND_TO: options.sentTo || 'hi@yue.dev',
            VUEPRESS_CONTACT_US_LANG: options.labelLanguage || 'en',
            VUEPRESS_CONTACT_US_EMAIL_API: options.emailSenderApi || null,
        },
        async generated (pagePaths) {
            // ...
            console.log("Contact us form plugin generated ...")
        },
        updated() {
            // ...
            // console.log(options)
        },
        async ready() {
            // ...
            // console.log(options)
        }
    }
}