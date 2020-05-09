var Dino = function(stage) {
    this.stage = stage;
    this.speed_y = 0;
    this.force = 1;
    this.isDied = false;
    this.onJump = false;
    this.frames = [[0, 0, 69, 79, 0, 34.5, 79], [94, 0, 69, 79, 0, 34.5, 79], [188, 0, 69, 79, 0, 34.5, 79], [282, 0, 69, 79, 0, 34.5, 79], [376, 0, 69, 79, 0, 34.5, 79], [470, 0, 69, 79, 0, 34.5, 79], [0, 83, 69, 79, 0, 34.5, 79], [94, 83, 69, 79, 0, 34.5, 79], [188, 83, 94, 52, 0, 47, 52], [282, 83, 94, 50, 0, 47, 50], [376, 83, 94, 52, 0, 47, 52], [470, 83, 94, 54, 0, 47, 54], [0, 166, 94, 54, 0, 47, 54], [94, 166, 94, 53, 0, 47, 53], [188, 166, 94, 51, 0, 47, 51], [282, 166, 94, 48, 0, 47, 48], [376, 166, 94, 50, 0, 47, 50], [470, 166, 94, 50, 0, 47, 50], [0, 249, 94, 52, 0, 47, 52], [94, 249, 94, 53, 0, 47, 53], [188, 249, 94, 54, 0, 47, 54], [282, 249, 94, 54, 0, 47, 54], [376, 249, 94, 53, 0, 47, 53], [470, 249, 94, 52, 0, 47, 52], [0, 332, 94, 52, 0, 47, 52], [94, 332, 69, 79, 0, 34.5, 79], [188, 332, 69, 72, 0, 34.5, 72], [282, 332, 69, 75, 0, 34.5, 75], [376, 332, 69, 76, 0, 34.5, 76], [470, 332, 69, 78, 0, 34.5, 78], [0, 415, 69, 75, 0, 34.5, 75], [94, 415, 69, 72, 0, 34.5, 72], [188, 415, 69, 77, 0, 34.5, 77], [282, 415, 69, 69, 0, 34.5, 69], [376, 415, 69, 78, 0, 34.5, 78], [470, 415, 69, 77, 0, 34.5, 77], [0, 498, 69, 75, 0, 34.5, 75], [94, 498, 69, 72, 0, 34.5, 72], [188, 498, 69, 70, 0, 34.5, 70], [282, 498, 69, 67, 0, 34.5, 67], [376, 498, 69, 66, 0, 34.5, 66], [470, 498, 69, 68, 0, 34.5, 68], [0, 581, 69, 72, 0, 34.5, 72], [94, 581, 69, 76, 0, 34.5, 76], [188, 581, 69, 78, 0, 34.5, 78], [282, 581, 69, 74, 0, 34.5, 74], [376, 581, 69, 70, 0, 34.5, 70], [470, 581, 69, 70, 0, 34.5, 70], [0, 664, 69, 69, 0, 34.5, 69], [94, 664, 69, 69, 0, 34.5, 69], [188, 664, 69, 69, 0, 34.5, 69], [282, 664, 69, 78, 0, 34.5, 78], [376, 664, 69, 78, 0, 34.5, 78], [470, 664, 69, 78, 0, 34.5, 78], [0, 747, 69, 79, 0, 34.5, 79], [94, 747, 69, 78, 0, 34.5, 78], [188, 747, 69, 77, 0, 34.5, 77], [282, 747, 69, 76, 0, 34.5, 76], [376, 747, 69, 76, 0, 34.5, 76], [470, 747, 69, 78, 0, 34.5, 78], [0, 830, 69, 80, 0, 34.5, 80], [94, 830, 69, 82, 0, 34.5, 82], [188, 830, 69, 83, 0, 34.5, 83], [282, 830, 69, 82, 0, 34.5, 82], [376, 830, 69, 81, 0, 34.5, 81], [470, 830, 69, 79, 0, 34.5, 79]];
    this.load = function(loader) {
        this.img = loader.getResult("dino");
        this.sprite = new createjs.SpriteSheet({
            framerate: 60,
            "images": [loader.getResult("dino")],
            "frames": this.frames,
            "animations": {
                "duck": [8, 24],
                "run": [51, 65],
                "jump": [34, 50, "fly"],
                "fly": [33],
                "fall": [26, 32, "run"],
                "die": [0, 7, "fuck"],
                "fuck": [25]
            }
        });
        this.object = new createjs.Sprite(this.sprite, "run");
        this.object.x = 100;
        this.object.y = 240;
        this.setData();
        this.setLeaf();
    }

    this.setLeaf = function() {

    }

    this.setData = function() {
        this.datas = [];
        for (var i = 0; i < this.frames.length; i++) {
            this.datas[i] = Game.getPxData(this.frames[i], this.img);
        }
    }
    this.start = function() {
        this.stage.addChild(this.object);
        this.addEvents();
    }
    this.addEvents = function() {
        window.addEventListener("click", () => {
            this.tap();
        });
        window.addEventListener("touchstart", () => {
            this.tap();
        });
        window.addEventListener("keydown", this.events.bind(this));
        window.addEventListener("keyup", this.keyUp.bind(this));
    }
    this.tap = function() {
        if (this.object.currentAnimation == "run") {
            return this.jump();
        }
    }
    this.playSound = function(sound) {
        Game.sounds[sound].play();
        // this.sound.src = "/salesapp/norm/_mexico/groupm/mediacom/fuzetea/mp3/" + sound + ".mp3";
        // this.sound.play();
        // createjs.Sound.play(sound);
    }
    this.events = function(e) {
        if (this.isDied) return false;
        switch (e.keyCode) {
            case 32:
                /* SPACE BAR */
            case 38:
                /* UP */
            case 87:
                /* W */
                if (this.object.currentAnimation == "run") return this.jump();
                break;
            case 40:
                /* DOWN */
            case 83:
                /* S */
                if (this.object.currentAnimation == "run") return this.down();
                break;
        }
    }
    this.down = function() {
        this.playSound("down");
        return this.object.gotoAndPlay("duck");
    }
    this.keyUp = function() {
        if (this.isDied) return false;
        if (this.object.currentAnimation == "duck") {
            return this.object.gotoAndPlay("run");
        }
    }
    this.jump = function() {
        if (this.object.currentAnimation == "run" && !this.onJump) {
            this.onJump = true;
            setTimeout(() => {
                this.object.gotoAndPlay("fly");
                this.speed_y = -15;
            }, 100); // 300 a 24 || 200 a 40
            // setTimeout(() => {
            //     this.object.gotoAndPlay("fall");
            // }, 750); // 800 a 24 || 800 a 40

            setTimeout(() => {
                this.object.gotoAndPlay("run");
            }, 600); // 800 a 24 || 800 a 40
            this.playSound("jump");
            return this.object.gotoAndPlay("jump");
        }
    }
    this.render = function() {
        this.object.y += this.speed_y;
        if (this.object.y > 220) {
            this.object.y = 220;
            this.speed_y = 0;
            this.onJump = false;
        } else {
            this.speed_y += 0.8;
        }
    }
    this.die = function() {
        this.isDied = true;
        let x = this.object.x;
        let y = this.object.y;
        this.stage.removeChild(this.object);
        this.died = new createjs.Sprite(this.sprite, "die");
        this.died.x = x;
        this.died.y = y;
        this.stage.addChild(this.died);
        this.playSound("die");
    }

    this.inCollision = function(_enemy) {
        var enemy = this.getEnemy(_enemy);
        var dino = this.getRect();
        if (this.is_collided(dino, enemy)) {
            if (_enemy.type =="leaf") {
                Game.ground.leafs ++;
                Game.ground.dieEnemy(_enemy);
                this.playSound("bonus");
            } else {
                this.die();
                return true;
            }
        }
        return false;
    }

    this.getRect = function() {
        var rect = this.frames[this.object.currentFrame];
        return {
            x: this.object.x - (rect[2] / 2),
            y: this.object.y - (rect[3]),
            width: rect[2],
            height: rect[3],
            data: this.datas[this.object.currentFrame]
        }
    }

    this.getEnemy = function(_enemy) {
        switch (_enemy.type) {
            case "fly":
                var rect = Game.sky.frames[_enemy.currentFrame];
                var enemy = {
                    x: _enemy.x,
                    y: _enemy.y - (rect[3]/2),
                    width: rect[2],
                    height: rect[3],
                    data: Game.sky.datas[_enemy.currentFrame],
                    image: _enemy.image
                }
                break;
            default:
                var enemy = {
                    x: _enemy.x,
                    y: _enemy.y,
                    width: _enemy.image.width,
                    height: _enemy.image.height,
                    data: _enemy.data,
                    image: _enemy.image
                }
                break;
        }
        return enemy;
    }

    this.is_collided = function(source, target) {
        var _collided = false;
        if (this.boxCollision(source, target)) {
            if (this.pxCollision(source, target)) {
                _collided = true;
            }
        }
        return _collided;
    }

    this.pxCollision = function(source, target) {
        var dino = this.datas[this.object.currentFrame];
        var hit = false;
        for (var i = 0; i < Object.keys(dino).length; i++) {
            let _keyA = Object.keys(dino)[i];
            var obj = dino[_keyA];
            var r1 = {
                x: obj.x + source.x,
                y: obj.y + source.y,
                width: obj.width,
                height: obj.height
            };
            for (var j = 0; j < Object.keys(target.data).length; j++) {
                let _keyB = Object.keys(target.data)[j];
                var obj2 = target.data[_keyB];
                var r2 = {
                    x: obj2.x + target.x,
                    y: obj2.y + target.y,
                    width: obj2.width,
                    height: obj2.height
                };
                if (this.boxCollision(r1, r2)) {
                    hit = true;
                    break;
                }
            }
            if (hit) break;
        }
        return hit;
    }

    this.boxCollision = function(source, target) {
        return !(
            ((source.y + source.height) < (target.y)) ||
            (source.y > (target.y + target.height)) ||
            ((source.x + source.width) < target.x) ||
            (source.x > (target.x + target.width))
        );
    }
    return this;
}