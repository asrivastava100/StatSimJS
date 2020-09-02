module.exports = class Simulation{
    constructor(function1,ssize1, params, warnOn = true){
        this.function1 = function1
        this.params = params
        this.ssize1 = ssize1
        this.warnOn = warnOn
    }

    Run(){
        errorStream = []
        warningStream = []
      
        let dist_sel = this.function1
        let sampSize = parseInt(this.ssize1)
        let nParam = this.params.length
        
        let i = 0;
        let paramVal = []
        for(i=0;i<nParam;i++){
            paramVal.push(this.params[i])

        }
        let result = CreateSample(dist_sel,sampSize,paramVal)
        this.output = result
        this.mean = mean(result)
        this.Variance = Var(result)
        
        if(errorStream.length == 0){
            
            if(warningStream.length != 0 && this.warnOn){
                alert(warningStream[warningStream.length - 1])
            }   
        } 
    
        this.estream = errorStream
        this.wstream = warningStream
       
        //console.log(`Simulation complete. Errors:${this.estream.length}. Warnings:${this.wstream.length}`)
        return 0 

    } 
    
    CreateObj(){
        if(this.output === undefined){
            console.log("Use the Run method before calling CreateObj")
        }
        else{
            let respObj = {Out:this.output, err:this.estream,wstr:this.wstream,avg:this.mean,
            variance:this.Variance}
            
            return JSON.stringify(respObj)
            
        }
    }

    exportToCsv(){
        if(this.output === undefined) {
            console.log("Use the run method before calling exportToCsv")
        } else{
            var CsvString = "Mean:,\r\n" + this.mean.toString() + ",\r\n" +"Variance:,\r\n" +this.Variance.toString() + ",\r\n" +
            "Data:,\r\n" ;
            this.output.forEach(function(ColItem) {
                CsvString += ColItem + ',';
                CsvString += "\r\n";
            
            });
            CsvString = "data:application/csv," + encodeURIComponent(CsvString);
            var x = document.createElement("A");
            x.setAttribute("href", CsvString );
            x.setAttribute("download","data.csv");
            document.body.appendChild(x);
            x.click();
        }
    }

    test(){
        return 42
    }
}

var errorStream = []
var warningStream = []

function mean(listNos){
    if(typeof(listNos) === "number" || typeof(listNos) === "object"){
        if(typeof(listNos) === "number"){
            return listNos
        } else{
            return listNos.reduce((x,y) => x+y) / listNos.length
        } 
    } else{
        errorStream.push("@mean - invalid type / values entered")
        return -1
    }  
}


function Var(listNos){
    if(typeof(listNos) === "object"){
        squares = listNos.map((x) => x ** 2)
        if(isNaN(mean(squares) - mean(listNos) ** 2)){
            errorStream.push("@Var - returned NaN. check entry.")
            return -1
        } else{
            return mean(squares) - mean(listNos) ** 2
        }
           
    } else{
        errorStream.push("@Var - Invalid entry")
        return -1
        
    }
}


function stdev(listNos){
    return Math.sqrt(Var(listNos))
}

function factorial(n){
    if(typeof(n) === "number"){
        if(n - Math.round(n) === 0 && n >=0){
            if(n === 0){
                return 1
            } else{
                let fact = n 
                fact = fact * factorial(n-1)
                return fact
            }
        } else{
            errorStream.push("@factorial - Invalid entry")
        }
        
        
    } else{
        errorStream.push("@factorial - Invalid entry")
        return -1

    }
    
    
}

function erf(x){
    let a1 = 0.0705230784 
    let a2 = 0.0422820123 
    let a3 = 0.0092705272
    let a4 = 0.0001520143
    let a5 = 0.0002765672
    let a6 = 0.0000430638
    let denom = (1 + a1 * x + a2 *(x ** 2) + a3 * (x ** 3) + a4 * (x ** 4)
    + a5 * (x ** 5) + a6 * (x ** 6)) ** 16
    return 1 - (1 / denom)
}

