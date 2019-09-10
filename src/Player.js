var Player = (function () {

    Player.prototype = Object.create(Entity.prototype);

    function Player() {

        Entity.call(this);

        this.x = this.tileSize * this.model.playerCurrentTile.x;
        this.y = this.tileSize * this.model.playerCurrentTile.y;
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

        this.size = this.model.TILE;


        document.addEventListener('keydown', (ev) => this.onkey(ev, ev.keyCode, true));
        document.addEventListener('keyup', (ev) => this.onkey(ev, ev.keyCode, false));

    }

    Player.prototype.update = function (dt) {
        if (!this.model.isLevelLoaded) return;
        this.model.playerPreviousTile = {x: this.lastTileX, y: this.lastTileY};
        Entity.prototype.update.call(this, dt);

        this.model.playerCurrentTile = {x: this.tileX, y: this.tileY};
        this.model.playerCurrentPosition = {x: this.x, y: this.y, dy: this.dy};

        this.lastTileX = this.tileX;
        this.lastTileY = this.tileY;
    };


    Player.prototype.draw = function (dt) {
        var ctx = this.model.ctx;
        ctx.fillStyle = "#ffcf3d";

        if (this.model.lifes == 0)
            ctx.fillStyle = "#ff1037";


        ctx.fillRect((this.x) + (this.dx * dt), (this.y) + (this.dy * dt), this.size, this.size)
    };


    function saveLevelData() {
        this.cells = [];
        for (var i = 0; i < this.model.level.length; i++) {
            this.cells = this.cells.concat(this.model.level[i]);
        }
    }

    Player.prototype.onkey = function (ev, key, down) {
        switch (key) {
            case KEY.LEFT:
                this.left = down;
                ev.preventDefault();
                return false;
            case KEY.RIGHT:
                this.right = down;
                ev.preventDefault();
                return false;
            case KEY.UP:
                this.jump = down;
                ev.preventDefault();
                return false;
            case KEY.DOWN:
                this.downPressed = down;
                ev.preventDefault();
                return false;
        }
    };

    KEY = {SPACE: 32, LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40};


    return Player;

}());




