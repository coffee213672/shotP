var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        card1:{
            default: null,
            type:cc.Node
        },

        card2:{
            default: null,
            type:cc.Node
        },

        card3:{
            default: null,
            type:cc.Node
        },

        ball:{
            default: null,
            type:cc.Node
        },
    },

    getcolor:function(){
        var randnum = 0;
        do{
            randnum = Math.floor(Math.random()*52) + 1;
        }
        while(this.numArray.indexOf(randnum) != -1)
        this.numArray.push(randnum);
        return randnum
    },

    getnum:function(n){
        if(n == 0) n = 13
        else n = n
        return 'hf_'+n
    },

    JerryOpenCard:function(card,Wcard){
        var act = cc.sequence(cc.scaleTo(0.3,0,1),cc.callFunc(function(){
            card.children[0].active = false;
            card.children[1].active = true;
            var rnum = this.getcolor();
            var card_color = 'hf_0'+Math.ceil(rnum/13);
            var card_num = this.getnum(rnum%13);
            this.SendToGlobal(Wcard,rnum)
            cc.loader.loadRes("Card/"+card_color, cc.SpriteFrame, function (err, spriteFrame) {
                card.children[2].getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            cc.loader.loadRes("Card/"+card_num, cc.SpriteFrame, function (err, spriteFrame) {
                card.children[3].getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            card.runAction(cc.scaleTo(0.3,1,1))
        },this))
        return act
    },

    SendToGlobal:function(Wcard,num){
        switch (Wcard){
            case 'card1':
                Global.card1 = num;
            break;
            case 'card2':
                Global.card2 = num;
            break;
            case 'card3':
                Global.card3 = num;
            break;
        }
    },

    onLoad () {
        Global.card1 = 0;
        Global.card2 = 0;
        Global.card3 = 0;

        this.numArray = new Array();
        this.SendToBallFlag = false;
    },

    start () {
        var Jerry = this
        var act1 =  this.JerryOpenCard(this.card1,'card1')
        setTimeout(function(){
            Jerry.card1.runAction(act1);
        },2000)

        var act3 = this.JerryOpenCard(this.card3,'card3')
        setTimeout(function(){
            Jerry.card3.runAction(act3);
        },3000)

        var act2 = this.JerryOpenCard(this.card2,'card2')
        setTimeout(function(){
            Jerry.card2.runAction(act2);
        },4000)

        setTimeout(function(){
            var together = cc.sequence(cc.spawn(cc.moveTo(0.3,cc.v2(242,-199)),cc.scaleTo(0.3,0.35,0.35)),cc.callFunc(function(){Global.ShotFlag = true},this))
            Jerry.node.runAction(together)
        },6000)
    },

    // update (dt) {},
});