function erfInv(x){
    let a1 = 0.88622692545
    let a2 = 0.23201366653
    let a3 = 0.1275561753
    let a4 = 0.08655212924
    let a5 = 0.06495961774
    let a6 = 0.05173128198
    let a7 = Math.pow(Math.PI,6) * 20036983 / (97297200 * Math.pow(2,12))
    let a8 = Math.pow(Math.PI,7) * 2280356863 / (10216206000 * Math.pow(2,14))
    let a9 = Math.pow(Math.PI,8) * 49020204823 / (198486288000 * Math.pow(2,16))
    let a10 = Math.pow(Math.PI,9) * 65967241200001 / (237588086736000 * Math.pow(2,18))
    let a11 = Math.pow(Math.PI,10) * 15773461423793767 / (49893498214560000 * Math.pow(2,20))
    let a12 = Math.pow(Math.PI,11) * 655889589032992201 / (1803293578326240000 * Math.pow(2,22))
    let result = ( a1 * x + a2 *(x ** 3) + a3 * (x ** 5) + a4 * (x ** 7)
    + a5 * (x ** 9) + a6 * (x ** 11) + a7 * (x ** 13) + a8 * (x ** 15)
    + a9 * (x  ** 17) + a10 * (x ** 19) + a11 * (x ** 21) + a12 * (x ** 23))
    return result

}

// itRange creates a sequence of 'n' numbers (0,...n-1)

let itRange = n => Array.from(Array(n).keys())


// unif(k,z) = unif(0,z-k) + k = (z-k)unif(0,1) + k

function jsunif(ssize,lower = 0,upper = 1){
    if(!isNaN(parseFloat(ssize)) && !isNaN(parseFloat(lower)) && 
    !isNaN(parseFloat(upper)) && ssize > 0 && lower != upper){
        let iteratorObj = itRange(ssize)
        const result = iteratorObj.map(function(iterator){
            return (upper - lower) * Math.random() + lower
        })
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        return result;
    } else{
        errorStream.push("@jsunif - One or more entries is invalid")
        return -1
    } 
}


function jsnorm(ssize,mu = 0,sigma = 1){
    
    if(!isNaN(parseFloat(ssize)) && !isNaN(parseFloat(mu)) && 
    !isNaN(parseFloat(sigma)) && sigma >= 0 && ssize > 0){
        let n = 0
        if(ssize % 2 === 0){
            n = ssize / 2
            indicator = 0
        } else{
            n = (ssize + 1) / 2
            indicator = 1
        }
        let sample = []
        let index = 0;
        while(index < n){
            let x1 = jsunif(1,-1,1);
            let x2 = jsunif(1,-1,1);
            warningStream = []
            let S = Math.pow(x1,2) + Math.pow(x2,2);
            if(S <= 1){
                sample.push(mu + sigma * (Math.sqrt(-2 * Math.log(S)) * 
                (x1 / Math.sqrt(S))))
                sample.push(mu + sigma * (Math.sqrt(-2 * Math.log(S)) * 
                (x2 / Math.sqrt(S))))
                index = index + 1
            }
        }
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        if(indicator === 0){
            return sample
        } else {
            sample.pop()
            return sample
        }        
    } else{
        errorStream.push("@jsnorm - One or more parameters is out of range!")
        return -1
    }
}

function normCDF(x){
    return 0.5 * (1 + erf(x/Math.sqrt(2)))
    
}

function qnorm(p){
    if(!isNaN(parseFloat(p)) && p > 0 && p < 1){
        return Math.sqrt(2) * erfInv(2*p - 1)
    } else{
        errorStream.push("@qnorm - invalid probability entered")
    }
    

}

function jslognorm(ssize,mu = 0, sigma = 1){
    if(!isNaN(parseFloat(ssize)) && !isNaN(parseFloat(mu)) && !isNaN(parseFloat(sigma)) &&
    ssize > 0 && sigma >= 0){
        let result = jsnorm(ssize,mu,sigma)
        result = result.map(x => Math.exp(x))
        return result
    } else{
        errorStream.push("@jslognorm - invalid entry")
        return -1   
    }

}
    

