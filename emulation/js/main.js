function init() {

    /*
    *
    * 3610 generate Object (points)
    *
    * methods
    *
    *   GenerateWall() - generate a corner of the wall
    *   FieldPoints() - Developer.Function Show points
    *   getRandom() - return a random number (arguments min and max)
    *   generateMaze() - главный цикл генерации
    *   wrapperMaze() - генерация обертки лабиринта
    *   vectorGenerate() - определяет направление вектора
    *   createObjMatrix() - добавляет объект "точка"
    *   drawPath() - проверяет заданные алгоритмом точки, добавляет пути в массив, передает выполнение casePath()
    *   casePath() - строит путь взависимости от массива
    *
    *
    * properties
    *
    *   debug [false or true]
    *   madeI - static variable(enterExit)
    *   enter and exit - static variable для генерации входа и выхода
    *   arrPath - массив направлений
    *
    * */

    // создаем canvas объект
    var Canvas = function(id) {
        this.canvas = document.getElementById(id);
        this.context = this.canvas.getContext('2d');
        this.canvas.width = screen.availWidth;
        this.canvas.height = Math.floor(screen.availHeight/4 + screen.availHeight/2);
        this.context.fillStyle = "rgb(0,0,0)";
//        this.context.strokeRect(20, 20, this.canvas.width-40, this.canvas.height-40);
    }

    Canvas.prototype = {

        debug : true,
        madeI : 0,
        arrPath : [],
        matrix : [],
        vector : '',
        enter : Math.floor(Math.random() * 95),
        exit  : Math.floor(Math.random() * 95),

        log : function(description, obj) {
            if(this.debug)
                console.log(description, obj);
        },

        getRandom : function(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },

        wrapperMazeX : function(x,y) {

            this.context.strokeStyle = "rgb(0, 0, 0)";
            this.context.beginPath();
            this.context.moveTo(x, y);
            x !== 1900 ? this.context.lineTo(x + 20, y) : false;
            this.context.stroke();

            this.createObjMatrix(x, y, true, 'right');

        },

        wrapperMazeY : function(x,y) {

            this.context.strokeStyle = "rgb(0, 0, 0)";
            this.context.beginPath();
            this.context.moveTo(x, y);
            y !== 760 ? this.context.lineTo(x, y + 20) : false;
            this.context.stroke();

            y !== 20 && y !== 760 ? this.createObjMatrix(x, y, true, 'bottom') : false;
        },

        generateWall : function(x,y) {

            this.context.strokeStyle = "rgb(0, 0, 0)";
            this.context.beginPath();
            this.context.moveTo(x, y);
            this.drawPath();
            this.context.stroke();

        },

        casePath : function(x,y) {

            switch(this.arrPath[this.getRandom(0,this.arrPath.length-1)]) {
                case 0 :
                    this.matrix[this.matrix.length-1].vector = 'bottom';
                    this.context.lineTo(x, y + 20);
                    this.log('массив : ', this.arrPath);
                break;

                case 90 :
                    this.matrix[this.matrix.length-1].vector = 'right';
                    this.context.lineTo(x + 20, y);
                break;

                case 180 :
                    this.matrix[this.matrix.length-1].vector = 'top';
                    this.context.lineTo(x, y - 20);
                    this.log('массив : ', this.arrPath);
                break;

                case 270 :
                    this.matrix[this.matrix.length-1].vector = 'left';
                    this.context.lineTo(x - 20, y);
                break;
            }
        },

        drawPath : function() {

            var obj = this.matrix[this.matrix.length-1];

            this.log('точки : ', obj.l3);

            if(obj['points'].l1 == 'right' && obj['points'].l3 != 'bottom') {
                this.arrPath.push(0, 90, 180);
                this.casePath(obj.w, obj.h);
            }

            else if(obj['points'].l3 == 'bottom') {
                this.arrPath.push(0, 90, 270);
                this.casePath(obj.w, obj.h);
            }

            else if(obj['points'].l1 == 'right' && obj['points'].l3 == 'bottom') {
                this.arrPath.push(90, 0);
                this.casePath(obj.w, obj.h);
            }

            else {
                this.arrPath.push(0, 90, 180, 270);
                this.casePath(obj.w, obj.h);
            }

            this.arrPath = [];

        },

        generateMaze : function(h) {

            var i = 20;
            var h = h !== undefined ? h : 20;

            for(i; i <= this.canvas.width-20; i += 20) {

                if(h !== 20 && h !== 760 && i !== 20 && i !== 1900) {
                    this.createObjMatrix(i, h, false, null);
                }

                if(i === this.enter * 20 && this.madeI < 1 || i === this.exit * 20 && h === 760 && this.madeI < 2) {

                    this.madeI < 2 ? this.createObjMatrix(i, h, true, 'right') : false;
                    this.generateStartEnd(i,h);

                } else {

                    h === 20 || h === 760 ? this.wrapperMazeX(i,h) : false;
                    i === 20 || i === 1900 ? this.wrapperMazeY(i,h) : false;

                }

                if(i !== 20 && i !==1900 && h !== 20 && h !== 760)
                    this.generateWall(i,h);

                // recursion
                if(i == this.canvas.width-20 && h < this.canvas.height-20) {
                    h +=20;
                    this.generateMaze(h);
                }
            }
        },

        generateStartEnd : function(x,y) {

            this.log('генерация входа и выхода', {'x' : x, 'y' : y, 'canvas' : this.canvas.height-20});

            this.context.beginPath();
            this.context.strokeStyle = "#fff";
            this.context.moveTo(x,y);
            this.context.lineTo(x-20,y);
            this.context.stroke();
            this.madeI++;
        },

        //  Help method
        //  ******************************************************************************************

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

        // *********************************************************************************************

        createObjMatrix : function(i,h, bool, vector) {
            this.matrix.push({
                'w' : i,
                'h' : h,
                'wall' : bool,
                'vector' : vector
            });

            if(this.matrix.length > 1) {

                // динамическое создание свойства
                this.matrix[this.matrix.length-1]['points'] = {
                    l1 : this.matrix[this.matrix.length-1].w >= 40  ? this.matrix[this.matrix.length-2].vector : null,
                    l2 : this.matrix[this.matrix.length-1].h >= 40 && this.matrix[this.matrix.length-1].w >= 40 ? this.matrix[this.matrix.length-97].vector : null,
                    l3 : this.matrix[this.matrix.length-1].h >= 40 && this.matrix[this.matrix.length-1].w >= 40 ? this.matrix[this.matrix.length-96].vector : null,
                    l4 : this.matrix[this.matrix.length-1].h >= 40 && this.matrix[this.matrix.length-1].w >= 40 ? this.matrix[this.matrix.length-95].vector : null
                }

            }
        }

    };

    var canvas = new Canvas("canvasContainer");
//    canvas.log("экземпляр объекта Canvas создан : ", canvas);
    var cnv = canvas.context;
    canvas.generateMaze();
    canvas.log("матрица заполнена : ", canvas.matrix);
//    canvas.log("Canvas элемент", canvas.matrix[canvas.matrix.length-96].w);
}

window.addEventListener('load', init());
