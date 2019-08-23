var Level = (function () {

        function Level() {

            this.level_width = 64;
            this.level_height = 64;
            this.level_data = [];

            this.tileSize = 20;

            this.model = GameModel.getInstance();
            this.ctx = this.model.ctx;

            this.isLevelLoaded = false;

            document.addEventListener("keydown", this.zoom.bind(this))

            this.scale = 1;

            this.width = 800;
            this.height = 600

            // var imageData = this.ctx.getImageData(0, 0, width, height);
            // var copiedCanvas = $("<canvas>").attr("width", width).attr("height", height)[0];
            // copiedCanvas.getContext("2d").putImageData(imageData, 0, 0);
        //
        }


        Level.prototype.zoom = function (e) {
            console.log(` ${e.code}`);

            // if (e.code == 'Space') {
            //   if(this.tileSize==20)
            //       this.zoom=-1;
            //     if(this.tileSize==10)
            //         this.zoom=1;
            // }
            //
            // this.tileSize += this.zoom;


            // this.isLevelLoaded = false




            this.scale-=0.5;


        }


        Level.prototype.load_image = function (name, callback) {
            var temp = new Image();
            temp.src = 'm/' + name + '.png';
            temp.onload = () => callback(temp);
        }
        Level.prototype.draw = function () {
            if (!this.isLevelLoaded) return;
            for (i = 0; i < this.level_width; i++) {
                for (j = 0; j < this.level_height; j++) {

                    var tile = this.level_data[i][j];

                    this.ctx.fillStyle = "#000000";

                    if (tile === 1) { //wall
                        this.ctx.fillStyle = "#797574";
                    }

                    if (tile === 2) { //floor
                        this.ctx.fillStyle = "#989898";
                    }
                    this.ctx.fillRect(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        };

        Level.prototype.load_level = function (id) {
            this.load_image('l' + id, (data) => {
                entities = [];
                num_verts = 0;
                num_lights = 0;

                cpus_total = 0;
                cpus_rebooted = 0;

                this.temp = document.createElement('canvas');


                // this.temp = document.createElement('canvas');
                // this.temp.width = this.temp.height = level_width; // assume square levels

                this.temp.width = this.temp.height = this.level_width; // assume square levels
                // this.temp = this.ctx
                this.temp = this.temp.getContext('2d')

                this.temp.drawImage(data, 0, 0);
                this.temp = this.temp.getImageData(0, 0, this.level_width, this.level_height).data;

                for (var y = 0, index = 0; y < this.level_height; y++) {
                    this.level_data[y] = [];

                    for (var x = 0; x < this.level_width; x++, index++) {

                        // reduce to 12 bit color to accurately match
                        var color_key =
                            ((this.temp[index * 4] >> 4) << 8) +
                            ((this.temp[index * 4 + 1] >> 4) << 4) +
                            (this.temp[index * 4 + 2] >> 4);


                        var elID = 0;
                        if (color_key == 0x888)//wall
                            elID = 1
                        if (color_key == 0xFFF)//floor
                            elID = 2


                        this.level_data[y][x] = elID;


                        if (color_key !== 0) {
                            // var tile = this.level_data[index] ;
                            //     color_key === 0x888 // wall
                            //         ? random_int(0, 5) < 4 ? 8 : random_int(8, 17)
                            //         : array_rand([1, 1, 1, 1, 1, 3, 3, 2, 5, 5, 5, 5, 5, 5, 7, 7, 6]); // floor


                            // if (tile > 7) { // walls
                            //     push_block(x * 8, y * 8, 4, tile - 1);
                            // }
                            // else if (tile > 0) { // floor
                            //     push_floor(x * 8, y * 8, tile - 1);

                            // enemies and items
                            // if (random_int(0, 16 - (id * 2)) == 0) {
                            //     new entity_spider_t(x*8, 0, y*8, 5, 27);
                            // }
                            // else if (random_int(0, 100) == 0) {
                            //     new entity_health_t(x*8, 0, y*8, 5, 31);
                            // }
                        }

                        // cpu
                        // if (color_key === 0x00f) {
                        //     this.level_data[index] = 8;
                        //     new entity_cpu_t(x*8, 0, y*8, 0, 18);
                        //     cpus_total++;
                        // }

                        // sentry
                        // if (color_key === 0xf00) {
                        //     new entity_sentry_t(x*8, 0, y*8, 5, 32);
                        // }

                        // player start position (blue)
                        // if (color_key === 0x0f0) {
                        //     entity_player = new entity_player_t(x*8, 0, y*8, 5, 18);
                    }
                }


                // Remove all spiders that spawned close to the player start


                // camera_x = -entity_player.x;
                // camera_y = -300;
                // camera_z = -entity_player.z - 100;

                // level_num_verts = num_verts;
                // callback && callback();

                console.log(this.level_data)
                this.isLevelLoaded = true;
            });
        }
        return Level;
    }()
);