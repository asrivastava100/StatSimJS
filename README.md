# StatSimJS

StatSimJS is a Statistics library built in JavaScript

The main files can be found in the src folder (sim.js, comp.js and mat.js).

Copyright 2020 Anuj S.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

The library offers the following functions:

# Simulation

1. mean -- args(listNos)
 - takes in an array of numbers and returns the mean.
 
2. Var  -- args(listNos)
- takes in an array of numbers and returns the variance.

3. stdev -- args(listNos)
- takes in an array of numbers and returns the standard deviation.

4. factorial -- args(n)
- takes in an integer n > 0 and returns n!.

5. erf -- args(x)
- takes in a number x and returns the value of the Error function at this point.
- the numerical method used to compute this is adapted from: Abramowitz and Stegun. 
- Accuracy - Maximum error: 3*10^-7 Please see https://en.wikipedia.org/wiki/Error_function

6. erfInv -- args(x)
- takes in a number x and returns the value of the Inverse Error function at this point.
- a series expansion approach has been taken to approximate the value of the Inverse Error function.
- Warning: this function was tested with some values and there were some accuracy issues.
- Recommendation: This function should NOT be used until a better approximation method is implemented.

7. jsunif -- args(ssize,lower = 0, upper = 1) -- bounds(ssize > 0)
- returns 'ssize' realisations of continuous uniformly distributed random variables on the interval [lower,upper].
- Where lower and upper are not defined, the function returns ssize many U[0,1] random variables.

8. jsnorm -- args(ssize, mu = 0, sigma = 1) -- bounds(ssize > 0)
- returns 'ssize' realisations of normally distributed random variables with mean = mu and standard deviation = sigma.
- Where mu and sigma are not defined, the function returns ssize many N[0,1] random variables.

    8.1. normCDF -- args(x)
    - returns the probability: P(X <= x) where X ~ N(0,1)
    - This method may not return an accurate value since it makes use of erf(x). erf(x) is making use of estimation methods. See (5).

9. jslognorm -- args(ssize, mu = 0, sigma = 1) -- bounds(ssize > 0, sigma > 0)
- returns 'ssize' realisations of log-normal random variables with mean = mu and standard deviation = sigma.
- Where mu and sigma are not defined, the function returns ssize many LN[0,1] random variables.

