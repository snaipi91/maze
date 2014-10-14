function init() {

    /*
    * methods
    *
    *   GenerateWall() - generate a corner of the wall
    *   FieldPoints() - Developer.Function Show points
    *   getRandom() - returns a random number (arguments min and max)
    *
    * */

    // создаем canvas объект
    var Canvas = function(id) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = screen.availWidth;
        this.canvas.height = Math.floor(screen.availHeight/4 + screen.availHeight/2);
        this.context.fillStyle = "rgb(0,0,0)";
        this.context.strokeRect(20, 20, this.canvas.width-40, this.canvas.height-40);
    }

    Canvas.prototype = {

        madeI : 0,
        start : Math.floor(Math.random() * 95),
        end   : Math.floor(Math.random() * 95),

        generateWall : function(x,y) {

            var degY = [0,180];
            var degX = [90,270];

            var pathWallX = function() {

                switch(degX[this.getRandom(0,2)]) {
                    case 90:
                        if(x !== this.canvas.width-20)
                            return x += 20;
                        else x = this.canvas.width-20;
                        break;
                    case 270:
                        if(x !== 20)
                            return x -= 20;
                        else x = 20;
                        break;
                }
            };

            var pathWallY = function() {

                switch(degY[this.getRandom(0,2)]) {
                    case 0:
                        if(y !== this.canvas.height-20)
                            return y +=20;
                        else y = this.canvas.height-20;
                        break;
                    case 180:
                        if(y !== 20)
                            return y-=20;
                        else y = 20;
                        break;
                }

            }


            this.context.strokeStyle = "rgb(0, 0, 0)";
            this.context.beginPath();
            this.context.moveTo(x, y);
            this.getRandom(0,2) == 1 ? this.context.lineTo(x, pathWallY.call(canvas,y)) : this.context.lineTo(pathWallX.call(canvas,x), y);
            this.context.stroke();

        },

        generateMaze: function(h) {

            var i = 20;
            var h = h !== undefined ? h : 20;

            for(i; i <= this.canvas.width-20; i += 20) {

                if(i === this.end * 20 || i === this.start * 20 && this.madeI < 2)
                    this.generateStarnEnd(i,h);
                else this.generateWall(i,h);

                // recursion
                if(i == this.canvas.width-20 && h < this.canvas.height-20) {
                    h +=20;
                    this.generateMaze(h);
                }
            }
        },

        generateStarnEnd : function(x,y) {
            if(y == 20) {
                this.context.beginPath();
                this.context.strokeStyle = "#f00";
                this.context.moveTo(x,y);
                this.context.lineTo(x+20,y);
                this.context.stroke();
                this.madeI++;
                console.log(this.canvas.height-20, y);
            }

            if(y == this.canvas.height-20) {
                this.context.beginPath();
                this.context.strokeStyle = "#f00";
                this.context.moveTo(x,y);
                this.context.lineTo(x+20,y);
                this.context.stroke();
                this.madeI++;
                console.log(this.canvas.height-20, y);
            }
        },

        fieldPoints : function(h) {

            var i = 20; // interval between points
            var h = h !== undefined ? h : 20; // default

            for(i; i <= this.canvas.width-20; i += 20) {
                console.log(this.canvas.width);
                this.context.fillRect(i-3, h-3, 6, 6);

                // recursion
                if(i == this.canvas.width-20 && h < this.canvas.height-20) {
                    h +=20;
                    this.fieldPoints(h);
                }
            }
        },

        getRandom : function(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
    }

    var canvas = new Canvas("canvasContainer");
    var cnv = canvas.context;
    canvas.generateMaze();
    console.log((canvas.canvas.width-20)/20);
}

window.addEventListener('load', init());