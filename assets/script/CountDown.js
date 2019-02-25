var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        EndBlack:cc.Node,
    },

    onLoad () {
        Global.StartCount = false
    },

    start () {
        this.callback = function(){
            var CardNumAry = JSON.parse(cc.sys.localStorage.getItem('CardNum'))
            if((CardNumAry.indexOf(0) == -1)){
                this.EndBlack.setSiblingIndex(13)
                this.EndBlack.active = true
                this.node.children[0].active = true
                var Jerry = this
                Global.StartCount = true
                var lastchild = this.node.children[0].children[0];
                var counter = 4;
                function showCountDown(){
                    counter--
                    if(counter == 0){
                        Jerry.EndBlack.setSiblingIndex(12)
                        Jerry.EndBlack.active = false
                        Jerry.node.children[0].active = false
                        Global.CountDownFlag = true
                        return false;
                    }
                    cc.loader.loadRes("CountTime/Time0"+counter, cc.SpriteFrame, function (err, spriteFrame) {
                        lastchild.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    });
                    setTimeout(showCountDown,1000);
                }
                showCountDown();
                this.unschedule(this.callback)
            }
        }
        this.schedule(this.callback, 1);
    },

    // update (dt) {},
});
