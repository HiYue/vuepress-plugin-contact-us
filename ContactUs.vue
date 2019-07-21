<template>
    <div class="vuepress-plugin-contact-us-wrapper">
        <div id="the-floating-button" @click="formVisible = !formVisible">
            <font-awesome-icon :icon="appIcon" :size="size" :style="attachStyles()" />
        </div>
        <div class="contact-us-form-wrap" v-show="formVisible">
            <div class="line-row">
                <h2>{{ language.LB_FORM_TITLE }}</h2>
            </div>
            <ul class="error-box" v-if="errors.length > 0">
                <li v-for="msg in errors" class="error-msg">{{ msg }}</li>
            </ul>
            <div class="line-row">
                <input id="v-c-name" class="v-c-input" v-model="userFullName" :placeholder="language.LB_YOUR_NAME">
            </div>
            <div class="line-row">
                <input id="v-c-email" class="v-c-input" v-model="emailFrom" :placeholder="language.LB_YOUR_EMAIL">
            </div>
            <div class="line-row">
                <textarea rows="5" id="v-c-message" class="v-c-input" :placeholder="language.LB_YOUR_MESSAGE" v-model="message"></textarea>
            </div>
            <div class="line-row">
                <button class="btn btn-send" @click.prevent="submitForm()">
                    <font-awesome-icon :icon="spinnerIcon" v-show="sendingData" spin/>
                    <font-awesome-icon :icon="sendIcon" v-show="!sendingData" />
                    {{ language.LB_YOUR_BUTTON_SEND }}
                </button>
                <button class="btn btn-cancel" @click.prevent="formVisible = false">
                    <font-awesome-icon :icon="closeIcon" />
                    {{ language.LB_YOUR_BUTTON_CANCAL }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
/**
 * global variables: 
 * VUEPRESS_CONTACT_US_ENVOLOPE_COLOR, 
 * VUEPRESS_CONTACT_US_ENVOLOPE_SIZE, 
 * VUEPRESS_CONTACT_US_SEND_TO,
 * VUEPRESS_CONTACT_US_LANG
 * VUEPRESS_CONTACT_US_EMAIL_API
 */
import VuepressContactUsLang from './utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faEnvelope, faShareSquare, faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

library.add(faSpinner, faEnvelope, faShareSquare, faWindowClose)

export default {
    components: {
        FontAwesomeIcon
    },
    data() {
        return {
            formVisible: false,
            emailFrom: null,    // User's email
            userFullName: null, // User's full name
            message: null,      // User's message
            emailTo: null,      // Receiver's email
            lang: 'en',         // Language to use
            sendgridApi: null,  // Sendgrid api key
            errors: [],         // Validation
            // UI
            sendingData: false,     // Send message to API
            size: '2x',         // Envolope Icon size
            color: '#3eaf7c'        // Envolope Icon color
        }
    },
    computed:{
        appIcon () {
            return faEnvelope
        },
        spinnerIcon () {
            return faSpinner
        },
        sendIcon () {
            return faShareSquare
        },
        closeIcon () {
            return faWindowClose
        },
        /**
         * Get language pack
         * @return Object
         */
        language() {
            const vc = new VuepressContactUsLang()
            return vc.getLang(this.lang)
        }
    },
    created(){
        // For computed attribute
        this.lang = VUEPRESS_CONTACT_US_LANG;
    },
    mounted(){
        this.size = VUEPRESS_CONTACT_US_ENVOLOPE_SIZE;
        this.color = VUEPRESS_CONTACT_US_ENVOLOPE_COLOR;
        this.emailTo = VUEPRESS_CONTACT_US_SEND_TO;
        this.emailApi = VUEPRESS_CONTACT_US_EMAIL_API;
    },
    methods:{
        attachStyles: function(){
            return {
                color: this.color 
            };
        },
        submitForm: function(){
            // Validations
            this.errors = [];
            if(!this.userFullName){
                this.errors.push(this.language.LB_ERROR_NAME)
            }

            if(!this.emailFrom){
                this.errors.push(this.language.LB_ERROR_EMAIL)
            }else if(!this.validEmail(this.emailFrom)){
                this.errors.push(this.language.LB_ERROR_EMAIL_VALID)
            }

            if(!this.message){
                this.errors.push(this.language.LB_ERROR_MESSAGE_BODY)
            }

            if (this.errors.length > 0) {
                return false;
            }

            if(this.emailApi){
                // Custom email sending api provided
                this.sendingData = true;
                axios.post(
                    this.emailApi,
                    {
                        email: this.emailFrom,
                        fullname: this.userFullName,
                        message: this.message
                    }
                ).then(res=>{
                    if(res.status === 200){
                        // If return staus 200, means OK
                        this.formVisible = false;
                    }
                }).catch(err => {

                }).finally(res => {
                    this.sendingData = false;
                })
            }else{
                // Use default email client to send email
                let params = {
                    subject: 'Message from ' + this.userFullName,
                    body: this.message
                }
                let str = Object.keys(params)
                    .map(key => key + '=' + params[key])
                    .join('&');
                window.location.href = 'mailto:' + this.emailTo + '?' + str;
            }
        },
        validEmail: function (email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }
    }
}
</script>

<style lang="stylus" scoped>
.vuepress-plugin-contact-us-wrapper{
    cursor: pointer;
    position: fixed;
    bottom: 0;
    left: 20rem;
    width: 50px;
    height : 50px;
    z-index: 1;
    #the-floating-button{
        width: 50px;
        height: 50px;
        line-height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    #the-floating-button:hover{
        .fa-envelope{
            color : #333333 !important;
        }
    }
    .contact-us-form-wrap{
        background-color: white;
        width : 400px;
        position :absolute;
        bottom: 4.4rem;
        left : 0rem;
        border: solid 1px #ededed;
        -webkit-box-shadow: 3px 3px 7px 1px rgba(204,200,204,0.59);
        -moz-box-shadow: 3px 3px 7px 1px rgba(204,200,204,0.59);
        box-shadow: 3px 3px 7px 1px rgba(204,200,204,0.59);
        padding: 10px;
        .line-row{
            padding: 5px 0;
            display: flex;
            justify-content : center;
            h2{
                text-align: center;
                padding: 0;
                border : none;
                margin: 12px;
            }
            .v-c-input{
                width :80%;
                padding: 6px;
                border: solid 1px #ededed;
                font-size: 12px;
            }
            .btn{
                width : 40%;
                margin: 6px;
                border-radius: 0;
                padding: 6px;
                font-size: 14px;
                cursor: pointer;
            }
            .btn-send{
                background-color: #007bff;
                border-color: #007bff;
                color: white;
            }
            .btn-cancel{
                background-color : #f8f9fa;
                border-color: #f8f9fa;
                color : #333;
            }
            .btn-cancel:hover{
                background-color : #e2e6ea;
                border-color: #e2e6ea;
            }
            .btn-send:hover{
                background-color : #0069d9;
                border-color: #0069d9;
            }
        }
        .error-box{
            .error-msg{
                margin: 5px;
                color: red;
                font-size : 12px;
                margin-left: 28px;
            }
        }
    }
}
@media screen and (max-width: 480px)
    .vuepress-plugin-contact-us-wrapper
        left: 0;
</style>