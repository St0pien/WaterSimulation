const canvas = document.getElementById('pic');
const ctx  = canvas.getContext('2d');
// Set line's width
ctx.lineWidth = 0.5;

var scale = 5;
const w = 900;
const h = 500;
const rows = w/scale;
const cols = h/scale;
var verts = new Array(rows); //array with vertices
var rnd = 0; //random value for y coordinate
var rndx = 0; //random value for x coordinate

//class for each vertex
class vertex {
    constructor (a, b) {
        //coordinates
        this.x = a;
        this.y = b;
    }
    draw = () => {
        ctx.strokeRect(this.x, this.y, 1, 1); //useless method for debug (drawing a vertex)
    }
}

//this function draw a net of vertices and randomize position of vertices
const draw = () => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 500); //background
    for(y=0; y<rows; y++) {
        const rescale = (y+20)/scale*1.5; //to make next rows growing
        const change = (scale-rescale)*cols/2; //to center smaller rows 

        var elems = new Array(cols); //array with vertices of a single row
        verts[y] = elems; // making a two dimensional array with vertices
        for(x=0; x<cols; x++) { // creating vertices with random position
            rnd = Math.floor(Math.random()*8-4);
            rndx = Math.floor(Math.random()*4-2);
            const vert = new vertex(x*rescale+change+rndx, y*scale+rnd+150);
            elems[x] = vert;
        }
    }
    connect();
    window.requestAnimationFrame(draw);
}

const connect = () => { //this one connects vertices with a line
    for(y=0; y<rows; y++) {
        for(x=0; x<cols; x++) {
            ctx.beginPath();
            ctx.strokeStyle = "#0ef";
            const cordx = verts[y][x].x;
            const cordy = verts[y][x].y;

            ctx.moveTo(cordx, cordy);
            if(y < rows-1)
            ctx.lineTo(verts[y+1][x].x, verts[y+1][x].y);

            ctx.moveTo(cordx, cordy);
            if(y < rows-1 && x <cols-1)
            ctx.lineTo(verts[y+1][x+1].x, verts[y+1][x+1].y);

            ctx.moveTo(cordx, cordy);
            if(x < cols-1)
            ctx.lineTo(verts[y][x+1].x, verts[y][x+1].y);
            ctx.stroke();
        }
    }
}


window.requestAnimationFrame(draw);