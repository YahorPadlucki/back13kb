var Entity = (function () {
    function Entity(ctx) {
        this.model = GameModel.getInstance();

        this.tileSize = this.model.TILE;
        this.left = false;
        this.right = false;
        this.monster = false;

        this.tileX = 0;
        this.tileY = 0;

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

    }

    Entity.prototype.update = function (dt) {
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

        this.tileX = this.p2t(entity.x);
        this.tileY = this.p2t(entity.y);
        var nx = entity.x % this.tileSize,
            ny = entity.y % this.tileSize,
            cell = this.tcell(this.tileX, this.tileY),
            cellright = this.tcell(this.tileX + 1, this.tileY),
            celldown = this.tcell(this.tileX, this.tileY + 1),
            celldiag = this.tcell(this.tileX + 1, this.tileY + 1);

        if (entity.dy > 0) {
            if ((celldown && !cell) ||
                (celldiag && !cellright && nx)) {
                entity.y = this.t2p(this.tileY);
                entity.dy = 0;
                entity.falling = false;
                entity.jumping = false;
                ny = 0;

            }
        }
        else if (entity.dy < 0) {
            if ((cell && !celldown) ||
                (cellright && !celldiag && nx)) {
                entity.y = this.t2p(this.tileY + 1);
                entity.dy = 0;
                cell = celldown;
                cellright = celldiag;
                ny = 0;
            }
        }


        if (entity.dx > 0) {

            if ((cellright && !cell) ||
                (celldiag && !celldown && ny)) {
                entity.x = this.t2p(this.tileX);
                entity.dx = 0;
            }
        }
        else if (entity.dx < 0) {
            if ((cell && !cellright) ||
                (celldown && !celldiag && ny)) {

                entity.x = this.t2p(this.tileX + 1);
                entity.dx = 0;
            }
        }

        if (entity.monster) {
            if (entity.left && (cell || !celldown)) {
                entity.left = false;
                entity.right = true;
            }
            else if (entity.right && (cellright || !celldiag)) {
                entity.right = false;
                entity.left = true;
            }
        }
        // console.log(ty)


        entity.falling = !(celldown || (nx && celldiag));


    };

    function bound(x, min, max) {
        return Math.max(min, Math.min(max, x));
    };

    Entity.prototype.t2p = function (t) {
        return t * (this.tileSize);
    };

    Entity.prototype.p2t = function (p) {
        return Math.floor(p / (this.tileSize));
    };

    Entity.prototype.cell = function (x, y) {
        return this.tcell(this.p2t(x), this.p2t(y));
    };
    Entity.prototype.tcell = function (tx, ty) {
        return this.model.cells[tx + (ty * this.levelWidth)];
    };

    Entity.prototype.overlap = function (x1, y1, w1, h1, x2, y2, w2, h2) {
        return !(((x1 + w1 - 1) < x2) ||
            ((x2 + w2 - 1) < x1) ||
            ((y1 + h1 - 1) < y2) ||
            ((y2 + h2 - 1) < y1))
    };

    return Entity;

}());