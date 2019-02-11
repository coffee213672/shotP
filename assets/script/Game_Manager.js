var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {

    },

    gameOver:function(){
        Global.test = false
        cc.director.loadScene('game_shoot');
    },

    onLoad () {
        this.timerX = 0
    },

    start () {
        this.schedule(function(){
            var JerryProgressAry = new Array();
            JerryProgressAry[0] = Math.floor(Math.random()*100);
            JerryProgressAry[1] = Math.floor(Math.random()*(100-JerryProgressAry[0]));
            JerryProgressAry[2] = 100 - JerryProgressAry[0] - JerryProgressAry[1];
            cc.sys.localStorage.setItem('progressbar',JSON.stringify(JerryProgressAry))
        },5)
    },

    update (dt) {
        if(Global.test){
            this.timerX += dt
        }

        if(this.timerX > 3){
            this.gameOver();
            this.timerX = 0;
        }
    },
});
