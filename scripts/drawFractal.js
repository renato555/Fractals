import {Complex} from './utils.js';
import { colors } from './utils.js';

//functions that determine if a point is in a specific fractal
import { functionDictionary } from './fractalFunctions.js';

//currently set fractal function
var fractalFunction = functionDictionary[0];

//draws an image of a fractal on the main canvas
export async function drawFractalFullImg( ctx, width, height, from, to){
    let arr = [];
    fillArray( arr, width, height, from, to);
    
    let uint8 = new Uint8ClampedArray( arr);
    let imgData = new ImageData( uint8, width, height);
    let imageBitmap = await createImageBitmap( imgData);
    ctx.drawImage(imageBitmap, 0, 0);
}

//draws a zoomed-in image on the secondary canvas
export function drawFractalZoom( ctx, canvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
    ctx.drawImage(canvas, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}

//for each pixel calculate a fractal function and depending on
//the return value paint the pixel a certain shade of color
function fillArray( arr, width, height, from, to){
    let fieldWidth = to.re - from.re;
    let fieldHeight = -(to.imag - from.imag);
    
    for( let i = 0; i < height; ++i){
        for( let j = 0; j < width; ++j){
            let z = new Complex( from.re + (j/width)*fieldWidth, from.imag - (i/height)*fieldHeight)
            let rgba = colors[ fractalFunction( z)];

            arr.push( rgba[0]);
            arr.push( rgba[1]);
            arr.push( rgba[2]);
            arr.push( rgba[3]);
        }
    }
}

export function changeFunction( funId){
    fractalFunction = functionDictionary[funId];
}

export function getTotalNumOfFunctions(){
    return Object.keys( functionDictionary).length;
}