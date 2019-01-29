var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {

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
        },n*65)
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
                act.push(cc.v2(64,119))
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

    getpathnum:function(){
        cc.log(Global.card1+','+Global.card2+','+Global.card3)
        var num1 = this.getnum(Global.card1%13);
        var num2 = this.getnum(Global.card2%13);
        var num3 = this.getnum(Global.card3%13);
        if((num1 < num2 && num3 > num2) || (num1 > num2 && num3 < num2)){
            return 1;
        }else if(num1 == num2 || num3 == num2){
            return 2;
        }else if((num1 < num2 && num2 > num3) || (num1 > num2 && num3 > num2)){
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
        var action = cc.rotateBy(0.5,1020);
        var ballact = this.getpath(1);
        var ballactX = cc.cardinalSplineTo(0.5,ballact,0)
        this.shoot();
        this.node.runAction(cc.spawn(action,ballactX)) //,cc.callFunc(function(){cc.log(this.getComponent("cc.RigidBody").type = cc.RigidBodyType.Dynamic)},this)
    },

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
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
