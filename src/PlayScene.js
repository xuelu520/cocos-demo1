/**
 * Created by -(^_^)- on 2016/3/9.
 */
var PlayLayer = cc.Layer.extend({
    bgSprite:null,
    SushiSprites:null,
    score:0,
    ctor:function () {
        this._super();
        this.SushiSprites = [];
        var size = cc.winSize;
        // add bg
        this.bgSprite = new cc.Sprite(res.BackGround_png);
        this.bgSprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            //scale: 0.5,
            rotation: 180
        });
        this.addChild(this.bgSprite, 0);
        this.addSushi();
        this.schedule(this.update,0.5,16*1024,1);

        this.scoreLabel = new cc.LabelTTF("score:0", "Arial", 30);
        this.scoreLabel.attr({
            x:size.width / 2 + 100,
            y:size.height - 20
        });
        this.addChild(this.scoreLabel, 5);

        // timeout 60
        this.timeLabel = new cc.LabelTTF("倒计时:60", "Arial", 30);
        this.timeLabel.attr({
            x: 30,
            y:size.height - 20
        });
        this.addChild(this.timeLabel, 5);
        return true;
    },
    addSushi : function() {
        var sushi = new SushiSprite(res.Sushi_png);
        var size = cc.winSize;
        sushi.attr({
            x : size.width*cc.random0To1(),
            y : size.height
        });

        var dorpAction = cc.MoveTo.create(3, cc.p(sushi.x,-(sushi.height)));
        sushi.runAction(dorpAction);

        this.SushiSprites.push(sushi);

        this.addChild(sushi,5);
    },
    update : function () {
        this.removeSushi();
        this.addSushi();
    },
    removeSushi : function() {
        //移除到屏幕底部的sushi
        for (var i = 0; i < this.SushiSprites.length; i++) {
            if(this.SushiSprites[i].y <= 0) {
                this.SushiSprites[i].removeFromParent();
                this.SushiSprites[i] = undefined;
                this.SushiSprites.splice(i,1);
                i= i-1;
            }
        }
    },
    addScore : function(){
        this.score +=1;
        this.scoreLabel.setString("score:" + this.score);
    }
});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});