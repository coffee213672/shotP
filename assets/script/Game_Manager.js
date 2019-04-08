var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        period: cc.Label,

        EndBlack: cc.Node,

        ShotMiss:{
            type:cc.AudioClip,
            default:null
        },

        ShotSuccess:{
            type:cc.AudioClip,
            default:null
        },
    },

    gameOver:function(){
        Global.test = false
        cc.log(this.CT)
        cc.director.loadScene('game_shoot');
    },

    onLoad () {
        this.timerX = 0
        cc.sys.localStorage.setItem('CardNum',JSON.stringify([0,0,0])) 
        this.CT = 0
        Global.CloseOpenBGM = false
        Global.sn = 0
        if(cc.sys.localStorage.getItem('hsn') == null || isNaN(parseInt(cc.sys.localStorage.getItem('hsn'))) ){
            cc.sys.localStorage.setItem('hsn','-----------')
        }
    },

    start () {
        //熱度條
        // this.schedule(function(){
        //     var JerryProgressAry = new Array();
        //     JerryProgressAry[0] = Math.floor(Math.random()*100);
        //     JerryProgressAry[1] = Math.floor(Math.random()*(100-JerryProgressAry[0]));
        //     JerryProgressAry[2] = 100 - JerryProgressAry[0] - JerryProgressAry[1];
        //     cc.sys.localStorage.setItem('progressbar',JSON.stringify(JerryProgressAry))
        // },5)

        this.schedule(function(){
            var nowSn = cc.sys.localStorage.getItem('hsn')
            var PeriodLabelString = this.period
            if(nowSn != null && Global.sn == 0){
                if(Global.OldSn == 0 || (Global.OldSn != 0 && Global.OldSn != nowSn)){
                    Global.sn = nowSn
                    Global.OldSn = nowSn
                    PeriodLabelString.string = nowSn
                }
            }else{
                if(Global.sn != 0 && (nowSn != Global.sn)) this.gameOver() 
            }
        },0.5)
    },

    update (dt) {
        this.CT += dt
        if(Global.test){
            this.timerX += dt
        }

        if(this.timerX > 5){
            this.gameOver();
            this.timerX = 0;
        }

        if((this.timerX > 3) && (!this.EndBlack.active)){ //若有比EndBlack層級高一層-2
            this.period.node.color = new cc.Color(255,255,255)
            this.EndBlack.active = true
            Global.CloseOpenBGM = true
            if(Global.ShotType == 1) {
                this.node.children[this.node.childrenCount - 1].children[0].active = true
                if(Global.AudioStatus != 1) cc.audioEngine.play(this.ShotSuccess, false, 0.5)
            }else if(Global.ShotType == 2) {
                this.node.children[this.node.childrenCount - 1].children[1].active = true
                if(Global.AudioStatus != 1) cc.audioEngine.play(this.ShotMiss, false, 0.5)
            }else {
                this.node.children[this.node.childrenCount - 1].children[2].active = true
                if(Global.AudioStatus != 1) cc.audioEngine.play(this.ShotMiss, false, 0.5)
            }
        } 
    },
});
