module.exports = class CompSim{
    constructor(real1,img1,real2 = 0, img2 = 0, scalar = 0){
        this.real1 = real1
        this.img1 = img1
        this.real2 = real2
        this.img2 = img2
        this.scalar = scalar
    }

    Run(){
        let FirstComplex = new Complex(this.real1,this.img1)
        let SecComplex = new Complex(this.real2,this.img2)
        
        let resAdd = FirstComplex.compAdd(SecComplex)
        let resScalMult = FirstComplex.compScalarMult(this.scalar)
        let resCompMult = FirstComplex.compMult(SecComplex)
        let resCompConj = FirstComplex.compConj()
        let resCompMod = FirstComplex.compModulus()
        let resCompDiv = FirstComplex.compDivide(SecComplex)
        let resCompDem = FirstComplex.compDeMoivre()

        this.SolVec = {Add:resAdd,ScalM:resScalMult,CompM:resCompMult,CConj:resCompConj,Mod:resCompMod,
            CDiv:resCompDiv,Dem:resCompDem}
    }
}

class Complex{
    constructor(real,imaginary){
        this.real = real
        this.imaginary = imaginary
    }

    compDisp(){
        return this.real.toString() + " + " + this.imaginary.toString() + "i" 
    }

    compAdd(other){
        let realPt = this.real + other.real
        let imaginaryPt = this.imaginary + other.imaginary
        return new Complex(realPt,imaginaryPt)

    }
    
    compScalarMult(constant){
        let realPt = this.real * constant
        let imaginaryPt = this.imaginary * constant
        return new Complex(realPt,imaginaryPt)
    }

    compMult(other){
        let realPt = this.real * other.real  - (this.imaginary) * other.imaginary
        let imaginaryPt = this.imaginary * other.real + other.imaginary * this.real 
        return new Complex(realPt,imaginaryPt)
    }

    compConj(){
        return new Complex(this.real,-this.imaginary)
    }

    compModulus(){
        return Math.sqrt(this.imaginary ** 2 + this.real ** 2)
    }

    compDivide(other){
        let denom = other.compModulus() ** 2
        if(denom == 0 || isNaN(denom)) return new Complex("DivByZero","DivByZero")
        let realPt = (this.real * other.real + this.imaginary * other.imaginary) / denom
        let imaginaryPt = (this.imaginary * other.real - this.real * other.imaginary) / denom
        return new Complex(realPt,imaginaryPt)
    }

    compDeMoivre(){
        let modSq = this.compModulus()
        let angle = Math.atan(this.imaginary/this.real)
        return {"r": modSq,  "theta":  angle}       
    }
}