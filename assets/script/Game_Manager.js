var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    // onLoad () {},

    start () {
        this.schedule(function(){
            Global.progressbar_1 = Math.floor(Math.random()*100);
            Global.progressbar_2 = Math.floor(Math.random()*(100-Global.progressbar_1));
            Global.progressbar_3 = 100 - Global.progressbar_1 - Global.progressbar_2
            cc.log(Global.progressbar_1+','+ Global.progressbar_2+','+ Global.progressbar_3)
        },5)
    },

    // update (dt) {},
});
