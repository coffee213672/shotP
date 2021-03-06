var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        Pillar:cc.Node,
        mask:cc.Node,
        
        HitGround:{
            type:cc.AudioClip,
            default: null,
        },
        HitGoal:{
            type:cc.AudioClip,
            default: null,
        },
        OutInWater:{
            type:cc.AudioClip,
            default: null,
        },
        Kick:{
            type:cc.AudioClip,
            default: null,
        },
    },

    shoot:function(){
        var Jerry = this
        for(let i=1;i<8;i++){
            let x = 1- i/10
            setTimeout(function(){
                if(Jerry.pathtype == 1) Jerry.node.runAction(cc.sequence(cc.scaleTo(0.1,x,x),cc.callFunc(function(){Global.test = true},Jerry)))
                else {
                    Jerry.node.runAction(cc.scaleTo(0.1,x,x))
                    if(i == 7) Jerry.shootX();
                }
            },i*50)
        }
    },

    shootX:function(){
        let Jerry = this
        if(this.pathtype == 3) {
            this.mask.setSiblingIndex(9)
            this.Pillar.setSiblingIndex(10)
            for(let i=1;i<6;i++){
                let x = 0.3 - i * 0.02
                setTimeout(function(){
                    Jerry.node.runAction(cc.sequence(cc.scaleTo(0.05,x,x),cc.callFunc(function(){Global.test = true},Jerry)))
                },i*50)
            }
        }else Global.test = true
    },

    getpath:function(type){
        var data = new Object();
        switch (type){
            case 1:
                cc.director.getCollisionManager().enabled = true
                data.moveSec = 0.9
                data.angle = 960
                data.easeinTime = 1.0
                data.act = [cc.v2(0,-252),cc.v2(132,-20),cc.v2(62,14),cc.v2(0,-28),cc.v2(-33,-67)]
            break;
            case 2:
                cc.director.getCollisionManager().enabled = true
                data.moveSec = 0.9
                data.angle = 960
                data.easeinTime = 1.0
                data.act = [cc.v2(0,-252),cc.v2(189,164),cc.v2(68,119)]
                break;
            case 3:
                cc.director.getCollisionManager().enabled = false
                data.moveSec = 2.4
                data.angle = 2880
                data.easeinTime = 1.0
                data.act = [cc.v2(0,-252),cc.v2(232,-68),cc.v2(325,225),cc.v2(192,199),cc.v2(103,127),cc.v2(32,55),cc.v2(-17,-6),cc.v2(-62,-45),cc.v2(-97,-83)]
            break;
        }
        return data
    },

    ballshot:function(){
        this.pathtype = Global.ShotType;
        var ballact = this.getpath(this.pathtype);
        var action = cc.rotateBy(ballact.moveSec,ballact.angle);
        if(this.type == 2) var ballactX = cc.bezierTo(ballact.moveSec,ballact.act)
        else var ballactX = cc.cardinalSplineTo(ballact.moveSec,ballact.act,0) //catmullRomTo
        this.shoot();
        if(this.pathtype == 1) this.node.runAction(cc.sequence(cc.spawn(action,ballactX).easing(cc.easeOut(1.0)),cc.callFunc(function(){if(Global.AudioStatus != 1) cc.audioEngine.play(this.HitGround, false, 1)},this),cc.spawn(cc.rotateBy(0.5,270),cc.cardinalSplineTo(0.5,[cc.v2(-50,-44),cc.v2(-70,-18),cc.v2(-111,-67)],0)).easing(cc.easeInOut(1.0)),cc.spawn(cc.rotateBy(0.3,180),cc.moveTo(0.3,-140,-67)).easing(cc.easeOut(1.0))))
        else this.node.runAction(cc.sequence(cc.spawn(action,ballactX).easing(cc.easeOut(ballact.easeinTime)),cc.callFunc(function(){
            if(this.pathtype == 3 && Global.AudioStatus != 1) cc.audioEngine.play(this.OutInWater, false, 5)
        },this)))
    },

    onLoad () {
        cc.director.getCollisionManager().enabledDebugDraw = false
        Global.ShotType = 0;
        this.pathtype = 0;
        //ball層級6 getSiblingIndex setSiblingIndex 
        //球門層級2
    },

    onCollisionEnter: function (other, self) {
        var Jerry = this
        if(other.node._name == 'hitCollider'){
            this.Pillar.children[0].active = true
            if(Global.AudioStatus != 1) cc.audioEngine.play(this.HitGoal, false, 0.5)
            var action = cc.rotateBy(0.5,540);
            var act2 = [cc.v2(41.5,141),cc.v2(21.6,162),cc.v2(0.1,182),cc.v2(-21.1,202),cc.v2(-42.1,225),cc.v2(-65,246),cc.v2(-90,271),cc.v2(-105,289)];
            var ballactX = cc.cardinalSplineTo(0.3,act2,0)
            setTimeout(function(){
                Jerry.node.runAction(cc.spawn(action,ballactX).easing(cc.easeIn(1.0)))
            },100)
        }else{
            if(self.node.x < -100){
                this.Pillar.children[1].x = -198
                this.Pillar.children[1].y = -186   
            }
            this.Pillar.children[1].active = true
        }
    },

    onCollisionExit: function (other, self) {
        var Jerry = this
        if(other.node._name == 'hitCollider') setTimeout(function(){Jerry.Pillar.children[0].active = false},50)
        else setTimeout(function(){Jerry.Pillar.children[1].active = false},50)
    },

    start () {
        var Jerry = this
        this.callback = function() {
            if(Global.ShotFlag){
                if(Global.AudioStatus != 1) cc.audioEngine.play(this.Kick,false,0.5)
                Jerry.ballshot()
                // setTimeout(function(){Jerry.ballshot();},1000)
                this.unschedule(this.callback);
            }
        }
        this.schedule(this.callback, 0.2);
    },
    // update (dt) {},
});