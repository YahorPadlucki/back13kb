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
            playerPreviousTile:{x:12,y:11},
            playerCurrentTile:{x:12,y:11},
            playerCurrentPosition:{x:0,y:0}

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