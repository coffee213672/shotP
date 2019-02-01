var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        Pillar:{
            default:null,
            type:cc.Node
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
                let x = 0.3 - i * 0.05
                setTimeout(function(){
                    xdx.node.runAction(cc.sequence(cc.scaleTo(0.05,x,x),cc.callFunc(function(){Global.test = true},xdx)))
                },i*50)
            }
        }else{
            Global.test = true
        }
        

        // let act = this.act_back(this.pathtype);
        // setTimeout(function(){
        //     xdx.node.runAction(cc.sequence(cc.spawn(cc.cardinalSplineTo(0.7,act,0),cc.rotateBy(0.7,720)),cc.callFunc(function(){Global.test = true},xdx)))
        // },350)
    },

    getpath:function(type){
        var act = new Array();
        switch (type){
            case 1:
                act = [cc.v2(140,-170),cc.v2(140,-34),cc.v2(0,-8)] //[cc.v2(70,-209),cc.v2(118,-146),cc.v2(125,-96),cc.v2(130,-55),cc.v2(103,-16),cc.v2(78,5),cc.v2(41,20),cc.v2(0,31)]
            break;
            case 2:
                act = [cc.v2(70,-191),cc.v2(98,-128),cc.v2(125,-67),cc.v2(147,-20),cc.v2(143,28),cc.v2(123,56),cc.v2(99,91),cc.v2(68,119),cc.v2(41.5,141),cc.v2(21.6,162),cc.v2(0.1,182),cc.v2(-21.1,202),cc.v2(-42.1,225),cc.v2(-65,246),cc.v2(-90,271),cc.v2(-113.2,289)]
            break;
            case 3:
                act = [cc.v2(86,-210),cc.v2(149,-159),cc.v2(204,-105),cc.v2(245,-55),cc.v2(271,-14),cc.v2(258,28),cc.v2(248,55),cc.v2(233,80),cc.v2(197.6,84.3),cc.v2(164.8,76.9),cc.v2(135.4,71.8),cc.v2(113.5,68.7),cc.v2(95.6,64.1),cc.v2(82.4,61.4),cc.v2(65.1,57.7),cc.v2(46.3,54.1)]
            break;
        }
        return act
        
    },

    // act_back:function(type){
    //     var act = new Array();
    //     switch (type){
    //         case 2:
    //             // 向右  act = [cc.v2(78,141),cc.v2(90,162),cc.v2(101,182),cc.v2(114,202),cc.v2(129,225),cc.v2(142,246),cc.v2(160,271),cc.v2(186,289)]
    //             act = [cc.v2(41.5,141),cc.v2(21.6,162),cc.v2(0.1,182),cc.v2(-21.1,202),cc.v2(-42.1,225),cc.v2(-65,246),cc.v2(-90,271),cc.v2(-113.2,289)]
    //         break;
    //         case 3:
    //             act = [cc.v2(197.6,84.3),cc.v2(164.8,76.9),cc.v2(135.4,71.8),cc.v2(113.5,68.7),cc.v2(95.6,64.1),cc.v2(82.4,61.4),cc.v2(65.1,57.7),cc.v2(46.3,54.1)]
    //         break;
    //     }
    //     return act
    // },

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
        var action = cc.rotateBy(1,1080);
        var ballactX = cc.catmullRomTo(1,ballact,0) //catmullRomTo
        this.shoot();
        this.node.runAction(cc.spawn(action,ballactX).easing(cc.easeInOut(1.0))) //,cc.callFunc(function(){cc.log(this.getComponent("cc.RigidBody").type = cc.RigidBodyType.Dynamic)},this)
    },

    onLoad () {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.debugDrawFlags = 0

        var bang = cc.director.getCollisionManager();
        bang.enabled = true;

        this.pathtype = 0;

        // bang.enabledDebugDraw = true;
        // bang.enabledDrawBoundingBox = true

        //ball層級6 getSiblingIndex setSiblingIndex 
        //球門層級2
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
