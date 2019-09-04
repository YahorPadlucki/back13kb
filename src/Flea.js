var Flea = (function () {

    Flea.prototype = Object.create(Entity.prototype);

    function Flea() {

        Entity.call(this);

        this.x = this.tileSize * 10;
        this.y = this.tileSize * 15;
        this.lastTileX = this.model.playerCurrentTile.x;
        this.lastTileY = this.model.playerCurrentTile.y;

        this.speed = 1;

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

        this.maxdx = 100;
        this.maxdy = 450;
        this.impulse = 17000;

        this.monster =true;

        this.right = true;



    }

    Flea.prototype.draw = function (dt) {
        var ctx = this.model.ctx;
        ctx.fillStyle = "#ff6109";

        ctx.fillRect(this.x + (this.dx * dt), this.y + (this.dy * dt), this.tileSize, this.tileSize)
    };

    return Flea;

}());
