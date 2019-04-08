var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        BGM:{
            type:cc.AudioClip,
            default:null
        },
        BGMOpen:{
            type:cc.AudioClip,
            default:null
        },
    },

    onLoad () {
        this.Opening = false
        this.OpenAudioID = 0
        cc.game.addPersistRootNode(this.node);
        this.audioID = cc.audioEngine.play(this.BGM, true);
        cc.audioEngine.setVolume(this.audioID, 0.2);
        if(cc.sys.localStorage.getItem('AudioIO') == 1) {
            cc.audioEngine.pause(this.audioID);
            Global.AudioStatus = 1
        }else{
            cc.sys.localStorage.setItem('AudioIO',0)
        }
    },

    start () {
        this.schedule(function(){
            var audioIO = cc.sys.localStorage.getItem('AudioIO')
            if(audioIO == 1 && audioIO != Global.AudioStatus) {
                Global.AudioStatus = audioIO
                cc.audioEngine.pause(this.audioID)
                if(this.OpenAudioID != 0) cc.audioEngine.pause(this.OpenAudioID)
            }else if(audioIO == 0 && audioIO != Global.AudioStatus) {
                cc.audioEngine.resume(this.audioID)
                if(this.OpenAudioID != 0 && this.Opening) {
                    cc.audioEngine.resume(this.OpenAudioID)
                    cc.audioEngine.pause(this.audioID)
                }
                Global.AudioStatus = audioIO
            }

            if(audioIO == 0) {
                if(Global.StartCount && !this.Opening){
                    this.Opening = true
                    this.OpenAudioID = cc.audioEngine.play(this.BGMOpen, false, 0.2)
                    cc.audioEngine.pause(this.audioID);
                }else if(!Global.StartCount && this.Opening){
                    this.Opening = false
                    cc.audioEngine.resume(this.audioID)
                    if(this.OpenAudioID != 0) cc.audioEngine.pause(this.OpenAudioID)
                }

                if(Global.CloseOpenBGM) cc.audioEngine.pause(this.OpenAudioID)
            }
        },0.1)
    },

    // update (dt) {},
});
