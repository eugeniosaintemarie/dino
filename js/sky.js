var Sky = function(stage) {
    this.stage = stage;
    this.clouds = [];
    this.totalClouds = 3;
    this.frames = [[0, 0, 86, 69, 0, 0, 34.5], [86, 0, 86, 69, 0, 0, 34.5], [172, 0, 86, 69, 0, 0, 34.5], [258, 0, 86, 69, 0, 0, 34.5], [344, 0, 86, 69, 0, 0, 34.5], [0, 69, 86, 69, 0, 0, 34.5], [86, 69, 86, 69, 0, 0, 34.5], [172, 69, 86, 69, 0, 0, 34.5], [258, 69, 86, 69, 0, 0, 34.5], [344, 69, 86, 69, 0, 0, 34.5], [0, 138, 86, 69, 0, 0, 34.5], [86, 138, 86, 69, 0, 0, 34.5], [172, 138, 86, 69, 0, 0, 34.5], [258, 138, 86, 69, 0, 0, 34.5], [344, 138, 86, 69, 0, 0, 34.5], [0, 207, 86, 69, 0, 0, 34.5], [86, 207, 86, 69, 0, 0, 34.5], [172, 207, 86, 69, 0, 0, 34.5], [258, 207, 86, 69, 0, 0, 34.5]];
    this.load = function(loader) {
        this.loader = loader;
        this.img = this.loader.getResult("pterodactyl");
        this.sprite = new createjs.SpriteSheet({
            framerate: 20,
            "images": [this.loader.getResult("pterodactyl")],
            "frames": this.frames,
            "animations": {
                "fly": [0, 18]
            }
        });
        this.setClouds();
        this.setData();
    }
    this.setData = function() {
        this.datas = [];
        for (var i = 0; i < this.frames.length; i++) {
            this.datas[i] = Game.getPxData(this.frames[i], this.img);
        }
    }

    this.addLeaf = function() {
        var object = new createjs.Bitmap(this.loader.getResult("leaf"));
        object.x = Game.width;
        object.y = (Math.random() * 40) + 130;
        object.image = this.loader.getResult("leaf");
        object.type = "leaf";
        object.data = Game.getPxData([0, 0, object.image.width - 2, object.image.height - 2], object.image);
        this.stage.addChild(object);
        Game.ground.lastChild = object;
        Game.ground.enemies.push(object);
    }

    this.addEnemy = function() {
        var object = new createjs.Sprite(this.sprite, "fly");
        object.x = Game.width;
        object.y = Math.random() > 0.5 ? 140 : 170;
        object.image = this.loader.getResult("object");
        object.type = "fly";
        this.stage.addChild(object);
        Game.ground.lastChild = object;
        Game.ground.enemies.push(object);
    }

    this.setClouds = function() {
        for (var i = 0; i < this.totalClouds; i++) {
            this.addCloud();
        }
    }
    this.addCloud = function(_x) {
        var _idx = Math.floor(Math.random() * 4) + 1;
        var cloud = new createjs.Bitmap(this.loader.getResult("cloud_0" + _idx));
        cloud.x = _x || Math.random() * Game.width;
        cloud.y = Math.random() * 90 + 30;
        cloud.velX = Math.random() * 0.75 + 0.25;
        this.clouds.push(cloud);
        this.stage.addChild(cloud);
        Game.stage.setChildIndex(Game.dino.object, Game.stage.children.length - 1);
    }
    this.resetCloud = function(cloud) {
        let index = this.clouds.indexOf(cloud);
        this.clouds.splice(index, 1);
        this.stage.removeChild(cloud);
        this.addCloud(Game.width);
    }
    this.update = function(e) {
        for (var i = 0; i < this.clouds.length; i++) {
            var _cloud = this.clouds[i];
            if (_cloud.x  < -_cloud.image.width) {
                this.resetCloud(_cloud);
            }
            _cloud.x -= _cloud.velX;
        }
    }
    return this;
}