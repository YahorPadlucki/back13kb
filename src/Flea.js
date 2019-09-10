var Flea = (function () {

    Flea.prototype = Object.create(Entity.prototype);

    function Flea() {

        Entity.call(this);

        this.x = this.tileSize * 10;
        this.y = this.tileSize * 15;
        this.lastTileX = this.model.playerCurrentTile.x;
        this.lastTileY = this.model.playerCurrentTile.y;

        this.speed = 0.3;

        this.dx = 0;
        this.ddx = this.speed;
        this.dy = 0;
        this.ddy = 0;

        this.levelWidth = this.model.columns;

        this.level = this.model.level;

        this.cells = [];

        this.friction = 200;
        this.falling = false;
        this.accel = 200;
        this.gravity = 500;

        this.maxdx = 10;
        this.maxdy = 450;
        this.impulse = 17000;

        this.monster =true;

        this.right = true;

        this.size = this.tileSize/2;


    }

    Flea.prototype.draw = function (dt) {
        var ctx = this.model.ctx;
        ctx.fillStyle = "#ff6109";

        ctx.fillRect(this.x+this.size /2 + (this.dx * dt), this.y+this.size  + (this.dy * dt), this.size, this.size)
    };

    Flea.prototype.update = function (dt) {
        if (!this.model.isLevelLoaded) return;
        Entity.prototype.update.call(this,dt);


        if (this.overlap( this.model.playerCurrentPosition.x,  this.model.playerCurrentPosition.y, this.tileSize-this.size/2, this.tileSize-this.size, this.x, this.y, this.tileSize-this.size/2, this.tileSize-this.size)) {
            console.log("overlap")
            if (( this.model.playerCurrentPosition.dy > 0) && (this.y - this.model.playerCurrentPosition.y > this.tileSize / 2))
            // killMonster(monster);
                console.log("kill")
                }

    };

    return Flea;

}());
