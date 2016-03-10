var SushiSprite = cc.Sprite.extend({
    touchListener:null,
    index:null,//在数组中的索引

    onEnter:function () {
        this._super();
        this.addTouchEventListenser();
    },

    onExit:function () {
        this._super();
    },

    addTouchEventListenser:function(){
        //touch event
        this.touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                var pos = touch.getLocation();
                var target = event.getCurrentTarget();
                if ( cc.rectContainsPoint(target.getBoundingBox(),pos)) {
                    target.removeTouchEventListenser();
                    //响应精灵点中
                    cc.log("pos.x="+pos.x+",pos.y="+pos.y);
                    target.stopAllActions();
                    target.getParent().addScore();
                    target.removeFromParent();

                    return true;
                }
                return false;
            }
        });

        cc.eventManager.addListener(this.touchListener,this);
    },

    removeTouchEventListenser:function(){
        cc.eventManager.removeListener(this.touchListener);
    }
});
