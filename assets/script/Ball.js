var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        Pillar:{
            default:null,
            type:cc.Node
        },
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
            if(xdx.pathtype == 1) xdx.node.runAction(cc.sequence(cc.scaleTo(0.1,x,x),cc.callFunc(function(){Global.test = true},xdx)))
            else {
                xdx.node.runAction(cc.scaleTo(0.1,x,x))
                if(n == 7) xdx.shootX();
            }
        },n*50)
    },

    shootX:function(){
        let xdx = this
        if(this.pathtype == 3) {
           this.Pillar.setSiblingIndex(7)
           for(let i=1;i<6;i++){
               let x = 0.3 - i * 0.02
               setTimeout(function(){
                   xdx.node.runAction(cc.sequence(cc.scaleTo(0.05,x,x),cc.callFunc(function(){Global.test = true},xdx)))
               },i*50)
           }
        }else{
            Global.test = true
        }
    },

    getpath:function(type){
        var act = new Array();
        switch (type){
            case 1:
                cc.director.getCollisionManager().enabled = false
                this.moveSec = 0.9
                this.angle = 960
                act = [cc.v2(0,-252),cc.v2(132,-20),cc.v2(62,14),cc.v2(0,-28),cc.v2(-33,-67)] //[cc.v2(70,-209),cc.v2(118,-146),cc.v2(125,-96),cc.v2(130,-55),cc.v2(103,-16),cc.v2(78,5),cc.v2(41,20),cc.v2(0,31)]
            break;
            case 2:
                cc.director.getCollisionManager().enabled = true
                this.moveSec = 0.5
                this.angle = 720
                act = [cc.v2(0,-252),cc.v2(70,-191),cc.v2(98,-128),cc.v2(125,-67),cc.v2(147,-20),cc.v2(143,28),cc.v2(123,56),cc.v2(99,91),cc.v2(68,119)]
            break;
            case 3:
                cc.director.getCollisionManager().enabled = false
                this.moveSec = 1.5
                this.angle = 2880
                act = [cc.v2(0,-252),cc.v2(232,-68),cc.v2(325,225),cc.v2(192,199),cc.v2(103,127),cc.v2(32,55),cc.v2(-17,-6),cc.v2(-62,-45)]
                //cc.v2(86,-210),cc.v2(149,-159),cc.v2(204,-105),cc.v2(245,-55),cc.v2(271,-14),cc.v2(258,28),cc.v2(248,55),cc.v2(233,80),cc.v2(197.6,84.3),cc.v2(164.8,76.9),cc.v2(135.4,71.8),cc.v2(113.5,68.7),cc.v2(95.6,64.1),cc.v2(82.4,61.4),cc.v2(65.1,57.7),cc.v2(46.3,54.1)
            break;
        }
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
        this.pathtype = this.getpathnum();
        var ballact = this.getpath(this.pathtype);
        var action = cc.rotateBy(this.moveSec,this.angle);
        var ballactX = cc.cardinalSplineTo(this.moveSec,ballact,0) //catmullRomTo
        this.shoot();
        this.node.runAction(cc.spawn(action,ballactX).easing(cc.easeOut(1.0))) //,cc.callFunc(function(){cc.log(this.getComponent("cc.RigidBody").type = cc.RigidBodyType.Dynamic)},this)
    },

    onLoad () {
        
        cc.director.getCollisionManager().enabledDebugDraw = false    

        this.pathtype = 0;
        this.moveSec = 0;
        this.slowSec = 0;
        //ball層級6 getSiblingIndex setSiblingIndex 
        //球門層級2
    },

    onCollisionEnter: function (other, self) {
        var Jerry = this
        this.Pillar.children[0].active = true

        var action = cc.rotateBy(0.3,540);
        var act2 = [cc.v2(41.5,141),cc.v2(21.6,162),cc.v2(0.1,182),cc.v2(-21.1,202),cc.v2(-42.1,225),cc.v2(-65,246),cc.v2(-90,271),cc.v2(-113.2,289)];
        var ballactX = cc.cardinalSplineTo(0.3,act2,0)
        setTimeout(function(){
            Jerry.node.runAction(cc.spawn(action,ballactX).easing(cc.easeIn(1.0)))
        },70)
    },

    onCollisionExit: function (other, self) {
        var Jerry = this
        setTimeout(function(){Jerry.Pillar.children[0].active = false},50)
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