function jsexp(ssize,lambda = 1){

    if(ssize <= 0 || lambda <= 0 || isNaN(parseFloat(ssize)) || isNaN(parseFloat(lambda))){
        errorStream.push("@jsexp - One or more parameters is out of range!");
         return -1
     } else{
         let sample = jsunif(ssize)
         warningStream = []
         sample = sample.map(function(x){
             return (- 1 / lambda) * Math.log(x)
         })
         if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
         }
         return sample;
     }
 }
 

 function jsbernoulli(ssize,p){
    if(ssize <= 0 || p > 1 || p < 0 || isNaN(parseFloat(ssize)) || isNaN(parseFloat(p))){
        errorStream.push("@jsbernoulli - One or more parameters out of range");
        return -1
    } else{
        let sample = jsunif(ssize)
        warningStream = []
        sample = sample.map(function(x){
            if(x<p){
                return 1
            } else {
                return 0
            }
        })
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        return sample

    }

 } 
 
function jsbinom(ssize,n,p){
    if(ssize <= 0 || n <= 0 || p > 1 || p <= 0 || isNaN(parseFloat(ssize)) || isNaN(parseFloat(n)) ||
    isNaN(parseFloat(p))){
        errorStream.push("@jsbinom - One or more parameters out of range!")
        return -1
    } else{
        let itObj = itRange(ssize)
        let result = itObj.map(x => {
            let inst = jsbernoulli(n,p)
            inst = inst.reduce((x,y) => x+y)
            return inst        
    })
        warningStream = []
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        return result

    }
    
}

function jsweibull(ssize, scale, shape){
    if(ssize <= 0 || scale <= 0 || shape <= 0 || isNaN(parseFloat(ssize)) || isNaN(parseFloat(scale)) ||
    isNaN(parseFloat(shape))){
        errorStream.push("@jsweibull - One or more parameters out of range!")
        return -1
    } else{
        let sample = jsunif(ssize)
        
         sample = sample.map(function(x){
             return scale * Math.pow(-Math.log(x),1 / shape)
         })
        
         return sample;

    }

}

function jschisq(ssize,df){
    if(ssize <= 0 || df <= 0 || !Number.isInteger(df) || isNaN(parseFloat(ssize)) || 
    isNaN(parseFloat(df))){
        errorStream.push("@jschisq - One or more parameters out of range!")
        return -1
    } else{
        let itObj = itRange(ssize)
        let result = itObj.map(x => {
            let inst = jsnorm(df)
            warningStream = []
            inst = inst.map(x => x * x).reduce((x,y) => x+y)
            return inst        
    })
    
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        return result

    }
}

function jst(ssize,df){
    if(ssize <= 0 || df <= 0 || !Number.isInteger(df) || isNaN(parseFloat(ssize)) || 
    isNaN(parseFloat(df))){
        errorStream.push("@jst - One or more parameters out of range!")
        return -1
    } else{
        let itObj = itRange(ssize)
        let result = itObj.map(x => {
            let inst = jsnorm(1)
            let chi = Math.sqrt(jschisq(1,df) / df)
            warningStream = []
            return inst /chi       
    })
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        return result

    }

}


function jsf(ssize,df1,df2){
    if(ssize <= 0 || df1 <= 0 || df2 <= 0 || !Number.isInteger(df1) || !Number.isInteger(df2) || 
    isNaN(parseFloat(ssize)) || isNaN(parseFloat(df1)) || isNaN(parseFloat(df2))){
        errorStream.push("@jsf - One or more parameters out of range!")
        return -1
    } else{
        let itObj = itRange(ssize)
        let result = itObj.map(x => {
            let chi1 = jschisq(1,df1) / df1
            let chi2 = jschisq(1,df2) / df2
            warningStream = []
            return chi1 /chi2       
    })
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        return result

    }

}

