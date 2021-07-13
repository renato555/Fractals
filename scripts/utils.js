//a pixel will be painted in a shade of color depending
//on how fast it diverges
export const colors ={
    "0" : [255, 255, 255, 255], //WHITE
    "1" : [88, 204, 237, 255], //shade of blue
    "2" : [56, 149, 211, 255], //shade of blue
    "3" : [18, 97, 160, 255], //shade of blue
    "4" : [7, 47, 95, 255], //shade of blue
    "5" : [128, 128, 128, 255], //GRAY
    "6" : [169, 169, 169, 255], //DARK_GRAY
    "7" : [0, 0, 0, 255], //BLACK
}

//complex numbers
//functions with complex numbers
export class Complex{
    constructor(re, imag){
        this.re = re;
        this.imag = imag;
    };

    plus( other){
        return new Complex(this.re + other.re,
            this.imag + other.imag)
    }

    times( other){
        let real = this.re * other.re - this.imag * other.imag
        let imag = this.re * other.imag + this.imag * other.re;
        return new Complex( real, imag);
    }

    minus( other){
        return new Complex( this.re - other.re,
                            this.imag - other.imag);
    }

    static sin( num){
        return new Complex( Math.sin( num.re)*Math.cosh(num.imag), 
                            Math.cos( num.re)*Math.sinh( num.imag));
    }

    static cos( num){
        return new Complex( Math.cos(num.re)*Math.cosh( num.imag),
                            -Math.sin(num.re)*Math.sinh(num.imag));
    }

    static abs( num){
        return Math.sqrt(num.re**2 + num.imag**2);
    }

    //returns e^(num)
    static ePow( num){
        let temp = Math.E**num.re;
        return new Complex( temp*Math.cos( num.imag), temp*Math.sin(num.imag))
    }
}