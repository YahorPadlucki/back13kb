var GameModel = (function () {
    var instance;

    function init() {

        this.level = [
        ];

        return {
            ctx: "",
            TILE: 32,
            columns: 15,
            rows: 15,
            level: this.level,
            currentLevel: 0,
            gameEnded: false,
            lifes: 3,
            showTutor: true,
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