function gammaIntHF(ssize,shape,scale){
    if(ssize <= 0 || scale <= 0 || shape <= 0 || !Number.isInteger(shape) || isNaN(parseFloat(ssize)) ||
    isNaN(parseFloat(shape)) || isNaN(parseFloat(scale))){
        errorStream.push("@gammaIntHF - One or more parameters out of range!")
        return -1
    } else{
            let itObj = itRange(ssize)
            let result = itObj.map(x => {
                let inst = jsexp(Math.floor(shape))
                warningStream = []
                inst = scale * inst.reduce((x,y) => x+y)
                return inst        
            })
            if(ssize < 10000){
                warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
            }
            return result
    } 
}

function GammaFindHF(delta){
    index = 0
        while(index < 1){
            let epsilon = 0
            let nu = 0
            let u = jsunif(1)
            let v = jsunif(1)
            let w = jsunif(1)
            warningStream = []
                    
            if(u <= Math.exp(1) / (Math.exp(1) + delta)){
                epsilon = v ** (1 / delta)
                nu = w * (epsilon ** (delta - 1))
            } else{
                epsilon = 1 - Math.log(v)
                nu = w * ((Math.exp(1)) ** (-epsilon))
            }
            if(nu <= (epsilon ** (delta - 1)) * (Math.exp(1) ** (-epsilon))){
                index = index + 1
                return epsilon
                
                
            }

        }
}

function gamma01decHF(ssize,shape,scale){
    if(ssize <= 0 || scale <= 0 || shape <= 0 || isNaN(parseFloat(ssize)) || isNaN(parseFloat(shape)) ||
    isNaN(parseFloat(scale))){
        errorStream.push("@gamma01decHF - One or more parameters out of range!")
        return -1
    } else{
        if(shape > 1){
            return "Use jsgamma instead"
        } else{

            let itObj = itRange(ssize)
            let result = itObj.map(x => {
                let y = scale * GammaFindHF(shape)
                return y       
            })
            if(ssize < 10000){
                warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
            }
            return result
        }
    }
}

function jsgamma(ssize,shape,scale){
    if(ssize <= 0 || scale <= 0 || shape <= 0 || isNaN(parseFloat(ssize)) || isNaN(parseFloat(shape)) ||
    isNaN(parseFloat(scale))){
        errorStream.push("@jsgamma - One or more parameters out of range!")
        return -1
    } else{
       
        if(shape < 1){
            return gamma01decHF(ssize,shape,scale)

        }else{
            dec_part = shape - Math.floor(shape)
            if(dec_part === 0){
                return gammaIntHF(ssize,shape,scale)
            } else{
            let sample = gammaIntHF(ssize,Math.floor(shape),scale)
            let samp2 = sample.map(function(x){
                return scale * GammaFindHF(dec_part)})
            sample = sample.map((num,idx) => num + samp2[idx])     
           
            return sample  
            }

        }
        
    }
}


function poissonPMF(x,lambda){
    if(isNaN(parseFloat(x)) || isNaN(parseFloat(lambda)) || x < 0 || lambda <= 0){
        errorStream.push("@poissonPMF - One or more parameters are invalid.")
        return -1
    } else{
        let prob = ((Math.exp(1) ** (-lambda)) * (lambda ** x)) / factorial(x)
        return prob

    }

}

function poissonCDF(x,lambda){
    if(isNaN(parseFloat(x)) || isNaN(parseFloat(lambda)) || x < 0 || lambda <= 0){
        errorStream.push("@poissonCDF - one or more parameters is invalid")
    } else{
        let itObj = itRange(x + 1)
        let result = itObj.map(x => poissonPMF(x,lambda)).reduce((x,y) => x + y)
        return result
    }
    
}

