var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        period:cc.Label,

        EndBlack:cc.Node,

        button1:cc.Button,

        button2:cc.Button,

        button3:cc.Button,
    },

    gameOver:function(){
        Global.test = false
        cc.director.loadScene('game_shoot');
    },

    onLoad () {
        this.timerX = 0

        this.button1.node.on('click',this.callback,this)
        this.button2.node.on('click',this.callback,this)
        this.button3.node.on('click',this.callback,this)
    },

    //三種結果按鈕
    callback:function(Button){
        switch (Button.node._name){
            case 'button1': // 射門
                cc.sys.localStorage.setItem('CardNum',JSON.stringify([1,29,15]))
            break
            case 'button2': // 撞柱
                cc.sys.localStorage.setItem('CardNum',JSON.stringify([1,29,16]))
            break
            default: // 界外
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

        if(this.timerX > 5){
            this.gameOver();
            this.timerX = 0;
        }

        if((this.timerX > 3) && (!this.EndBlack.active)){ //若有比EndBlack層級高一層-2
            this.period.node.color = new cc.Color(255,255,255)
            this.EndBlack.active = true
            this.node.children[this.node.childrenCount - 1].active = true
        } 
    },
});
