var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
    },

    LoadPenguin:function(RPN){
        var RP = this.node.getComponent(dragonBones.ArmatureDisplay);
        var PenguinArray = Global.Penguin[RPN];
        cc.loader.loadRes("RandPenguin/"+PenguinArray[0], dragonBones.DragonBonesAsset, (err, res) => {
            cc.loader.loadRes("RandPenguin/"+PenguinArray[1], dragonBones.DragonBonesAtlasAsset, (err2, res2) => {
                RP.dragonAsset = res;
                RP.dragonAtlasAsset = res2;
                RP.armatureName = PenguinArray[2]
                RP.playAnimation(RP.armatureName,1);
            })
        })
    },

    onLoad () {

    },

    start () {
        this.schedule(function(){
            var RandPenguinNum = 0//Math.floor(Math.random()*3);
            cc.log(Global.ShotFlag)
            if(!Global.StartFlag) this.LoadPenguin(RandPenguinNum);
        },10)
    },

    // update (dt) {},
});
