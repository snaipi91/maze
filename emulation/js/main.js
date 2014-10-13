function init() {

    /*
    * methods
    *   GenerateWall() - generate a corner of the wall
    *
    *
    *
    * */

    // создаем canvas объект
    var Canvas = function(id) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = screen.availWidth;
        this.canvas.height = Math.floor(screen.availHeight/4 + screen.availHeight/2);
    }

    Canvas.prototype = {
        GenerateWall : function() {

            var deg = [0, 90 ,180 ,270];
            var pathWall = function() {
                console.log(deg[Math.floor(this.getRandom(0,4))]);
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

            this.context.fillStyle = "rgba(250, 150, 150, 1)";
            this.context.beginPath();
            this.context.moveTo(25,25);
            this.context.lineTo(25,pathWall.call(canvas));
            this.context.stroke();
        },
        getRandom : function(min, max) {
            return Math.random() * (max - min) + min; //возвращает случайное число в диапозоне
        }
    }

    var canvas = new Canvas("canvasContainer");
    var cnv = canvas.context;
    canvas.GenerateWall();
}

window.addEventListener('load', init());