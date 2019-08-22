var Engine = (function (global) {

    var window = global.window;
    var document = window.document;
    var canvas = document.getElementById('c');
    var ctx = canvas.getContext('2d');

    function Engine() {

        GameModel.getInstance().ctx = ctx;

        this.elementsToUpdate = [];
        this.elementsToDraw = [];
    }

    Engine.prototype.init = function () {
        this.prevTime = Date.now();
        this.enterFrame();
    };

    Engine.prototype.enterFrame = function () {

        GameModel.getInstance().ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        var now = Date.now();
        var deltaTime = (now - this.prevTime) / 1000.0;
        if (deltaTime > 0.5)
            deltaTime = 0;

        this.draw(deltaTime);
        this.update(deltaTime);

        this.prevTime = now;

        window.requestAnimationFrame(this.enterFrame.bind(this));
    };

    Engine.prototype.update = function (deltaTime) {
        for (var i = 0; i < this.elementsToUpdate.length; i++) {
            this.elementsToUpdate[i].update(deltaTime);
        }

    };

    Engine.prototype.draw = function (deltaTime) {

        for (var i = 0; i < this.elementsToDraw.length; i++) {
            //
            var element = this.elementsToDraw[i];
            element.draw(deltaTime);
        }
    };

    return Engine;

}(this));