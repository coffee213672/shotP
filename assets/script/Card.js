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

        NodeDBA:{
            default: null,
            type:cc.Node
        },
    },

    getThreeNum:function(){
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

    getnumN:function(n){
        if(n == 0) n = 13
        else n = n
        return n
    },

    getShotType:function(){
        var num1 = this.getnumN(Global.card[0]%13);
        var num2 = this.getnumN(Global.card[1]%13);
        var num3 = this.getnumN(Global.card[2]%13);
        if((num1 < num3 && num2 > num3) || (num1 > num3 && num2 < num3)){
            Global.ShotType = 1
        }else if(num1 == num3 || num3 == num2){
            Global.ShotType = 2
        }else if((num1 < num3 && num3 > num2) || (num1 > num3 && num2 > num3)){
            Global.ShotType = 3
        }
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

    ActiveLoadDBA:function(){
        var DBA = this.NodeDBA.getComponent(dragonBones.ArmatureDisplay);
        var info = Global.infoRP[Global.ShotType]
        cc.loader.loadRes(info[0], dragonBones.DragonBonesAsset, (err, res) => {
            cc.loader.loadRes(info[1], dragonBones.DragonBonesAtlasAsset, (err2, res2) => {
                DBA.dragonAsset = res;
                DBA.dragonAtlasAsset = res2;
                DBA.armatureName = info[2]
                DBA.playAnimation(DBA.armatureName,1);
                DBA.addEventListener(dragonBones.EventObject.COMPLETE, this.chgtype, this);
            })
        })
    },

    chgtype:function(){
        cc.log('come in')
        Global.ShotFlag = true
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
        // setTimeout(function(){
        //     Jerry.getThreeNum();
        // },3000)

        this.callback = function(){
            var CardNumAry = JSON.parse(cc.sys.localStorage.getItem('CardNum'))
            if(CardNumAry.indexOf(0) == -1){
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
                    var together = cc.sequence(cc.spawn(cc.moveTo(0.5,cc.v2(242,-199)),cc.scaleTo(0.5,0.35,0.35)),cc.callFunc(function(){
                        Jerry.getShotType();
                        Jerry.ActiveLoadDBA();
                    },this))
                    Jerry.node.runAction(together)
                },6000)
            this.unschedule(this.callback)
            }
        }

        this.schedule(this.callback, 1);
    },

    // update (dt) {},
});
