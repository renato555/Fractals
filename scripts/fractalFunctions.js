import { colors } from "./utils.js";
import { Complex } from "./utils.js";

//functions return a color depending on how fast a point diverges

export let functionDictionary = {
    "0" : fun0(),
    "1" : fun1(),
    "2" : fun2(),
    "3" : fun3(),
    "4" : fun4(),
    "5" : fun5(),
    "6" : fun6(),
    "7" : fun7(),
    "8" : fun8(),
    "9" : fun9(),
    "10" : fun10(),
    "11" : fun11(),
    "12" : fun12(),
    "13" : fun13(),
    "14" : fun14(),
    "15" : fun15(),
    "16" : fun16()
}

//mandelbrot
//z := z^2 + z0
function fun0(){ 
    let fun = function( z, num){
        return z.times(z).plus(num);
    }

    return template1( fun, 200, 3);
}

//z := z^2 + (z0)^3
function fun1(){
    let fun = function( z, num){
        return z.times(z).plus(num.times(num).times(num));
    }

    return template1( fun, 200, 3);
}

function fun2(){
    let c = new Complex( -0.79, 0.15);
    return template2(200, 3, c);
}

function fun3(){
    let c = new Complex( -0.15, 0.8418);
    return template2(200, 3, c);
}

function fun4(){
    let c = new Complex( 0.3, -0.01);
    return template2( 55, 3, c);
}

function fun5(){
    let c = new Complex( -1.476, 0);
    return template2(200, 3, c);
}

function fun6(){
    let c = new Complex( -0.207, -0.79);
    return template2( 200, 3, c);
}

function fun7(){
    let c = new Complex( 0.28, -0.008);
    return template2( 200, 3, c);
}

function fun8(){
    let c = new Complex( -0.4, 0.6);
    return template2( 200, 3, c);
}

function fun9(){
    let c = new Complex( -0.1, 0.651);
    return template2( 500, 20, c);
}

function fun10(){
    let c = new Complex( 0.355, 0.355);
    return template2( 200, 3, c);
}

function fun11(){
    let c = new Complex( -0.4, -0.595);
    return template2( 200, 3, c);
}

function fun12(){
    let c = new Complex( 0.09, -0.059);
    return template3( 200, 20, c);
}

function fun13(){
    let c = new Complex( 0.081, 0.0505);
    return template3( 200, 20, c);
}

function fun14(){
    let c = new Complex( -0.5, 0.647);
    return template3( 200, 20, c);
}

function fun15(){
    let c = new Complex( -0.6, 0.63);
    return template3( 200, 20, c);
}

function fun16(){
    let c = new Complex( 0.09, -0.4178);
    return template3( 200, 20, c);
}

//z := z^2 + z + c
function template3( numOfIterations, R, c){
    let fun = function( z){
        return z.times(z).plus(z).plus(c);
    }

    return template1( fun, numOfIterations, R);
}

//z := z^2 + c
function template2( numOfIterations, R, c){
    let fun = function( z){
        return z.times(z).plus(c);
    }

    return template1( fun, numOfIterations, R);
}

//base template for all functions
//in each iteration calculate the value of a fractal function (fun1 or fun2 or fun3...)
//if a point escapes a certain treshold R return some shade of color
//if it didnt diverge then return index of the black color
function template1( fun, numOfIterations, R){
    return function( num){
        let z = new Complex( num.re, num.imag);

        for( let i = 0; i < numOfIterations; ++i) {
            z = fun(z, num);
            
            if( Complex.abs(z) > R) {
                let percent = i / numOfIterations;
                return Math.floor((Object.keys(colors).length - 1) * percent);
            }
        }
        return Object.keys(colors).length - 1;
    }
}