var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    progressbarMove:function(Ptype,newBarV,progressbar,bar_string){
        var countT = 0
        switch(Ptype){
            case 1:
                if(newBarV > this.old_value_1){
                    for(var i=this.old_value_1;i<=newBarV;i++){
                        this.wait(progressbar,i,bar_string,countT)
                        countT++
                    }
                }else{
                    for(var i=this.old_value_1;i>=newBarV;i--){
                        this.wait(progressbar,i,bar_string,countT)
                        countT++
                    }
                }
            break;
            case 2:
                if(newBarV > this.old_value_2){
                    for(var i=this.old_value_2;i<=newBarV;i++){
                        this.wait(progressbar,i,bar_string,countT)
                        countT++
                    }
                }else{
                    for(var i=this.old_value_2;i>=newBarV;i--){
                        this.wait(progressbar,i,bar_string,countT)
                        countT++
                    }
                }
            break;
            case 3:
                if(newBarV > this.old_value_3){
                    for(var i=this.old_value_3;i<=newBarV;i++){
                        this.wait(progressbar,i,bar_string,countT)
                        countT++
                    }
                }else{
                    for(var i=this.old_value_3;i>=newBarV;i--){
                        this.wait(progressbar,i,bar_string,countT)
                        countT++
                    }
                }
            break
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
                this.progressbarMove(1,Global.progressbar_1,this.node.children[0].children[0].getComponent(cc.ProgressBar),this.node.children[0].children[0].children[2].getComponent(cc.Label))
                this.old_value_1 = Global.progressbar_1
                // cc.log(this.node.children[0].children[0].children[2].getComponent(cc.Label).string)
            }

            if(Global.progressbar_2 != this.old_value_2){
                this.progressbarMove(2,Global.progressbar_2,this.node.children[1].children[0].getComponent(cc.ProgressBar),this.node.children[1].children[0].children[2].getComponent(cc.Label))
                this.old_value_2 = Global.progressbar_2
            }

            if(Global.progressbar_3 != this.old_value_3){
                this.progressbarMove(3,Global.progressbar_3,this.node.children[2].children[0].getComponent(cc.ProgressBar),this.node.children[2].children[0].children[2].getComponent(cc.Label))
                this.old_value_3 = Global.progressbar_3
            }
        }, 2);
    },

    // update (dt) {},
});
