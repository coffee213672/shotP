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
            if(Global.progressbar_1 != this.old_value_1){

            }

            if(Global.progressbar_2 != this.old_value_2){
                
            }

            if(Global.progressbar_3 != this.old_value_3){
                
            }
        }, 0.5);
    },

    // update (dt) {},
});
