
var myChart2

function CreateLabel(L_for,caption,divTA){
    let lbl1 = document.createElement("label")
    lbl1.setAttribute("for", L_for)
    lbl1.appendChild(document.createTextNode(caption))
    divTA.append(lbl1)

}

function CreateText(param_index,divTA){
    let txt1 = document.createElement("input")
    txt1.setAttribute("id", "param" + param_index.toString())
    txt1.setAttribute("type","text")
    divTA.appendChild(txt1)
}

function CreateBreak(id,divTA){
    let br1 = document.createElement("br")
    br1.setAttribute("id", id)
    divTA.appendChild(br1)

}    
    
function BtnCreate(divTA,inHTML,id){

    let btn_submit = document.createElement("button")
    btn_submit.className = "button"
    btn_submit.innerHTML = inHTML
    btn_submit.setAttribute("id", id)
    divTA.appendChild(btn_submit)

}

let selDist = ""

function selValUpdate(){
    
    if(document.contains(document.getElementById("dist-params"))){
        document.getElementById("dist-params").remove()
    } 
    if(document.contains(document.getElementById("btn1"))){
        document.getElementById("btn1").remove()
    } 

    if(document.contains(document.getElementById("br1"))){
        document.getElementById("br1").remove()
    } 

    if(document.contains(document.getElementById("expt1"))){
        document.getElementById("expt1").remove()
    }

    if(document.contains(document.getElementById("br2"))){
        document.getElementById("br2").remove()
    } 

    if(document.contains(document.getElementById("br3"))){
        document.getElementById("br3").remove()
    } 
   
    
   selDist = document.getElementById("dist-list").value;
   let div1 = document.querySelector("#params-sec") 
   let div2 = document.createElement("div")
   div2.setAttribute("id", "dist-params")

   let params_sel = getParams(selDist)
   if(params_sel.length != 0){
       let i = 0;
       for(i=0;i<params_sel.length;i++){
            let g = i + 1
            CreateLabel("param"+ g.toString(),params_sel[i],div2)
            CreateText(g,div2)
        }

        div1.appendChild(div2)
        CreateBreak("br1",div1)
        BtnCreate(div1,"Simulate","btn1")
   }

}

document.getElementById("dist-list").addEventListener('change', e => {
    selValUpdate()
})

/* Lines 88 to 95 (Fix for background color when exporting chart) have been adapted from:
https://stackoverflow.com/questions/43664722/how-to-save-chart-js-charts-as-image-without-black-background-using-
blobs-and-fi/53946660#53946660
*/
var backgroundColor = 'white';
Chart.plugins.register({
    beforeDraw: function(c) {
        var ctx = c.chart.ctx;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, c.chart.width, c.chart.height);
    }
})

