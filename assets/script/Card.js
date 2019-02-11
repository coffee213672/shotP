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
            do{
                randnum = Math.floor(Math.random()*52) + 1;
            }
            while(this.numArray.indexOf(randnum) != -1)
            this.numArray.push(randnum);
        }
        while(this.numArray.length < 3)
        cc.sys.localStorage.setItem('CardNum',JSON.stringify(this.numArray));
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
            var rnum = JSON.parse(cc.sys.localStorage.getItem('CardNum'))[Wcard]
            var card_color = 'hf_0'+Math.ceil(rnum/13);
            var card_num = this.getnum(rnum%13);
            Global.card[Wcard] = rnum
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

    onLoad () {
        Global.card = [0,0,0];
        this.numArray = new Array();
        this.SendToBallFlag = false;
        Global.ShotFlag = false
        cc.sys.localStorage.setItem('CardNum',JSON.stringify([0,0,0]));
    },

    start () {
        var Jerry = this
        setTimeout(function(){
            Jerry.getcolor();
        },3000)

        this.callback = function(){
            var CardNumAry = JSON.parse(cc.sys.localStorage.getItem('CardNum'))
            cc.log(CardNumAry.indexOf(0))
            if(CardNumAry.indexOf(0) == -1){
                cc.log('I destroyed')
                Global.card = CardNumAry;
                // var Jerry = this
                for(let i in Global.card){
                    let Nnum = parseInt(i) + 1;
                    let act = this.JerryOpenCard(this['card'+Nnum],i)
                    setTimeout(function(){
                        Jerry['card'+Nnum].runAction(act)
                    },(parseInt(i)+2)*1000)
                }

                setTimeout(function(){
                    var together = cc.sequence(cc.spawn(cc.moveTo(0.5,cc.v2(242,-199)),cc.scaleTo(0.5,0.35,0.35)),cc.callFunc(function(){Global.ShotFlag = true},this))
                    Jerry.node.runAction(together)
                },6000)
            this.unschedule(this.callback)
            }
        }

        this.schedule(this.callback, 1);
    },

    // update (dt) {},
});
