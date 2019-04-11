var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        card1: cc.Node,

        card2: cc.Node,

        card3: cc.Node,

        ball: cc.Node,

        NodeDBA1: cc.Node,

        NodeDBA2: cc.Node,

        NodeDBA3: cc.Node,

        // resultP: cc.Node,

        // ShowResultAudio:{
        //     type:cc.AudioClip,
        //     default:null
        // },

        cardN:{
            type:cc.AudioClip,
            default: null,
        },

        resultShot:{
            type:cc.AudioClip,
            default: null,
        },

        resultHit:{
            type:cc.AudioClip,
            default: null,
        },

        resultMiss:{
            type:cc.AudioClip,
            default: null,
        },

    },

    ReadyToStart:function(CardNumAry){
        var Jerry = this
        Global.StartFlag = true
        Global.card = CardNumAry;
        for(let i in Global.card){
            let Nnum = parseInt(i) + 1;
            let act = this.JerryOpenCard(this['card'+Nnum],i)        
            setTimeout(function(){
                Jerry.PlayEffectSound(Nnum)
                Jerry['card'+Nnum].runAction(act)
            },parseInt(i)*800)
        }
        setTimeout(function(){
            var together = cc.sequence(cc.spawn(cc.moveTo(0.5,cc.v2(214,-195)),cc.scaleTo(0.5,0.43,0.43)),cc.callFunc(function(){
                Jerry.getShotType();
                Jerry.node.setSiblingIndex(13)
                Jerry.ActiveLoadDBA();
            },this))
            Jerry.node.runAction(together)
        },3200)
    },
    // 自動隨機產生號碼
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
        if((num1 < num2 && num3 > num2) || (num1 > num2 && num3 < num2)){
            Global.ShotType = 1
        }else if(num1 == num2 || num3 == num2){
            Global.ShotType = 2
        }else if((num1 < num2 && num2 > num3) || (num1 > num2 && num3 > num2)){
            Global.ShotType = 3
        }
        // var result = this.resultP
        // cc.loader.loadRes("result/"+Global.resultRP[Global.ShotType -1], cc.SpriteFrame, function (err, spriteFrame) {
        //     result.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        // });
    },

    JerryOpenCard:function(card,Wcard){
        var rnum = Global.card[Wcard]
        var card_color = 'hf_0'+Math.ceil(rnum/13);
        var card_num = this.getnum(rnum%13);
        Global.card[Wcard] = rnum
        cc.loader.loadRes("Card/"+card_color, cc.SpriteFrame, function (err, spriteFrame) {
            card.children[2].getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.loader.loadRes("Card/"+card_num, cc.SpriteFrame, function (err, spriteFrame) {
            card.children[3].getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        var act = cc.sequence(cc.scaleTo(0.3,0,1),cc.callFunc(function(){
            card.children[0].active = false;
            card.children[1].active = true;
            card.children[2].active = true;
            card.children[3].active = true;
            card.runAction(cc.scaleTo(0.3,1,1))
        },this))
        return act
    },

    ActiveLoadDBA:function(){
        //以下是龍骨動畫已預先加載，透過"激活"呈現動畫
        var DBN = this['NodeDBA'+Global.ShotType]
        var DBA = this['NodeDBA'+Global.ShotType].getComponent(dragonBones.ArmatureDisplay)
        DBN.active = true
        if(Global.ShotType == 1 && Global.AudioStatus != 1) cc.audioEngine.play(this.resultShot, false, 0.4)
        else if(Global.ShotType == 2 && Global.AudioStatus != 1)cc.audioEngine.play(this.resultHit, false, 0.4)
        else if(Global.ShotType == 3 && Global.AudioStatus != 1)cc.audioEngine.play(this.resultMiss, false, 0.4)
        DBA.addEventListener(dragonBones.EventObject.COMPLETE, this.chgtype, this);

        //以下是龍骨動態加載
        // var info = Global.infoRRP[Global.ShotType-1]
        // cc.loader.loadRes("ShotAnim/"+info[0], dragonBones.DragonBonesAsset, (err, res) => {
        //     cc.loader.loadRes("ShotAnim/"+info[1], dragonBones.DragonBonesAtlasAsset, (err2, res2) => {
        //         DBA.dragonAsset = res;
        //         DBA.dragonAtlasAsset = res2;
        //         DBA.armatureName = info[2]
        //         DBA.playAnimation(DBA.armatureName,1);
        //         if(Global.ShotType == 1 && Global.AudioStatus != 1) cc.audioEngine.play(this.resultShot, false, 0.5)
        //         else if(Global.AudioStatus != 1)cc.audioEngine.play(this.resultMiss, false, 0.5)
        //         DBA.addEventListener(dragonBones.EventObject.COMPLETE, this.chgtype, this);
        //     })
        // })

        //以下是龍骨預製prefab動態加載
        // cc.loader.loadRes("ShotAnim/"+info, (err, res) => {
        //     var newNode = cc.instantiate(res);
        //     newNode.x = 316
        //     newNode.y = 265
        //     newNode.getComponent(dragonBones.ArmatureDisplay).addEventListener(dragonBones.EventObject.COMPLETE, this.chgtype, this)
        //     cc.director.getScene().addChild(newNode);
        // })
    },

    chgtype:function(){
        Global.ShotFlag = true
    },

    PlayEffectSound:function(z){
        if(Global.AudioStatus != 1) cc.audioEngine.play(this.cardN, false, 1)
    },

    onLoad () {
        Global.card = [0,0,0];
        this.numArray = new Array();
        this.SendToBallFlag = false;
        // this.resultP.active = false;
        Global.ShotFlag = false
        Global.CountDownFlag = false
    },

    start () {
        // var Jerry = this
        // setTimeout(function(){
        //     Jerry.getThreeNum();
        // },5000)

        this.callback = function(){
            var CardNumAry = JSON.parse(cc.sys.localStorage.getItem('CardNum'))
            if((CardNumAry.indexOf(0) == -1) && (Global.CountDownFlag)){
                this.ReadyToStart(CardNumAry);
                this.unschedule(this.callback)
            }
        }
        this.schedule(this.callback, 1);
    },

    // 正式上web須測試 (Chrome 71版之後網頁音訊不會自動播放，此方法可能可以解決)
    // lateUpdate() {
    //     if (cc.sys.isBrowser) {
    //         let context = cc.sys.__audioSupport.context;
    //         if(context != undefined){
    //             if (context.state === 'suspended') {
    //                 context.resume()
    //             }
    //         }
    //     }
    // }

    // update (dt) {},
});
