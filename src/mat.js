module.exports = class MatSim{
    constructor(mat1Dat,mat2Dat = null,ops,scalarM = null){
        this.mat1Dat = mat1Dat
        this.mat2Dat = mat2Dat
        this.ops = ops
        this.scalarM = scalarM

    }

    Run(){
        errorStream = []
        warningStream = []
        let matrix1 = new Matrix(this.mat1Dat)
        let matrix2 = new Matrix(this.mat2Dat)
        
        let result
        
        switch(this.ops){
            case "matAdd":
                result = matrix1.matAdd(matrix2)
                break;
            case "blank":
                result = -1
                break;
            case "matScalMult":
                result = matrix1.matScalarMult(this.scalarM)
                break;
            case "MMULT":
                result = matrix1.matMult(matrix2)
                break;
            case "Transpose":
                result = matrix1.matTranspose()
                break;
            case "Cholesky":
                result = matrix1.matCholesky()
                break;
            case "RRE":
                result = matrix1.RRE()
                break;
        }

        this.solution = result
        this.estream = errorStream
        this.wstream = warningStream
    }
}

var errorStream = []
var warningStream = []

class Matrix{
    constructor(dat){
        this.dat = dat
        this.nrow = dat.length
        this.ncol = dat[0].length
        
    }

    matAdd(other){
        if(this.nrow != other.nrow || this.ncol != other.ncol){
           errorStream.push("@matAdd - Matrices are incompatible!")
            return -1
        } else{

            let i = 0
            let j = 0
            let data = []
            let temp = []
            for(i=0;i<this.nrow;i++){
                for(j=0;j<this.ncol;j++){
                    temp.push(this.dat[i][j] + other.dat[i][j])       
                }
                data.push(temp)
                temp = []
            }
            let result = new Matrix(data)
            return result

        }

    }

    matScalarMult(constant){
        let i = 0
        let j = 0
        let data = []
        let temp = []
        for(i=0;i<this.nrow;i++){
            for(j=0;j<this.ncol;j++){
                temp.push(this.dat[i][j] * constant)       
            }
            data.push(temp)
            temp = []
        }
        let result = new Matrix(data)
        return result


    }


    matTranspose(){
        let i = 0
        let j = 0
        let data = []
        let temp = []
        let index = 0
        while(index < this.ncol){
            for(j=0;j<this.nrow;j++){
                temp.push(this.dat[j][index])
            }
            data.push(temp)
            temp = []
            index = index + 1
        }
        let result = new Matrix(data)
        return result
    }



    matMult(other){
        if(this.ncol != other.nrow){
            errorStream.push("Matrices are incompatible!");
            return -1
        } else{
            let row = this.nrow
            let col = other.ncol
            let minCR = Math.min(this.ncol,other.nrow)
            let i = 0
            let j = 0
            let k = 0
            let data = []
            let temp = []
            let temp2 = []
            
            for(i=0;i<row;i++){
                for(j=0;j<col;j++){
                    for(k=0;k<minCR;k++){
                        temp2.push(this.dat[i][k] * other.dat[k][j])
                        
                        }
                         temp.push(temp2.reduce((x,y)=>x+y))
                         temp2 = []
                }
                data.push(temp)
                temp = []
            }

            let result = new Matrix(data)
            return result
        }

    }

    matCholesky(){
        if(this.nrow != this.ncol){
            errorStream.push("@matCholesky - No Cholesky decomposition")
            return -1
        } else{
            
            let i = 0
            let j = 0
            let k = 0
            let data = []
            let temp = []
            let sumStore = []
            
            for(i = 0; i < this.nrow; i++){
                for(j = 0; j < this.ncol; j++){
                    temp.push(0)       
                }
                data.push(temp)
                temp = []
            }
            
            let result = new Matrix(data)
        
            for(i = 0; i < this.nrow; i++){
                for(j = 0; j <= i; j++){
                    if(i === j){
                        let test = j-1
                        if(test >= 0){
                            for(k = 0;k <= j-1; k++){
                                sumStore.push(result.dat[j][k]**2)
                            }
                            result.dat[i][j] = Math.sqrt(this.dat[i][j]-sumStore.reduce((x,y) => x + y))
                            if(isNaN(result.dat[i][j])){
                                errorStream.push("The algorithm could not find a cholesky decomposition. One may exist!")
                            }
                            sumStore = []
                        } else{
                            result.dat[i][j] = Math.sqrt(this.dat[i][j])
                            if(isNaN(result.dat[i][j])){
                                errorStream.push("The algorithm could not find a cholesky decomposition. One may exist!")
                            }
                        }      
                    } else{
                        let test = j-1
                        if(test >= 0 && i > j){
                            for(k = 0; k <= j-1; k++){
                                sumStore.push(result.dat[i][k]*result.dat[j][k])
                            }
                            result.dat[i][j] = (this.dat[i][j]-sumStore.reduce((x,y) => x + y)) * 
                            (1 / result.dat[j][j])
                            sumStore = []
                            if(isNaN(result.dat[i][j])){
                                errorStream.push("The algorithm could not find a cholesky decomposition. One may exist!")
                            }     
                        } else{
                            if(i > j){
                                result.dat[i][j] = (this.dat[i][j]) * (1 / result.dat[j][j])
                                if(isNaN(result.dat[i][j])){
                                    errorStream.push("The algorithm could not find a cholesky decomposition. One may exist!")
                                }
                            }   
                        }
                    }     
                }
            }
            return result       
        }
    }   
    

    RRE(){

        let rows = this.nrow
        let cols = this.ncol
        let minOfRC = Math.min(rows,cols)
        let i = 0      
        let result = new Matrix(this.dat)
            
        
        
        for(i = 0; i < minOfRC; i++){
            RRE_1row(result,i,rows,cols)
        }
        return result
    }
}


// The function RRE_1row is a dependency of the RRE method of the matrix class. It should not be used on its own.
// DO NOT DELETE!

function RRE_1row(result,row_index,numRow,numCol){
    if(result.dat[row_index][row_index] != 0 && result.dat[row_index][row_index] != 1){
        let divisor = result.dat[row_index][row_index]

        for(let i = 0; i < numCol; i++){
            result.dat[row_index][i] = result.dat[row_index][i] / divisor
        }
    }
    if(result.dat[row_index][row_index] != 0){
        
        for(let i = 0; i < numRow; i++){
            if(i == row_index) {continue;}
            let multiplier = result.dat[i][row_index]
            for(let j = 0; j < numCol; j++){
                result.dat[i][j] = result.dat[i][j] - multiplier * result.dat[row_index][j] 
            }    
        }
    }  
}



// function can be used instead of new Matrix -- could be useful if you are running this library in node.

function createMatrix(data){
    let i = 0
    let indicator = 0
    let testLength = data[0].length

    for(i = 0; i < data.length; i++){
        if(data[i].length != testLength){
            indicator = 1
        } 
    }
    if(indicator === 0){
        let result = new Matrix(data)
        return result
    } else{
        return "Check that the matrix has the same number of elements per row!"
    }   
}



