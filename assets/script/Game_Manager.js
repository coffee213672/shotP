var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        period:{
            default:null,
            type:cc.Label
        },

        button1:cc.Button,

        button2:cc.Button,

        button3:cc.Button,
    },

    gameOver:function(){
        Global.test = false
        Global.sn += 1
        cc.director.loadScene('game_shoot');
    },

    onLoad () {
        this.timerX = 0

        this.button1.node.on('click',this.callback,this)
        this.button2.node.on('click',this.callback,this)
        this.button3.node.on('click',this.callback,this)
    },

    callback:function(Button){
        switch (Button.node._name){
            case 'button1':
                cc.sys.localStorage.setItem('CardNum',JSON.stringify([1,29,15]))
            break
            case 'button2':
                cc.sys.localStorage.setItem('CardNum',JSON.stringify([1,29,16]))
            break
            default:
                cc.sys.localStorage.setItem('CardNum',JSON.stringify([1,29,17]))
        }
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
