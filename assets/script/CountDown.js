var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        EndBlack:cc.Node,
        // CountDownAudio:{
        //     type:cc.AudioClip,
        //     default:null
        // }
    },

    onLoad () {
        Global.StartCount = false
    },

    start () {
        this.callback = function(){
            var CardNumAry = JSON.parse(cc.sys.localStorage.getItem('CardNum'))
            if((CardNumAry.indexOf(0) == -1)){
                this.EndBlack.setSiblingIndex(13)
                this.node.setSiblingIndex(14)
                this.EndBlack.active = true
                this.node.children[0].active = true
                var Jerry = this
                Global.StartCount = true
                var counter = 4;
                function showCountDown(){
                    counter--
                    cc.log(counter)
                    switch(counter){
                        case 0:
                        cc.log('into 0')
                            Jerry.EndBlack.setSiblingIndex(12)
                            Jerry.node.setSiblingIndex(10)
                            Jerry.EndBlack.active = false
                            Jerry.node.children[0].active = false
                            Global.CountDownFlag = true
                            return false;
                        case 1:
                            Jerry.node.children[0].children[1].active = false
                            Jerry.node.children[0].children[2].active = true
                        break
                        case 2:
                            Jerry.node.children[0].children[0].active = false
                            Jerry.node.children[0].children[1].active = true
                        break
                        case 3:
                            Jerry.node.children[0].children[0].active = true
                        break
                    }
                    // 動態加載倒數秒數
                    // cc.loader.loadRes("CountTime/Time0"+counter, cc.SpriteFrame, function (err, spriteFrame) {
                    //     lastchild.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    // });
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
