var Ground = function(stage) {
    this.stage = stage;
    this.enemies = [];
    this.vel = 6;
    this.passed = 0;
    this.leafs = 0;
    this.inCalc = false;
    this.lastChild = null;
    this.velDelta = 360;
    this.load = function(loader) {
        this.loader = loader;
        var groundImg = loader.getResult("ground");
        this.object = new createjs.Shape();
        this.object.graphics.beginBitmapFill(groundImg).drawRect(0, 0, Game.width + groundImg.width, groundImg.height);
        this.object.tileW = groundImg.width;
        this.object.x = 0;
        this.object.y = 212;
        this.object.cache(0, 0, Game.width + groundImg.width, groundImg.height);
        this.stage.addChild(this.object);
    }

    this.start = function() {
        this.addEnemy();
    }

    this.addEnemy = function(count) {
        if (count === undefined) count = 0;
        var idx = Math.floor(Math.random() * 2);
        var _img_enemy = this.loader.getResult("tree_" + idx);
        var _enemy = new createjs.Bitmap(_img_enemy);
        _enemy.type = "ground";
        _enemy.x = Game.width;
        _enemy.y = Game.height - _img_enemy.height - 30;
        this.lastChild = _enemy;
        this.enemies.push(_enemy);
        this.stage.addChild(_enemy);

        Game.stage.setChildIndex(Game.dino.object, Game.stage.children.length - 1);
        _enemy.data = Game.getPxData([0, 0, _img_enemy.width - 2, _img_enemy.height - 2], _img_enemy);
        if (count == "new") {
            count = Math.floor(Math.random() * 2);
        } else {
            _enemy.x += _img_enemy.width / 2;
        }
        if (count > 0) {
            count--;
            this.addEnemy(count);
        }
    }

    this.update = function(e) {
        var delta = e.delta / 1000;
        this.object.x = (this.object.x - delta * this.velDelta) % this.object.tileW;
        this.checkEdges();
    }
    this.checkEdges = function() {
        for (var i = 0; i < this.enemies.length; i++) {
            var _enemy = this.enemies[i];
            _enemy.x -= this.vel;
            if (_enemy.type == "fly") {
                var rect = Game.sky.frames[_enemy.currentFrame];
                var width = rect[2];
            } else {
                var width = _enemy.image.width;
            }
            if (_enemy.x < -width) this.dieEnemy(_enemy);
        }
        this.edgeEvaluation();
    }
    this.setVel = function(_vel) {
        var self = this;
        TweenMax.to(this, 5, {
            vel: _vel,
            onUpdate: function() {
                self.velDelta = (self.vel * 60);
            }
        });
    }
    this.edgeEvaluation = function() {
        if (this.lastChild && !this.inCalc) {
            if (Game.width - this.lastChild.x > 350) {
                this.inCalc = true;
                this.obstacle();
            }
        }
    }
    this.obstacle = function() {
        var leafTurn = this.passed % 8 == 0 && this.lastChild.type != "leaf";
        var delay = leafTurn ? Math.random() * 0.5 : Math.random();
        TweenMax.delayedCall(delay, () => {
            this.inCalc = false;
            if (Game.animated) {
                if (this.passed > 6) {
                    if (leafTurn) {
                        return Game.sky.addLeaf();
                    } else {
                        if (Math.floor(Math.random() * 6) < 2) {
                            return Game.sky.addEnemy();
                        } else {
                            return this.addEnemy("new");
                        }
                    }
                } else return this.addEnemy("new");
            }
        });
    }
    this.dieEnemy = function(_enemy) {
        let index = this.enemies.indexOf(_enemy);
        this.passed += 1;
        this.enemies.splice(index, 1);
        this.stage.removeChild(_enemy);
    }
    this.reset = function() {
        for (var i = 0; i < this.stage.children.length; i++) {
            this.stage.removeChild(this.stage.children[i]);
        }
        this.enemies = [];
    }
    return this;
}