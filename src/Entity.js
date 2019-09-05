var Entity = (function () {
    function Entity(ctx) {
        this.model = GameModel.getInstance();

        this.tileSize = this.model.TILE;
        this.left = false;
        this.right = false;
        this.monster = false;

        this.size = this.tileSize/2;

        this.tx = 0;
        this.ty = 0;

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

        this.tx = this.p2t(entity.x);
        this.ty = this.p2t(entity.y);
        var nx = entity.x % this.tileSize,
            ny = entity.y % this.tileSize,
            cell = this.tcell(this.tx, this.ty),
            cellright = this.tcell(this.tx + 1, this.ty),
            celldown = this.tcell(this.tx, this.ty + 1),
            celldiag = this.tcell(this.tx + 1, this.ty + 1);

        if (entity.dy > 0) {
            if ((celldown && !cell) ||
                (celldiag && !cellright && nx)) {
                entity.y = this.t2p(this.ty);
                entity.dy = 0;
                entity.falling = false;
                entity.jumping = false;
                ny = 0;
            }
        }
        else if (entity.dy < 0) {
            if ((cell && !celldown) ||
                (cellright && !celldiag && nx)) {
                entity.y = this.t2p(this.ty + 1);
                entity.dy = 0;
                cell = celldown;
                cellright = celldiag;
                ny = 0;
            }
        }

        if (entity.dx > 0) {

            if ((cellright && !cell) ||
                (celldiag && !celldown && ny)) {
                entity.x = this.t2p(this.tx);
                entity.dx = 0;
            }
        }
        else if (entity.dx < 0) {
            if ((cell && !cellright) ||
                (celldown && !celldiag && ny)) {

                entity.x = this.t2p(this.tx + 1);
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
        // console.log(tx)
        // console.log(ty)


        entity.falling = !(celldown || (nx && celldiag));


    };

    function bound(x, min, max) {
        return Math.max(min, Math.min(max, x));
    };

    Entity.prototype.t2p = function (t) {
        return t * this.tileSize;
    };
    Entity.prototype.p2t = function (p) {
        return Math.floor(p / this.tileSize);
    };
    Entity.prototype.cell = function (x, y) {
        return this.tcell(this.p2t(x), this.p2t(y));
    };
    Entity.prototype.tcell = function (tx, ty) {
        return this.model.cells[tx + (ty * this.levelWidth)];
    };

    return Entity;

}());