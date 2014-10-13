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

        generateWall : function(x,y) {

            var degY = [0,180];
            var degX = [90,270];

            var pathWallX = function() {

                switch(degX[Math.floor(this.getRandom(0,2))]) {
                    case 90:
                        return x+=20;
                        break;
                    case 270:
                        return x-=20;
                        break;
                }
            };

            var pathWallY = function() {

                switch(degY[Math.floor(this.getRandom(0,2))]) {
                    case 0:
                        return y +=20;
                        break;
                    case 180:
                        return y-=20;
                        break;
                }

            }


            this.context.fillStyle = "rgba(0, 0, 0, 1)";
            this.context.beginPath();
            this.context.moveTo(x, y);
            Math.floor(this.getRandom(0,2)) == 1 ? this.context.lineTo(x, pathWallY.call(canvas,y)) : this.context.lineTo(pathWallX.call(canvas,x), y);
            this.context.stroke();

        },

        generateMaze: function(h) {

            var i = 20;
            var h = h !== undefined ? h : 20;

            for(i; i <= this.canvas.width-20; i += 20) {
                this.generateWall(i,h);

                // recursion
                if(i == this.canvas.width-20 && h < this.canvas.height-20) {
                    h +=20;
                    this.generateMaze(h);
                }
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
            return Math.random() * (max - min) + min;
        }
    }

    var canvas = new Canvas("canvasContainer");
    var cnv = canvas.context;
    canvas.generateMaze();
}

window.addEventListener('load', init());