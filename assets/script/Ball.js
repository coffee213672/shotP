var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        Pillar:{
            default:null,
            type:cc.RigidBody
        }
    },

    shoot:function(){
        for(var i=1;i<8;i++){
            this.shootT(i);
        }
    },

    shootT:function(n){
        var xdx = this
        var x = 1- n/10
        setTimeout(function(){
            xdx.node.runAction(cc.scaleTo(0.1,x,x))
            if(n == 7) xdx.shootX();
        },n*50)
    },

    shootX:function(){
        let xdx = this
        let act = this.act_back();
       
        // for(let i=0;i<6;i++){
            // let x = 0.3 - i*5/100
            setTimeout(function(){
                xdx.node.runAction(cc.cardinalSplineTo(0.3,act,0))
                // xdx.node.runAction(cc.scaleTo(0.1,x,x))
            },1000)
        // }
    },

    getpath:function(type){
        var act = new Array();
        switch (type){
            case 1:
                act.push(cc.v2(70,-209))
                act.push(cc.v2(118,-146))
                act.push(cc.v2(125,-96))
                act.push(cc.v2(130,-55))
                act.push(cc.v2(103,-16))
                act.push(cc.v2(78,5))
                act.push(cc.v2(41,20))
                act.push(cc.v2(0,31))
            break;
            case 2:
                act.push(cc.v2(70,-191))
                act.push(cc.v2(98,-128))
                act.push(cc.v2(125,-67))
                act.push(cc.v2(147,-20))
                act.push(cc.v2(143,28))
                act.push(cc.v2(123,56))
                act.push(cc.v2(99,91))
                act.push(cc.v2(68,119))
                /* 
                    act.push(cc.v2(91.8,140))
                    act.push(cc.v2(135.5,160.8))
                    act.push(cc.v2(186.2,183.9))
                    act.push(cc.v2(256.2,199))
                    act.push(cc.v2(329.3,200))
                    act.push(cc.v2(-167,-176))
                    act.push(cc.v2(-217,-252))
                    act.push(cc.v2(-244,-372))
                */
            break;
            case 3:
                act.push(cc.v2(86,-210))
                act.push(cc.v2(149,-159))
                act.push(cc.v2(204,-105))
                act.push(cc.v2(245,-55))
                act.push(cc.v2(271,-14))
                act.push(cc.v2(258,28))
                act.push(cc.v2(248,55))
                act.push(cc.v2(229,80))
            break;
        }
        return act
        
    },

    act_back:function(){
        var act = new Array();
        act.push(cc.v2(48.7,141))
        act.push(cc.v2(11.5,182))
        act.push(cc.v2(-1.8,202))
        act.push(cc.v2(-17.8,225))
        act.push(cc.v2(-30.7,246))
        act.push(cc.v2(-59.5,289))
        return act
    },

    getpathnum:function(){
        var num1 = this.getnum(Global.card[0]%13);
        var num2 = this.getnum(Global.card[1]%13);
        var num3 = this.getnum(Global.card[2]%13);
        if((num1 < num3 && num2 > num3) || (num1 > num3 && num2 < num3)){
            return 1;
        }else if(num1 == num3 || num3 == num2){
            return 2;
        }else if((num1 < num3 && num3 > num2) || (num1 > num3 && num2 > num3)){
            return 3;
        }
    },

    getnum:function(n){
        if(n == 0) n = 13
        else n = n
        return n
    },

    ballshot:function(){
        var  wtype = this.getpathnum();
        var action = cc.rotateBy(2,4096);
        var ballact = this.getpath(2);
        var ballactX = cc.cardinalSplineTo(0.7,ballact,0)
        this.shoot();
        this.node.runAction(cc.spawn(action,ballactX)) //,cc.callFunc(function(){cc.log(this.getComponent("cc.RigidBody").type = cc.RigidBodyType.Dynamic)},this)
    },

    onLoad () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.debugDrawFlags = 0
            // cc.PhysicsManager.DrawBits.e_aabbBit |
            // cc.PhysicsManager.DrawBits.e_jointBit |
            // cc.PhysicsManager.DrawBits.e_shapeBit;
        
        // cc.log(this.getComponent(cc.RigidBody).enabledContactListener)
        // cc.log(this.Pillar.getComponent(cc.RigidBody).enabledContactListener)

        var bang = cc.director.getCollisionManager();
        bang.enabled = true;

        // bang.enabledDebugDraw = true;
        // bang.enabledDrawBoundingBox = true
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        
    },

    onEndContact: function (contact, selfCollider, otherCollider) {
        // cc.log(contact, selfCollider, otherCollider)
    },


    start () {
        this.callback = function() {
            if(Global.ShotFlag == true){
                this.ballshot();
                this.unschedule(this.callback);
            }
        }

        this.schedule(this.callback, 1);
    },

    // update (dt) {},
});