function chartJSdev(id,context,Ctype,lblVec,datVec,bgCol,boCol){
    
    var ctx = document.getElementById(id).getContext(context);
    if(myChart2 != undefined){
       myChart2.chart.destroy()
    }
    myChart2 = new Chart(ctx, {
        type: Ctype,
        data: {
            labels: lblVec,
            datasets: [{
                label: 'Frequency',
                data: datVec,
                backgroundColor: bgCol,
                borderColor: boCol,
                fill:true,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio:false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

}

function PlotGen(dataA,sel_dist,param){
    let data1 = []
    let label1 = []
    let bin_no = 0
    let division = 0
    let bcgCol = []
    let borCol = []
    let colInd = 0
    
    switch(sel_dist){
        case "Bernoulli":
            label1 = []
            data1 = []
            let N0 = dataA.filter(x => x === 0).length
            let N1 = dataA.length - N0
            data1.push(N0)
            data1.push(N1)
            label1[0] = "0"
            label1[1] = "1"
            for(i = 0; i < data1.length;i++){
                colInd = i + 200
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }
            
            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)
            
            break;

        case "Beta":
            label1 = []
            data1 = []
            let sampBeta = dataA
            
            bin_no = 5*4 
            division = 0.2 / 4

            for(i =1;i < bin_no + 1;i++){
                data1.push(sampBeta.filter(x => division * (i-1) <= x &&
                x < (division*(i))).length)
                let xlabel =  Math.round(division * (i - 1) * 100)/100
                label1.push(xlabel.toString())
            }

            for(i = 0; i < data1.length;i++){
                colInd = i + 100
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)

            break;

        
        case "Binomial":
            label1 = []
            data1 = []
            bin_no = parseFloat(param[0]) + 1
            for(i = 1; i < bin_no + 1; i++){
                data1.push(dataA.filter(x => x === i - 1).length)
                let lblCap = i - 1
                label1.push(lblCap.toString())
            }
            
            for(i = 0; i < data1.length;i++){
                colInd = i + 150
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }
            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)
            break;

        
        
        case "Norm":
            label1 = []
            data1 = []
            let mean = parseFloat(param[0])
            let stdev = parseFloat(param[1])
            let sampNorm = dataA
            bin_no = 20
            division = (8 * stdev) / (bin_no - 2)
            data1.push(sampNorm.filter(x => x < (mean -4 * stdev)).length)
            label1.push('x<'+(mean -4 * stdev).toString())
            for(i =1;i < bin_no - 1;i++){
                data1.push(sampNorm.filter(x => ((mean -4 * stdev) + division * (i-1)) <= x &&
                x < ((mean -4 * stdev) + division*(i))).length)
                let ubound = Math.round(((mean -4 * stdev) + division * (i)) * 100) / 100
                let xlabel = ubound.toString() 
                label1.push(xlabel)
            }
            data1.push(sampNorm.filter(x => x >= (mean + 4 * stdev)).length)
            label1.push('x>'+(mean + 4 * stdev).toString())

            for(i = 0; i < data1.length;i++){
                colInd = i + 180
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","line",label1,data1,bcgCol,borCol)

            break;

        case "Chisq":

            label1 = []
            data1 = []
            let sampChi = dataA
            
            bin_no = 20*5*4 
            division = 0.2 / 4

            for(i =1;i < bin_no + 1;i++){
                data1.push(sampChi.filter(x => division * (i-1) <= x &&
                x < (division*(i))).length)
                let xlabel =  Math.round(division * (i - 1) * 100)/100
                label1.push(xlabel.toString())
            }

            for(i = 0; i < data1.length;i++){
                colInd = i + 100
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)

            break;

        case "Unif":
            label1 = []
            data1 = []
            let sampUnif = dataA
            let sampLen = parseFloat(param[1]) - parseFloat(param[0])
            
            bin_no = 5 * 4 * sampLen 
            let lowerUnif = parseFloat(param[0])
            division = 0.2 / 4

            for(i =1;i < bin_no + 1;i++){
                data1.push(sampUnif.filter(x => lowerUnif + (division * (i-1)) <= x &&
                x < lowerUnif + (division * i)).length)
                let xlabel =  Math.round(lowerUnif *100 + (division * (i - 1) * 100))/100
                label1.push(xlabel.toString())
            }
                
                
            for(i = 0; i < data1.length;i++){
                colInd = i + 100
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)

            break;

        case "Exp":
            label1 = []
            data1 = []
            let sampExp = dataA
            
            bin_no = 20*5*4 
            division = 0.2 / 4

            for(i =1;i < bin_no + 1;i++){
                data1.push(sampExp.filter(x => division * (i-1) <= x &&
                x < (division*(i))).length)
                let xlabel =  Math.round(division * (i - 1) * 100)/100
                label1.push(xlabel.toString())
            }

            for(i = 0; i < data1.length;i++){
                colInd = i + 100
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)

            break;

        case "F":
            label1 = []
            data1 = []
            let sampF = dataA
            
            bin_no = 20*5*4 
            division = 0.2 / 4

            for(i =1;i < bin_no + 1;i++){
                data1.push(sampF.filter(x => division * (i-1) <= x &&
                x < (division*(i))).length)
                let xlabel =  Math.round(division * (i - 1) * 100)/100
                label1.push(xlabel.toString())
            }

            for(i = 0; i < data1.length;i++){
                colInd = i + 100
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)

            break;

        case "Gamma":
            label1 = []
            data1 = []
            let sampGam = dataA
            
            bin_no = 20*5*4 
            division = 0.2 / 4

            for(i =1;i < bin_no + 1;i++){
                data1.push(sampGam.filter(x => division * (i-1) <= x &&
                x < (division*(i))).length)
                let xlabel =  Math.round(division * (i - 1) * 100)/100
                label1.push(xlabel.toString())
            }

            for(i = 0; i < data1.length;i++){
                colInd = i + 100
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)

            break;

        case "Lnorm":
            label1 = []
            data1 = []
            let sampLN = dataA
            
            bin_no = 20*5*4 
            division = 0.2 / 4

            for(i =1;i < bin_no + 1;i++){
                data1.push(sampLN.filter(x => division * (i-1) <= x &&
                x < (division*(i))).length)
                let xlabel =  Math.round(division * (i - 1) * 100)/100
                label1.push(xlabel.toString())
            }

            for(i = 0; i < data1.length;i++){
                colInd = i + 100
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)

            break;

        case "Pois":
            label1 = []
            data1 = []
            let lambda1 = parseFloat(param[0])
            for(i = 1; i < Math.round(5* Math.sqrt(lambda1)) + lambda1 + 1; i++){
                data1.push(dataA.filter(x => x === i - 1).length)
                let lblCap = i - 1
                label1.push(lblCap.toString())
            }
            
            for(i = 0; i < data1.length;i++){
                colInd = i + 150
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }
            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)
            break;

        case "T":
            label1 = []
            data1 = []
            let sampT = dataA
            bin_no = 40 
            division = 30 / (bin_no)
            for(i =1;i < bin_no - 1;i++){
                data1.push(sampT.filter(x => (-15 +  division * (i-1)) <= x &&
                x < (-15 + division*(i))).length)
                let ubound = Math.round((-15 + division * (i)) * 100) / 100
                let xlabel = ubound.toString() 
                label1.push(xlabel)
            }

            for(i = 0; i < data1.length;i++){
                colInd = i + 180
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","line",label1,data1,bcgCol,borCol)

            break;
        
        case "Weibull":
            label1 = []
            data1 = []
            let sampWei = dataA
            
            bin_no = 20*5*4 
            division = 0.2 / 4

            for(i =1;i < bin_no + 1;i++){
                data1.push(sampWei.filter(x => division * (i-1) <= x &&
                x < (division*(i))).length)
                let xlabel =  Math.round(division * (i - 1) * 100)/100
                label1.push(xlabel.toString())
            }

            for(i = 0; i < data1.length;i++){
                colInd = i + 100
                bcgCol.push('rgba(30,144,' + colInd.toString() + ',0.2)')
                borCol.push('rgba(30,144,' + colInd.toString() + ',1)')
                
            }

            chartJSdev("myChart","2d","bar",label1,data1,bcgCol,borCol)

            break;
        
        default:
            break;
     }
    
}

function getParams(dist){
    let parameter_list = []

    switch(dist){
        case "Bernoulli":
            parameter_list = ["Prob of success (n)"]
            break;
        
        case "Beta":
            parameter_list = ["Alpha","Beta"]
            break;

        case "Binomial":
            parameter_list = ["No. of trials (n)","Prob of success (p)"]
            break;

        case "Chisq":
            parameter_list = ["Degrees of freedom"]
            break;

        case "Unif":
            parameter_list = ["Lower", "Upper"]
            break;

        case "Exp":
            parameter_list = ["Lambda"]
            break;

        case "F":
            parameter_list = ["Degrees of freedom 1", "Degrees of freedom 2"]
            break;

        case "Gamma":
            parameter_list = ["Shape","Scale"]
            break;
        
        case "Lnorm":
            parameter_list = ["Mean","Standard deviation"]
            break;
        
        case "Norm":
            parameter_list = ["Mean","Standard deviation"]
            break;

        case "Pois":
            parameter_list = ["Lambda"]
            break;

        case "T":
            parameter_list = ["Degrees of freedom"]
            break;
        
        case "Weibull":
            parameter_list = ["Scale","Shape"]
            break;
        
        default:
            break;
            
    }

    return parameter_list

}

var resultStoreFExp
var sMean
var sVar


document.addEventListener('click', (e)=>{
    
    errorStream = []
    warningStream = []
    if(e.target && e.target.id === "btn1"){
        if(document.contains(document.getElementById("expt1"))){
            document.getElementById("expt1").remove()
        }
        if(document.contains(document.getElementById("br2"))){
            document.getElementById("br2").remove()
        } 
    
        if(document.contains(document.getElementById("br3"))){
            document.getElementById("br3").remove()
        } 
        resultStoreFExp = []
        sMean = 0
        sVar = 0
        let dist_sel = document.getElementById("dist-list").value
        let sampSize = parseFloat(document.getElementById("ssize").value)
        let nParam = getParams(dist_sel).length
        let i = 0;
        let paramVal = []
        for(i=0;i<nParam;i++){
            let g = i + 1
            paramVal.push(parseFloat(document.getElementById("param" + g.toString()).value))
        }
        
        let respObj = {distribution:dist_sel,sampleSize:sampSize,parameters:paramVal}
        
        fetch('/api/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(respObj),

        })
        .then(response => response.json())
        .then(data => {
            if(data.errorStream.length != 0){
                alert(data.errorStream[0])
            } else{
                if(data.warnStream.length != 0){
                    alert(data.warnStream[0])
                }
               
                PlotGen(data.result,respObj.distribution,respObj.parameters)
               setTimeout(x => alert("Sample Mean: " + data.mean + "\n" + "Sample Variance:" + data.variance),1000) 
                resultStoreFExp = data.result
                sMean = data.mean
                sVar = data.variance
                CreateBreak("br2",document.getElementById("params-sec"))

                CreateBreak("br3",document.getElementById("params-sec"))
                BtnCreate(document.getElementById("params-sec"),"Export","expt1")
                document.getElementById("expt1").style.display = "in-line"
            }
        })
        .catch((error) => {
            console.error('Error:',error);
            
        });

    }

    /* The lines 618 to 623 have been adapted from https://stackoverflow.com/questions/45611674/export-2d-
    javascript-array-to-excel-sheet

    I have changed the code to have all the data in one column instead of the row and column solution provided at the 
    URL above */

    if(e.target && e.target.id == "expt1"){
            
            exportToCsv = function() {
              var CsvString = "Mean:,\r\n" + sMean.toString() + ",\r\n" +"Variance:,\r\n" +sVar.toString() + ",\r\n" +
              "Data:,\r\n" ;
              resultStoreFExp.forEach(function(ColItem) {
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
           
            exportToCsv()

            function exportToJpeg(){
                var url=myChart2.toBase64Image();
                console.log(url)
                console.log(myChart2)
               
                var y = document.createElement("A");
                y.setAttribute("href", url);
                y.setAttribute("download","img1.jpeg");
                document.body.appendChild(y);
                y.click();
              }

            exportToJpeg()
    }
})
