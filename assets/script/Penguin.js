var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        PenguinAnimAudio:{
            type:cc.AudioClip,
            default:null
        },

        PenguinAnimAudio2:{
            type:cc.AudioClip,
            default:null
        }
    },

    LoadPenguin:function(RPN){
        this.node.addComponent(dragonBones.ArmatureDisplay);
        var RP = this.node.getComponent(dragonBones.ArmatureDisplay);
        var PenguinArray = Global.Penguin[RPN];
        cc.loader.loadRes("RandPenguin/"+PenguinArray[0], dragonBones.DragonBonesAsset, (err, res) => {
            cc.loader.loadRes("RandPenguin/"+PenguinArray[1], dragonBones.DragonBonesAtlasAsset, (err2, res2) => {
                RP.dragonAsset = res;
                RP.dragonAtlasAsset = res2;
                RP.armatureName = PenguinArray[2]
                RP.playAnimation(RP.dragonAsset._dragonBonesData.stage.animationNames[0],1);
                if(Global.AudioStatus != 1) {
                    if(RPN == 1) cc.audioEngine.play(this.PenguinAnimAudio2, false, 0.4)
                    else cc.audioEngine.play(this.PenguinAnimAudio, false, 0.4)
                }
                RP.addEventListener(dragonBones.EventObject.COMPLETE, this.removeDB, this);
            })
        })
    },

    removeDB:function(){
        this.node.removeComponent(dragonBones.ArmatureDisplay)
    },

    nodeLocationXY:function(num){
        switch (num){
            case 0:
                this.node.x = -13;
            break
            case 1:
                this.node.x = 0;
            break
        }
    },

    // onLoad () {},

    start () {
        this.schedule(function(){
            var RandPenguinNum = Math.floor(Math.random()*Global.Penguin.length);
            this.nodeLocationXY(RandPenguinNum)
            if(!Global.StartCount) this.LoadPenguin(RandPenguinNum);
        },20)
    },

    // update (dt) {},
});
