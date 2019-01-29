var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },



    wait:function(progressBar,percent,barvalue,Xtime){
        setTimeout(function(){
            progressBar.progress = (percent / 100);
            barvalue.string = percent+'%';
        },50 + (Xtime*30))
    },

    onLoad () {
        Global.progressbar_1 = 0;
        Global.progressbar_2 = 0;
        Global.progressbar_3 = 0;

        this.old_value_1 = 0;
        this.old_value_2 = 0;
        this.old_value_3 = 0;
    },

    start () {
        this.schedule(function(){
            var Jerry = this
            if(Global.progressbar_1 != this.old_value_1){
                for(var i = this.old_value_1;i<Global.progressbar_1;i++)
                this.node.children[0].children[0].getComponent(cc.ProgressBar).progress = Global.progressbar_1 / 100
                this.old_value_1 = Global.progressbar_1
            }

            if(Global.progressbar_2 != this.old_value_2){
                this.node.children[1].children[0].getComponent(cc.ProgressBar).progress = Global.progressbar_2 / 100
                this.old_value_2 = Global.progressbar_2
            }

            if(Global.progressbar_3 != this.old_value_3){
                this.node.children[2].children[0].getComponent(cc.ProgressBar).progress = Global.progressbar_3 / 100
                this.old_value_2 = Global.progressbar_2
            }
        }, 2);
    },

    // update (dt) {},
});
