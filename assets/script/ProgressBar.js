var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
    },

    progressbarMove:function(Ptype,newBarV,progressbar,bar_string){
        var countT = this.old_value[Ptype]
        if(newBarV > this.old_value[Ptype]){
            function addP(){
                countT++
                if(countT > newBarV) return false
                progressbar.progress = (countT / 100)
                bar_string.string = countT+'%';
                setTimeout(addP,40)
            }
            addP();
        }else{
            function cutP(){
                countT--
                if(countT < newBarV) return false
                progressbar.progress = (countT / 100)
                bar_string.string = countT+'%';
                setTimeout(cutP,30)
            }
            cutP();
        }
    },

    onLoad () {
        cc.sys.localStorage.setItem('progressbar',JSON.stringify([0,0,0]))
        this.old_value = [0,0,0]
        Global.StartFlag = false
    },

    start () {
        this.callback = function(){
            if(!Global.StartCount){
                var JerryProgressAry = JSON.parse(cc.sys.localStorage.getItem('progressbar'))
                for(var i in JerryProgressAry){
                    this.progressbarMove(i,JerryProgressAry[i],this.node.children[i].children[0].getComponent(cc.ProgressBar),this.node.children[i].children[0].children[2].getComponent(cc.Label))
                    this.old_value[i] = JerryProgressAry[i]
                }
            }else{
                for(let i in Global.card){
                    this.node.children[i].runAction(cc.fadeOut(0.8))
                }
                this.unschedule(this.callback)
            } 
        }
        this.schedule(this.callback, 0.5);
    },

    // update (dt) {},
});
