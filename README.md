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

    18.1. poissonCDF -- args(x, lambda) -- bounds(x > 0 , lambda > 0)
    - returns the probability: P(X <= x) where X ~ Poisson(lambda)
    18.2. poissonPMF -- args(x, labmda) -- bounds(x > 0, lambda > 0)
    - returns the probability: P(X = x) where X ~ Poisson(lambda)

19. jsbeta -- args(ssize, alpha, beta) -- bounds(ssize > 0, alpha > 0, beta > 0)
- returns 'ssize' realisations of beta(alpha, beta) distributed random variables.

20. sqrt(x) -- args(x) 
- returns the value returned by Math.sqrt(x) if x >= 0 
- returns the string representation of the complex root. e.g. sqrt(-4) = 2i -- return type: string

# Matrix

- 



