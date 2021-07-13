import { drawFractalFullImg} from "./drawFractal.js";
import { drawFractalZoom } from "./drawFractal.js";
import { getTotalNumOfFunctions } from "./drawFractal.js";
import { changeFunction } from "./drawFractal.js";
import { Complex } from "./utils.js";

//global variables and constants
const fromStart = new Complex( -2, 2);
const toStart = new Complex( 2, -2);

var from = fromStart;
var to = toStart;

var zoomWidth = 50;
var zoomHeight = 50;
const enhanceRate = 7;

var canvasFullImage = document.getElementById( "canvasFullImage");
var ctxFullImage = canvasFullImage.getContext("2d");
const widthFullImg = canvasFullImage.width;
const heightFullImg = canvasFullImage.height;

var canvasZoom = document.getElementById( "canvasZoom");
var ctxZoom = canvasZoom.getContext( "2d");
const widthZoomImg = canvasZoom.width;
const heightZoomImg = canvasZoom.height;
ctxZoom.imageSmoothingEnabled = true;

//setup code - draws initial image
drawFractalFullImg( ctxFullImage, widthFullImg, heightFullImg, from, to);

//event listeners

//triggered by mouse movement - updates zoomed-in image
canvasFullImage.addEventListener( 'mousemove', function(event){
    let x = event.layerX;
    let y = event.layerY;

    drawFractalZoom(ctxZoom, canvasFullImage,
        Math.min(Math.max(0, x - zoomWidth/2), widthFullImg - zoomWidth),
        Math.min(Math.max(0, y - zoomHeight/2), heightFullImg - zoomHeight),
        zoomWidth, zoomHeight,
        0, 0,
        widthZoomImg, heightZoomImg);
});

//triggered by scroll-wheel - adjusts zoomed-in image
canvasFullImage.addEventListener( 'wheel', function(event){
    if( event.deltaY < 0){
        zoomWidth -= enhanceRate;
        zoomHeight -= enhanceRate;
    }else{
        zoomWidth += enhanceRate;
        zoomHeight += enhanceRate;
    }

    //make sure zoomWidth and zoomHeight and within certain bounds
    if( zoomWidth <= 0){ zoomWidth += enhanceRate}
    if( zoomHeight <= 0){ zoomHeight += enhanceRate}
    if( zoomWidth > widthFullImg){ zoomWidth -= enhanceRate}
    if( zoomHeight > heightFullImg){ zoomHeight -= enhanceRate}

    let x = event.layerX;
    let y = event.layerY;

    drawFractalZoom(ctxZoom, canvasFullImage,
        Math.min(Math.max(0, x - zoomWidth/2), widthFullImg - zoomWidth),
        Math.min(Math.max(0, y - zoomHeight/2), heightFullImg - zoomHeight),
        zoomWidth, zoomHeight,
        0, 0,
        widthZoomImg, heightZoomImg);
    event.preventDefault();
})

//triggered by left blick - renders a higher quality of a zoomed-in image and draws it on the main canvas
canvasFullImage.addEventListener( 'click', function(event){
    let pixelXFrom = Math.min(Math.max(0, event.layerX - zoomWidth/2), widthFullImg - zoomWidth);
    let pixelYFrom = Math.min(Math.max(0, event.layerY - zoomHeight/2), heightFullImg - zoomHeight);

    let pointWidth = to.re - from.re;
    let pointHeight = from.imag - to.imag;

    from = new Complex( from.re + pixelXFrom/widthFullImg * pointWidth,
                                 from.imag - pixelYFrom/heightFullImg * pointHeight);

    to = new Complex( from.re + zoomWidth/widthFullImg * pointWidth,
                               from.imag - zoomHeight/heightFullImg * pointHeight);

    drawFractalFullImg( ctxFullImage, widthFullImg, heightFullImg, from, to);
})


//linked to a html button - resets image on the main canvas
window.reset = function reset(){
    from = fromStart;
    to = toStart;
    drawFractalFullImg( ctxFullImage, widthFullImg, heightFullImg, from, to);
}

//likned to the select element - changes fractal function
window.selectFunction = function( funId){
    let num = getTotalNumOfFunctions();
    if( funId >= 0 && funId < num){
        changeFunction( funId);
        reset();
    }
}