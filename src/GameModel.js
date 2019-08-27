var GameModel = (function () {
    var instance;

    function init() {

        this.level = [
        ];

        this.cells=[];
        return {
            ctx: "",
            TILE: 20,
            columns: 64,
            rows: 64,
            level: this.level,
            cells:this.cells,
            currentLevel: 0,
            gameEnded: false,
            lifes: 3,
            showTutor: true,
            isLevelLoaded:false,

        };


    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };

}());