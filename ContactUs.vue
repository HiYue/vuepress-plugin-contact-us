<template>
    <div class="vuepress-plugin-contact-us-wrapper">
        <div id="the-floating-button" @click="formVisible = !formVisible">
            <font-awesome-icon :icon="appIcon" :size="size" :style="attachStyles()" />
        </div>
        <div class="contact-us-form-wrap" v-show="formVisible">
            <div class="line-row">
                <h2>{{ language.LB_FORM_TITLE }}</h2>
            </div>
            <div class="line-row">
                <input id="v-c-name" class="v-c-input" v-model="userFullName" :placeholder="language.LB_YOUR_NAME">
            </div>
            <div class="line-row">
                <input id="v-c-email" class="v-c-input" v-model="emailFrom" :placeholder="language.LB_YOUR_EMAIL">
            </div>
            <div class="line-row">
                <textarea rows="5" id="v-c-message" class="v-c-input" :placeholder="language.LB_YOUR_MESSAGE">{{message}}</textarea>
            </div>
            <div class="line-row">
                <button class="btn btn-send" @click.prevent="submitForm()">{{ language.LB_YOUR_BUTTON_SEND }}</button>
                <button class="btn btn-cancel" @click.prevent="formVisible = false">{{ language.LB_YOUR_BUTTON_CANCAL }}</button>
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
 */
import VuepressContactUsLang from './utils'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faChessQueen, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)
library.add(faChessQueen)
library.add(faEnvelope)

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
            // UI
            size: '2x',         // Envolope Icon size
            color: '#3eaf7c'        // Envolope Icon color
        }
    },
    computed:{
        appIcon () {
            return faEnvelope
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
    },
    methods:{
        attachStyles: function(){
            return {
                color: this.color 
            };
        },
        submitForm: function(){

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
        height 300px;
        position :absolute;
        bottom: 1.4rem;
        left : 3rem;
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
    }
}
</style>