function poisexperimental(ssize,lambda){
    let itObj = itRange(ssize)
    let result = itObj.map(x => {
        index = 0;
        let i = 0
        let u = jsunif(1)
        let j = Math.floor(lambda)
        let p = 0 
        let c = poissonCDF(Math.floor(lambda),lambda)
        while(index < 1){
            
            if(u < c){
                if(i === 0){
                    p = poissonPMF(j,lambda)
                    
                }
                i = i + 1
                c = c - p
                if(u > c){
                    index = index + 1
                    
                    return j
                } else {
                    p = (j / lambda) * p
                    j = j - 1
                    
                    
                }
                
            } else{
                if(i===0){
                    p = poissonPMF(j + 1, lambda)
                    
                }
                i = i + 1
                c = c + p
                if(u<c){
                    
                    index = index + 1
                    
                    return j + 1
                } else {
                    p = p * (lambda / (j + 1))
                    j = j + 1
                    
                    
                }
    
            }
    
        }
        
               
    })
    
    return result

    
}


function jspois(ssize,lambda){
    if(ssize > 0 && lambda > 0 && !isNaN(parseFloat(ssize)) && !isNaN(parseFloat(lambda))){
        let itObj = itRange(ssize)
        let result = itObj.map(x => {
            let L = (Math.exp(1)) ** (-lambda)
            let p = 1
            let k = 0
            do{
                k++;
                p = p* Math.random()
            } while(p > L)
        
            return k - 1;        
        })
        
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        return result

    } else {
        errorStream.push("@jspois - One or more parameters is invalid")
        return -1
    }
}


function jsbeta(ssize, alpha, beta){
    if(!isNaN(parseFloat(ssize)) && !isNaN(parseFloat(alpha)) && !isNaN(parseFloat(beta)) &&
    ssize > 0 && alpha > 0 && beta > 0){
        let itObj = itRange(ssize)
        let result = itObj.map(x => {
            let g1 = jsgamma(1,alpha,1)
            let g2 = jsgamma(1,beta,1)
            warningStream = []
            return g1 / (g1**1 + g2**1)        
        })
        if(ssize < 10000){
            warningStream.push("Sample size is less than 10000. Be careful when carrying out inference!")
        }
        return result

    } else{
        errorStream.push("@jsbeta - one or more parameters is invalid")
        return -1
    }
    

}


function sqrt(x){
    if(x>=0){
        return Math.sqrt(x)
    } else{
        let constant = -x
        let result = Math.sqrt(constant)
        return(result.toString()+"i")
    }
}


/* The code below is used in the API to generate the user's requested random sample */

function CreateSample(dist_sel,sampSize,param){
    let result;
    switch (dist_sel) {
        case "Bernoulli":
            result = jsbernoulli(parseFloat(sampSize), parseFloat(param[0]))
            break;

        case "Beta":
            result = jsbeta(parseFloat(sampSize), parseFloat(param[0]),
                    parseFloat(param[1]))
            break;

        case "Binomial":
            result = jsbinom(parseFloat(sampSize), parseFloat(param[0]),
                parseFloat(param[1]))
            break;

        case "Chisq":
            result = jschisq(parseFloat(sampSize), parseFloat(param[0]))
            break;

        case "Unif":
            result = jsunif(parseFloat(sampSize), parseFloat(param[0]),
                parseFloat(param[1]))
            
            break;

        case "Exp":
            result = jsexp(parseFloat(sampSize), parseFloat(param[0]))
            break;

        case "F":
            result = jsf(parseFloat(sampSize), parseFloat(param[0]),
                parseFloat(param[1]))
            break;

        case "Gamma":
            result = jsgamma(parseFloat(sampSize), parseFloat(param[0]),
                parseFloat(param[1]))
            break;

        case "Lnorm":
            result = jslognorm(parseFloat(sampSize), parseFloat(param[0]),
                parseFloat(param[1]))
            break;

        case "Norm":
            result = jsnorm(parseFloat(sampSize), parseFloat(param[0]),
                parseFloat(param[1]))
            break;

        case "Pois":
            result = jspois(parseFloat(sampSize), parseFloat(param[0]))
            break;

        case "T":
            result = jst(parseFloat(sampSize), parseFloat(param[0]))
            break;

        case "Weibull":
            result = jsweibull(parseFloat(sampSize), parseFloat(param[0]),
                parseFloat(param[1]))
            break;

        default:
            break;
    }
    return result
}



