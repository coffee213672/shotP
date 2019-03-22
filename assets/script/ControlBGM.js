var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        BGM:{
            type:cc.AudioClip,
            default:null
        }
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        this.audioID = cc.audioEngine.play(this.BGM, true);
        cc.audioEngine.setVolume(this.audioID, 0.2);
        if(cc.sys.localStorage.getItem('AudioIO') == 1) {
            cc.audioEngine.pause(this.audioID);
            Global.AudioStatus = 1
        }
    },

    start () {
        this.schedule(function(){
            var audioIO = cc.sys.localStorage.getItem('AudioIO')
            if(audioIO == 1 && audioIO != Global.AudioStatus) {
                Global.AudioStatus = audioIO
                cc.audioEngine.pause(this.audioID);
            }else if(audioIO == 0 && audioIO != Global.AudioStatus) {
                cc.audioEngine.resume(this.audioID);
                Global.AudioStatus = audioIO
            }
        },0.1)
    },

    // update (dt) {},
});