10. jsexp -- args(ssize, lambda = 1) -- bounds(ssize > 0, lambda > 0
- returns 'ssize' realisations of exponentially distributed random variables with Lambda = lambda.
- where lambda is not defined, the function returns ssize many exp(1) random variables.

11. jsbernoulli -- args(ssize, p) -- bounds(ssize > 0, 0 <= p <= 1)
- returns 'ssize' realisations of bernoulli(p) distributed random variables.
- p is the probability of success.

12. jsbinomial -- args(ssize, n, p) -- bounds(ssize > 0, n > 0, 0 <= p <= 1) 
- returns 'ssize' realisations of binomial(n,p) distributed random variables.
- n is the number of bernoulli trials.
- p is the probability of success.

13. jsweibull -- args(ssize, scale, shape) -- bounds(ssize > 0, shape > 0, scale > 0)
- returns 'ssize' realisations of weibull(scale,shape) distributed random variables.

14. jschisq -- args(ssize, df) -- bounds(ssize > 0, df > 0)
- returns 'ssize' realisations of chi-square distributed random variables with degrees of freedom = df.

15. jst -- args(ssize, df) -- bounds(ssize > 0, df > 0)
- returns 'ssize' realisations of t distributed random variables with degrees of freedom = df. (Student's t-distribution).

16. jsf -- args(ssize, df1, df2) -- bounds(ssize > 0, df1 > 0, df2 > 0)
- returns 'ssize' realisations of F distributed random variables with degrees of freedom 1 = df1 and degrees of freedom 2 = df2.

17. jsgamma -- args(ssize, shape, scale) -- bounds(ssize > 0, shape > 0, scale > 0)
- returns 'ssize' realisations of gamma(shape,scale) distributed random variables.

18. jspois -- args(ssize, lambda) -- bounds(ssize > 0, lambda > 0)
- returns 'ssize' realisations of poisson(lambda) distributed random variables.

    - 18.1. poissonCDF -- args(x, lambda) -- bounds(x > 0 , lambda > 0)
        - returns the probability: P(X <= x) where X ~ Poisson(lambda)
    - 18.2. poissonPMF -- args(x, labmda) -- bounds(x > 0, lambda > 0)
        - returns the probability: P(X = x) where X ~ Poisson(lambda)

19. jsbeta -- args(ssize, alpha, beta) -- bounds(ssize > 0, alpha > 0, beta > 0)
- returns 'ssize' realisations of beta(alpha, beta) distributed random variables.

20. sqrt(x) -- args(x) 
- returns the value returned by Math.sqrt(x) if x >= 0 
- returns the string representation of the complex root. e.g. sqrt(-4) = 2i -- return type: string

# Matrix

- This module offers the Matrix class. An instance of this class can be created by passing a multi-dimensional array of numbers to the Matrix constructor.

- The following methods are available:

1. matAdd -- args(this, other) -- 'other' matrix must be of the same dimension as 'this'.
- returns a matrix whose entries are obtained by adding each entry of 'this' to each entry of 'other'.

2. matScalMult -- args(this,constant)
- returns a matrix whose entries are obtained by multiplying each entry by the scalar (constant).

3. matTranspose -- args(this)
- returns the transpose of this matrix. 

4. matMult -- args(this, other) -- the number of rows of 'other' must be equal to the number of cols of 'this'.
- returns the result of multiplying this with other. result matrix dimension is n x k where n is the number of rows of this and k is the number of columns of other.

5. matCholesky -- args(this) -- matrix must be a square matrix i.e. number of rows = number of columns.
- returns the Cholesky decomposition (Lower triangular matrix) if it exists.
- Note: a result should exist if the matrix is real and positive definite. However, in the event that this is not the case, this method might not find the result. In this case it is recommended to use other tools to find the Cholesky decomposition until this capability is added to the method. 
- Please see https://en.wikipedia.org/wiki/Cholesky_decomposition for more information on the method used to compute the Cholesky decomposition (The Cholesky–Banachiewicz and Cholesky–Crout algorithms).

6. RRE -- args(this) 
- returns the reduced row echelon form of the matrix. 

# Complex 

- This module offers the Complex class. An instance of this class can be created by passing two real numbers (one representing the real part and the other representing the imaginary part) to the Complex constructor.

- The following methods are available:

1. compAdd -- args(this,other)
- returns a complex number whose real part = this.real + other.real and whose imaginary part = this.imaginary + other.imaginary.

2. compScalarMult -- args(this, scalar)
- returns a complex number whose real part = scalar * this.real and whose imaginary part = scalar * this.imaginary.

3. compMult -- args(this, other)
- returns the result of multiplying complex number 'this' with complex number 'other'. -- Return type: Complex.

4. compConj -- args(this)
- returns the complex conjugate of 'this'. -- Return type: Complex.

5. compModulus -- args(this)
- returns the modulus of the complex number. -- Return type: Number.

6. compDivide -- args(this, other)
- returns the result of dividing complex number 'this' by complex number 'other'. -- Return type: Complex.

7. compDeMoivre -- args(this)
- returns the DeMoivre representation of the complex number. Return type: Object
- return object {"r": Modulus, "theta": Angle}

# API

- Users can use different sections of this library in their Express app. E.g. to include the sim.js file, include the following line of code in your index.js file: const sim = require('./src/sim.js'). Note: here you need to include the file path. In the example, sim.js is in the folder src.

- Each of the files (sim.js, comp.js, mat.js) has a simulation class (Simulation, MatSim, CompSim). The user creates a new instance of the simulation class and provides the data through the constructor. 

- Use the Run() method to run the simulation. You will now have access to a results object which you can use. 

# API - Simulation
(using sim.js)

- The Simulation class requires the following data: 
    - The name of the function you want to run (as string) e.g. 'jsbeta'
    - The parameters (excluding ssize) (as array) e.g [1,1]
    - Optional: WarnOn = true (by default) - This needs to be configured.- In the website for the library, this is used to send a message to the front end. It helps provide warnings on sample sizes <10000 and any errors encountered during simulation. 

- After running the Run() method the user has access to:
    - the sample (this.output)
    - the sample mean (this.mean)
    - the sample variance (this.Variance)
    - the error stream (this.estream)
    - the warning stream (this.wstream)

# API - Matrix
(using mat.js)

- The MatSim class requires the following data: 
    - Matrix 1 data (mat1Dat)
    - Optional: Matrix 2 data (mat2Dat) -- only required if using matAdd or matMult
    - Operation to perform (as string) (ops) -- e.g. 'MMULT'
        - NOTE: sometimes the method name may differ to the option select value. We recommend that you look at 'Important info about 'ops' variable' below. The 'ops' name should be used here.
    - Optional: Scalar (scalarM) -- only required if using matScalMult

- After running the Run() method the user has access to:
    - the result matrix (this.solution)
    - the error stream (this.estream)
    - the warning stream (this.wstream)

- Important info about 'ops' variable. (This will be resolved in a future release)

    - On the matrix page of the library website, a 'select' field is being used to get the requested matrix operation. Each option has a unique option value. This is not necessarily the same as the matrix method name. So there is a discrepancy between the method name and the 'ops' name being used above. Please see below for the 'ops' name to method name mapping.

- ops name -- method name

    - "matAdd" -- "matAdd"
    - "matScalMult" -- "matScalarMult"
    - "MMULT" -- "matMult"
    - "Transpose" -- "matTranspose"
    - "Cholesky" -- "matCholesky"
    - "RRE" -- "RRE"


# API - Complex
(using comp.js)

- The CompSim class requires the following data: 
    - Real part of first complex number (real1)
    - Imaginary part of first complex number (img1)
    - Optional: Real part of second complex number (real2)
    - Optional: Imaginary part of second complex number (img2)
    - Optional: Scalar 
   
- After running the Run() method the user has access to:
    - the solution vector (this.SolVec)
    - this.SolVec = {Add:resAdd,ScalM:resScalMult,CompM:resCompMult,CConj:resCompConj,Mod:resCompMod,CDiv:resCompDiv,Dem:resCompDem}
    - NOTE: where the second complex number is not provided, it is taken to be 0 + 0i in the calculations below.
    - Components of SolVec:
    - The result of addition between Complex 1 and Complex 2: Add
    - The result of scalar multiplication between the scalar and Complex 1: ScalM
    - The result of complex multiplication between Complex 1 and Complex 2: CompM
    - The Complex conjugate of Complex 1: CConj
    - The Modulus of Complex 1: Mod
    - The result of division of Complex 1 by Complex 2: CDiv
    - The DeMoivre representation of Complex 1: Dem

