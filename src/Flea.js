var Flea = (function () {

    Flea.prototype = Object.create(Entity.prototype);

    function Flea() {

        Entity.call(this);

        this.x = this.tileSize * 10;
        this.y = this.tileSize * 15;

        this.speed = 0.3;

        this.monster =true;

        this.right = true;

        this.size = this.tileSize/2;
        this.killed = false;

    }

    Flea.prototype.draw = function (dt) {
        if(this.killed) return;

        var ctx = this.model.ctx;
        ctx.fillStyle = "#ff6109";

        ctx.fillRect(this.x+this.size /2 + (this.dx * dt), this.y+this.size  + (this.dy * dt), this.size, this.size)
    };

    Flea.prototype.update = function (dt) {
        if (!this.model.isLevelLoaded) return;
        Entity.prototype.update.call(this,dt);

        if (this.overlap( this.model.playerCurrentPosition.x,  this.model.playerCurrentPosition.y, this.tileSize-this.size/2, this.tileSize-this.size, this.x, this.y, this.tileSize-this.size/2, this.tileSize-this.size)) {

            if (( this.model.playerCurrentPosition.dy > 0)){
                // killMonster(monster);
                this.killed =true;
            }


        }

    };

    return Flea;

}());
