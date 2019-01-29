var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

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
        },50 + (Xtime*30))
    },

    onLoad () {
        Global.progressbar_v = [0,0,0]
        this.old_value = [0,0,0]
    },

    start () {
        this.schedule(function(){
            for(var i in Global.progressbar_v){
                this.progressbarMove(i,Global.progressbar_v[i],this.node.children[i].children[0].getComponent(cc.ProgressBar),this.node.children[i].children[0].children[2].getComponent(cc.Label))
                this.old_value[i] = Global.progressbar_v[i]
            }
        }, 2);
    },

    // update (dt) {},
});
