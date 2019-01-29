var Global = require('variable')
cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    // onLoad () {},

    start () {
        this.schedule(function(){
            Global.progressbar_v[0] = Math.floor(Math.random()*100);
            Global.progressbar_v[1] = Math.floor(Math.random()*(100-Global.progressbar_v[0]));
            Global.progressbar_v[2] = 100 - Global.progressbar_v[0] - Global.progressbar_v[1]
        },5)
    },

    // update (dt) {},
});
