init = function () {
    var engine = new Engine();

    var level = new Level();
    engine.elementsToDraw.push(level);


    // engine.elementsToUpdate.push(player);

    engine.init();
    level.load_level(1)


};

addEventListener('load', init, false);

