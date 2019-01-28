var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    shotX:function(){
        
    },

    onLoad () {
        var Jerry = this
        this.StartShotFlag = false
        this.node.on('StartFlag', function (act) {
            Jerry.StartShotFlag = act;
        });
    },

    // start () {},

    update (dt) {
        if(this.StartShotFlag == true){
            this.shotX();
            this.StartShotFlag = false
        }
    },
});
