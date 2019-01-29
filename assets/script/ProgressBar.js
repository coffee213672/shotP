var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    /*
        for(var i=this.old_values[Ptype];i<=newBarV;i++){
            this.wait(progressbar,i,bar_string,countT)
            countT++
        }
    */

    progressbarMove:function(Ptype,newBarV,progressbar,bar_string){
        var countT = 0
        if(newBarV > this.old_value[Ptype]){
            for(var i=this.old_value[Ptype];i<=newBarV;i++){
                this.wait(progressbar,i,bar_string,countT)
                countT++
            }
        }else{
            for(var i=this.old_value[Ptype];i>=newBarV;i--){
                this.wait(progressbar,i,bar_string,countT)
                countT++
            }
        }
    },

    wait:function(progressBar,percent,barvalue,Xtime){
        setTimeout(function(){
            progressBar.progress = (percent / 100);
            barvalue.string = percent+'%';
            cc.log(percent+'%')
        },50 + (Xtime*30))
    },

    onLoad () {
        Global.progressbar_v = [0,0,0]
        this.old_value = [0,0,0]
    },

    start () {
        this.schedule(function(){
            if(Global.progressbar_v[0] != this.old_value[0]){
                this.progressbarMove(0,Global.progressbar_v[0],this.node.children[0].children[0].getComponent(cc.ProgressBar),this.node.children[0].children[0].children[2].getComponent(cc.Label))
                this.old_value[0] = Global.progressbar_v[0]
            }

            if(Global.progressbar_v[1] != this.old_value[1]){
                this.progressbarMove(1,Global.progressbar_v[1],this.node.children[1].children[0].getComponent(cc.ProgressBar),this.node.children[1].children[0].children[2].getComponent(cc.Label))
                this.old_value[1] = Global.progressbar_v[1]
            }

            if(Global.progressbar_v[2] != this.old_value[2]){
                this.progressbarMove(2,Global.progressbar_v[2],this.node.children[2].children[0].getComponent(cc.ProgressBar),this.node.children[2].children[0].children[2].getComponent(cc.Label))
                this.old_value[2] = Global.progressbar_v[2]
            }
        }, 2);
    },

    // update (dt) {},
});
