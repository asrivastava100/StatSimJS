
function CreateLabel(L_for,caption,divTA){
    let lbl1 = document.createElement("label")
    lbl1.setAttribute("for", L_for)
    lbl1.appendChild(document.createTextNode(caption))
    divTA.append(lbl1)
}

function CreateText(id,divTA){
    let txt1 = document.createElement("input")
    txt1.setAttribute("id",id)
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
    btn_submit.setAttribute("id",id)
    divTA.appendChild(btn_submit)

}

function CreateDiv(id,secTA){
    let div1 = document.createElement("div")
    div1.setAttribute("id",id)
    secTA.appendChild(div1)
}

function ClearCanvas(){
    
    if(document.contains(document.getElementById("matIO"))){
        document.getElementById("matIO").remove()
    }

    if(document.contains(document.getElementById("btn1"))){
        document.getElementById("btn1").remove()
    }
    if(document.contains(document.getElementById("btn2"))){
        document.getElementById("btn2").remove()
    }

    if(document.contains(document.getElementById("btn3"))){
        document.getElementById("btn3").remove()
    }

    if(document.contains(document.getElementById("br1"))){
        document.getElementById("br1").remove()
    }

    if(document.contains(document.getElementById("br2"))){
        document.getElementById("br2").remove()
    }
    if(document.contains(document.getElementById("br3"))){
        document.getElementById("br3").remove()
    }

    if(document.contains(document.getElementById("scalMult"))){
        document.getElementById("scalMult").remove()
    }

    if(document.contains(document.getElementById("mat-2-dim"))){
        document.getElementById("mat-2-dim").remove()
    }
}

function selValUpdate(){
    ClearCanvas()

    let opSelect = document.getElementById("op-list").value
    let rows = parseInt(document.getElementById("rows").value)
    let cols = parseInt(document.getElementById("cols").value)

    if(opSelect != "blank"){
     
        if(isNaN(rows)|| isNaN(cols) || rows <= 0 || cols <= 0){
            alert("Data entered is not valid!")
            document.getElementById("op-list").value = ""
            return    
        }
       
        let sec1 = document.createElement("section")
        sec1.setAttribute("id","matIO")
        
        let cWrap = document.getElementById("contentWrap")
        cWrap.appendChild(sec1)

        let mat1Title = document.createElement("h1")
        mat1Title.innerHTML = "Matrix 1"
        mat1Title.setAttribute("id","mat1Title")
        document.getElementById("matIO").appendChild(mat1Title)
        
        let matIO = document.getElementById("matIO")
        CreateDiv("mat1", matIO)
        
        let mat1 = document.getElementById("mat1")

        let i = 0;
        let j = 0;

        for(i = 1; i <= rows; i++){
            CreateDiv("M1r" + i.toString(),mat1)
        }

        for(i = 1; i <= rows; i++){
            let r_ind = document.getElementById("M1r"+i.toString())
            for(j = 1; j <= cols; j++){
                CreateText("Matrix1-" + i.toString()+ j.toString(),r_ind)
            }
        }
    }
    
    if(opSelect == "matAdd"){
        let mat2Title = document.createElement("h1")
        mat2Title.innerHTML = "Matrix 2"
        mat2Title.setAttribute("id","mat2Title")
        document.getElementById("matIO").appendChild(mat2Title)
        
        CreateDiv("mat2",document.getElementById("matIO"))
        let mat2 = document.getElementById("mat2")
        
        for(i = 1;i <= rows; i++){
            CreateDiv("M2r" + i.toString(),mat2)
        }

        for(i = 1; i <= rows; i++){
            let r_ind = document.getElementById("M2r"+i.toString())
            for(j = 1; j <= cols; j++){
                CreateText("Matrix2-" + i.toString() + j.toString(),r_ind)
            }
        }
    }
    
    if(opSelect == "matScalMult"){
        CreateDiv("scalMult",document.getElementById("params-sec"))
        CreateLabel("scalMultTxt","Scalar:",document.getElementById("scalMult"))
        CreateText("scalMultTxt",document.getElementById("scalMult"))
    }

    if(opSelect == "MMULT"){
        CreateDiv("mat-2-dim",document.getElementById("params-sec"))
        
        CreateLabel("mat2NrowTxt","Matrix 2 - Number of rows:",document.getElementById("mat-2-dim"))
        CreateText("mat2NrowTxt",document.getElementById("mat-2-dim"))
        
        CreateLabel("mat2NcolTxt","Matrix 2 - Number of columns:",document.getElementById("mat-2-dim"))
        CreateText("mat2NcolTxt",document.getElementById("mat-2-dim"))
        
        CreateBreak("br2",document.getElementById("params-sec"))
        
        BtnCreate(document.getElementById("params-sec"),"Add Matrix 2","btn2")
        
        CreateBreak("br3",document.getElementById("params-sec"))
        
        document.getElementById("mat2NrowTxt").value = document.getElementById("cols").value
    }
       
    if(opSelect != "blank" && opSelect != "MMULT"){
        CreateBreak("br1",document.getElementById("params-sec"))
        BtnCreate(document.getElementById("params-sec"),"Calculate","btn1")
    }
}

