init = function () {
    var engine = new Engine();

    var level = new Level();
    engine.elementsToDraw.push(level);

    var player = new Player();

    engine.elementsToDraw.push(player);

    engine.elementsToUpdate.push(player);

    engine.init();
    level.loadLevel(1)


};

addEventListener('load', init, false);

