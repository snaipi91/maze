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

        GenerateWall : function() {

            var deg = [0, 90 ,180 ,270];
            var pathWall = function() {
                console.log(canvas);
                switch(deg[Math.floor(this.getRandom(0,4))]) {
                    case 0:
                        return 100;
                        break;
                    case 90:
                        return 200;
                        break;
                    case 180:
                        return 300;
                        break;
                    case 270:
                        return 400;
                        break;
                }
            };

            this.context.fillStyle = "rgba(250, 0, 0, 1)";
            this.context.beginPath();
            this.context.moveTo(20, 20);
            this.context.lineTo(20, pathWall.call(canvas));
            this.context.stroke();
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
            return Math.random() * (max - min) + min; //возвращает случайное число в диапозоне
        }
    }

    var canvas = new Canvas("canvasContainer");
    var cnv = canvas.context;
    canvas.GenerateWall();
    canvas.fieldPoints();
}

window.addEventListener('load', init());