document.addEventListener('click', (e)=>{
    let opSelect = document.getElementById("op-list").value
    let rows = parseInt(document.getElementById("rows").value)
    let cols = parseInt(document.getElementById("cols").value)
    let mat1Data = []

    if(e.target && e.target.id === "btn1"){
        for(let i = 1; i <= rows; i++){
            let temp = []
            for(let j = 1; j<= cols; j++){
                temp.push(parseFloat(document.getElementById("Matrix1-" + i.toString()
                + j.toString()).value))
            }
            mat1Data.push(temp)
            
        }
        
        var mat2Data = []

        if(opSelect === "matAdd"){    
            mat2Data = []
            for(let i = 1; i <= rows; i++){
                let temp1 = []
                for(let j = 1; j<= cols; j++){
                    temp1.push(parseFloat(document.getElementById("Matrix2-" + i.toString()
                    + j.toString()).value))
                }
                mat2Data.push(temp1)
            }
        }

        if(opSelect == "MMULT"){
            mat2Data = []
            for(let i = 1; i <= parseInt(document.getElementById("mat2NrowTxt").value); i++){
                let temp1 = []
                for(let j = 1; j<= parseInt(document.getElementById("mat2NcolTxt").value); j++){
                    temp1.push(parseFloat(document.getElementById("Matrix2-" + i.toString()
                    + j.toString()).value))
                }
                mat2Data.push(temp1)
            }
        }
        
        let scalM 
       
        if(opSelect == "matScalMult") {
            scalM = parseFloat(document.getElementById("scalMultTxt").value)
            mat2Data.push([NaN])
        }

        if(opSelect == "Cholesky" || opSelect == "Transpose" || opSelect == "RRE"){
            mat2Data.push([NaN])
        }
        
        let reqObj = {operation:opSelect, mat1dat:mat1Data,mat2dat:mat2Data,
            scalarM:scalM}
        
        fetch('/matrix/api',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqObj)
        })
        .then(response => response.json())
        .then(data => {if(data.errorStream.length != 0){
            alert(data.errorStream[0])
            let btnClear = document.getElementById("btn1")
            btnClear.id = "btn3"
            btnClear.innerHTML = "Clear"
        } else{
            
            document.getElementById("mat1Title").innerHTML = "Result"
            if(document.contains(document.getElementById("mat2"))){
                document.getElementById("mat2").remove()
                document.getElementById("mat2Title").remove()
            }
            
            if(opSelect != "MMULT" && opSelect != "Transpose"){
                for(let i = 1; i <= rows; i++){
                    for(let j = 1; j<= cols; j++){
                        document.getElementById("Matrix1-" + i.toString()+ j.toString()).value = data.solution.dat[i-1][j-1]  
                    }
                }
            } else{
                
                var resCol
                var resRow

                document.getElementById("matIO").remove()
                let sec1 = document.createElement("section")
                sec1.setAttribute("id","matIO")
    
                let cWrap = document.getElementById("contentWrap")
                cWrap.appendChild(sec1)

                if(opSelect == "MMULT"){
                    resCol = document.getElementById("mat2NcolTxt").value
                    resRow = document.getElementById("rows").value
                }else{
                    
                    resCol = document.getElementById("rows").value
                    resRow = document.getElementById("cols").value
                }
                
                let mat1Title = document.createElement("h1")
                mat1Title.innerHTML = "Result"
                mat1Title.setAttribute("id","mat1Title")
                document.getElementById("matIO").appendChild(mat1Title)
                
                CreateDiv("mat1",document.getElementById("matIO"))
                
                let mat1 = document.getElementById("mat1")
                let i = 0;
                let j = 0;

                for(i = 1;i <= resRow; i++){
                    CreateDiv("M1r" + i.toString(),mat1)
                }
                for(i = 1; i <= resRow; i++){
                    let r_ind = document.getElementById("M1r"+i.toString())
                    for(j = 1; j <= resCol; j++){
                        CreateText("Matrix1-" + i.toString()+ j.toString(),r_ind)
                        document.getElementById("Matrix1-" + i.toString()+ j.toString()).value = data.solution.dat[i-1][j-1]
                    }
                }  
            }
            
            let btnClear = document.getElementById("btn1")
            btnClear.id = "btn3"
            btnClear.innerHTML = "Clear"
        }
    })
    .catch(error => {
        console.log("Error:",error )
    })
    }

    if(e.target && e.target.id === "btn2"){
        
        if(isNaN(parseInt(document.getElementById("mat2NrowTxt").value))|| 
        isNaN(parseInt(document.getElementById("mat2NcolTxt").value))){
            alert("Data entered is not valid!")
            
        } else{
            if(document.contains(document.getElementById("Matrix2-11"))) {
                alert("Matrix has already been added!")
                return
            }
            if(!document.contains(document.getElementById("btn1"))){
                CreateBreak("br1",document.getElementById("params-sec"))
                BtnCreate(document.getElementById("params-sec"),"Calculate","btn1")
            }
           
            let nrows = parseInt(document.getElementById("mat2NrowTxt").value)
            let ncols = parseInt(document.getElementById("mat2NcolTxt").value)

            let mat2Title = document.createElement("h1")
            mat2Title.innerHTML = "Matrix 2"
            mat2Title.setAttribute("id","mat2Title")
            document.getElementById("matIO").appendChild(mat2Title)

            CreateDiv("mat2",document.getElementById("matIO"))
            let mat2 = document.getElementById("mat2")
            
            for(let i = 1; i <= nrows; i++){
                CreateDiv("M2r" + i.toString(),mat2)
            }
            for(i = 1; i <= nrows; i++){
                let r_ind = document.getElementById("M2r"+i.toString())
                for(j = 1; j <= ncols; j++){
                    let txt1 = document.createElement("input")
                    txt1.setAttribute("id", "Matrix2-" + i.toString() + j.toString())
                    txt1.setAttribute("type","text")
                    r_ind.appendChild(txt1)
                }
        
            }

            if(document.contains(document.getElementById("br2"))){
                document.getElementById("br2").remove()
            }
            if(document.contains(document.getElementById("br3"))){
                document.getElementById("br3").remove()
            }
            document.getElementById("btn2").remove()

        }
    }

    if(e.target && e.target.id == "btn3"){
        ClearCanvas()
        document.getElementById("op-list").value = ""
        document.getElementById("rows").value = ""
        document.getElementById("cols").value = ""    
    }
})


