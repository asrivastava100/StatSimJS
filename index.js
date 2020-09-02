const express = require('express');

const path = require('path');

const app = express();

app.use(express.json());
const sim = require('./src/sim.js');

app.use(express.static(path.join(__dirname,'public')));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.post('/api/', (req,res) =>{
    let s = new sim(req.body.distribution,req.body.sampleSize,req.body.parameters,false);
    s.Run() 
    let dataOut = {result:s.output,errorStream:s.estream,warnStream:s.wstream,mean:s.mean,variance:s.Variance};
    res.send(JSON.stringify(dataOut));
    
})

let Matsim = require('./src/mat.js');
app.post('/matrix/api/',(req,res) => {
    let m = new Matsim(req.body.mat1dat,req.body.mat2dat,req.body.operation,req.body.scalarM);
    m.Run();
   
    let datOutput = {solution:m.solution,errorStream:m.estream,warnStream:m.wstream};     
    res.send(JSON.stringify(datOutput));
})

const CompSim = require('./src/comp.js');

app.post('/complex/api/',(req,res) => {
    let CSim = new CompSim(req.body.realP1,req.body.imgP1,req.body.realP2,req.body.imgP2,req.body.scal);
    CSim.Run();
    let datOutput = CSim.SolVec;      
    res.send(JSON.stringify(CSim.SolVec));
})