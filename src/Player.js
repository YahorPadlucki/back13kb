var Player = (function () {


    function Player() {

        this.model = GameModel.getInstance();

        this.tileSize = this.model.TILE;

        this.x = this.tileSize * 12;
        this.y = this.tileSize * 20;

        this.speed = 1;

        this.dx = 0;
        this.ddx = this.speed;
        this.dy = 0;
        this.ddy = 0;

        this.levelWidth = this.model.columns;

        this.level = this.model.level;

        this.cells = [];

        this.friction = 1 / 6;
        this.falling = false;
        this.accel = 50;
        this.gravity = 9.8*6;

        this.maxdx = 150;   // default max horizontal speed (15 tiles per second)
        this.maxdy = 600;      // default max vertical speed   (60 tiles per second)
        this.impulse = 15000;      // default max vertical speed   (60 tiles per second)

        document.addEventListener('keydown',(ev)=> this.onkey(ev,ev.keyCode,true));
        document.addEventListener('keyup',  (ev)=>this.onkey(ev, ev.keyCode,false));

    }


    Player.prototype.draw = function (dt) {
        var ctx = this.model.ctx;
        ctx.fillStyle = "#ffcf3d";

        if (this.model.lifes == 0)
            ctx.fillStyle = "#ff1037";


        ctx.fillRect(this.x + (this.dx * dt), this.y + (this.dy * dt), this.tileSize, this.tileSize)
    };

    Player.prototype.update = function (dt) {
        if (!this.model.isLevelLoaded) return;


        var entity = this;
        var wasleft = entity.dx < 0,
            wasright = entity.dx > 0,
            falling = entity.falling,
            friction = entity.friction * (falling ? 0.5 : 1),
            accel = entity.accel * (falling ? 0.5 : 1);

        entity.ddx = 0;
        entity.ddy = entity.gravity;

        if (entity.left)
            entity.ddx = entity.ddx - accel;
        else if (wasleft)
            entity.ddx = entity.ddx + friction;

        if (entity.right)
            entity.ddx = entity.ddx + accel;
        else if (wasright)
            entity.ddx = entity.ddx - friction;

        if (entity.jump && !entity.jumping && !falling) {
            entity.ddy = entity.ddy - entity.impulse; // an instant big force impulse
            entity.jumping = true;
        }

        entity.x = entity.x + (dt * entity.dx);
        entity.y = entity.y + (dt * entity.dy);
        entity.dx = bound(entity.dx + (dt * entity.ddx), -entity.maxdx, entity.maxdx);
        entity.dy = bound(entity.dy + (dt * entity.ddy), -entity.maxdy, entity.maxdy);

        if ((wasleft && (entity.dx > 0)) ||
            (wasright && (entity.dx < 0))) {
            entity.dx = 0; // clamp at zero to prevent friction from making us jiggle side to side
        }

        var tx = this.p2t(entity.x),
            ty = this.p2t(entity.y),
            nx = entity.x % this.tileSize,
            ny = entity.y % this.tileSize,
            cell = this.tcell(tx, ty),
            cellright = this.tcell(tx + 1, ty),
            celldown = this.tcell(tx, ty + 1),
            celldiag = this.tcell(tx + 1, ty + 1);

        if (entity.dy > 0) {
            if ((celldown && !cell) ||
                (celldiag && !cellright && nx)) {
                entity.y = this.t2p(ty);
                entity.dy = 0;
                entity.falling = false;
                entity.jumping = false;
                ny = 0;
            }
        }
        else if (entity.dy < 0) {
            if ((cell && !celldown) ||
                (cellright && !celldiag && nx)) {
                entity.y = this.t2p(ty + 1);
                entity.dy = 0;
                cell = celldown;
                cellright = celldiag;
                ny = 0;
            }
        }

        if (entity.dx > 0) {
            console.log(cellright)

            if ((cellright && !cell) ||
                (celldiag && !celldown && ny)) {
                entity.x = this.t2p(tx);
                entity.dx = 0;
            }
        }
        else if (entity.dx < 0) {
            if ((cell && !cellright) ||
                (celldown && !celldiag && ny)) {

                entity.x = this.t2p(tx + 1);
                entity.dx = 0;
            }
        }

        /* if (entity.monster) {
             if (entity.left && (cell || !celldown)) {
                 entity.left = false;
                 entity.right = true;
             }
             else*/
        // if (entity.right && (cellright || !celldiag)) {
        //     entity.right = false;
        //     entity.left = true;
        // }
        // }

        entity.falling = ! (celldown || (nx && celldiag));



    };


    function bound(x, min, max) {
        return Math.max(min, Math.min(max, x));
    };

    Player.prototype.t2p = function (t) {
        return t * this.tileSize;
    };
    Player.prototype.p2t = function (p) {
        return Math.floor(p / this.tileSize);
    };
    Player.prototype.cell = function (x, y) {
        return this.tcell(this.p2t(x), this.p2t(y));
    };
    Player.prototype.tcell = function (tx, ty) {
        return this.model.cells[tx + (ty * this.levelWidth)];
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




