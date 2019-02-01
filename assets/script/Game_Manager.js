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
            Global.progressbar_v[0] = Math.floor(Math.random()*100);
            Global.progressbar_v[1] = Math.floor(Math.random()*(100-Global.progressbar_v[0]));
            Global.progressbar_v[2] = 100 - Global.progressbar_v[0] - Global.progressbar_v[1]
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
