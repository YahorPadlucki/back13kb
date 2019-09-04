init = function () {
    var engine = new Engine();

    var level = new Level();
    engine.elementsToDraw.push(level);

    var player = new Player();
    var flea = new Flea();


    engine.elementsToDraw.push(player);
    engine.elementsToDraw.push(flea);

    engine.elementsToUpdate.push(player);
    engine.elementsToUpdate.push(flea);

    engine.init();
    level.loadLevel(1)


};

addEventListener('load', init, false);

