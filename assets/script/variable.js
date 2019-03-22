module.exports = {
    card: [0,0,0],  //  開獎陣列
    CountDownFlag: false,   //  倒數
    StartFlag: false,   //  開牌
    ShotFlag: false,    //  射門
    StartCount: false,  //  開始倒數
    test:false, //  開始結束倒數
    sn:0,   //  本局遊戲期數
    ShotType:0, //  1:射門 2:撞柱 3:界外
    AudioStatus: 0,
    Penguin:[['PinkPenguin/game_p_ske','PinkPenguin/game_p_tex','game_p'],
            ['BlackPenguin1/NewProject_2_ske','BlackPenguin1/NewProject_2_tex','MovieClip'],
            ['BlackPenguin2/b2_ske','BlackPenguin2/b2_tex','Sprite']],  //  企鵝資料、路徑
    infoRP:[
            ['in/happyfeet_ske','in/happyfeet_tex','Goal'],
            ['hit/happyfeet2_ske','hit/happyfeet2_tex','Sprite'],
            ['out/happyfeet3_ske','out/happyfeet3_tex','Sprite']
        ],
    infoRRP:['in/in','hit/hit','out/out'],  //  三種過場動畫
    resultRP:['goal','hit','miss'], //  三種結果
}