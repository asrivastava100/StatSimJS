
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

function CreateDiv(id,secTA,divClass){
    let div1 = document.createElement("div")
    div1.setAttribute("id",id)
    div1.setAttribute("class",divClass)
    secTA.appendChild(div1)
}

function CreateHeadingElem(i,inHtml,id,divTA){
    let temp = document.createElement("h"+ i.toString())
    temp.innerHTML = inHtml
    temp.setAttribute("id",id)
    divTA.appendChild(temp)
}

document.addEventListener('click',e => {
    
    if(e.target && e.target.id == "btn1"){
        let real1 = document.getElementById("real-1")
        let real2 = document.getElementById("real-2")
        let comp1 = document.getElementById("imaginary-1")
        let comp2 = document.getElementById("imaginary-2")
        let scalar = document.getElementById("scalar")

        if(isNaN(parseFloat(real1.value)) || isNaN(parseFloat(comp1.value))){
            alert("You must enter valid values for the first complex number!")
            return 
        }

        let reqObj = {realP1:parseFloat(real1.value), realP2:parseFloat(real2.value), imgP1:parseFloat(comp1.value), 
            imgP2:parseFloat(comp2.value), scal:parseFloat(scalar.value)}

        
        fetch('/complex/api',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(reqObj)
        })
        .then(response => response.json())
        .then(data => {

            let sec1 = document.createElement("section")
            sec1.setAttribute("id","Results")
            
            let cWrap = document.getElementById("contentWrap")
            cWrap.appendChild(sec1)
            
            let Results = document.getElementById("Results")
            
            CreateHeadingElem(1,"Addition:","rAddTitle",Results)
            CreateDiv("res1", Results,"compRes")
            let rAdd = document.getElementById("res1")
            CreateText("rAdd-real",rAdd)
            CreateHeadingElem(3,"+","adds1",rAdd)
            CreateText("rAdd-img",rAdd)
            CreateHeadingElem(3,"i","imgi1",rAdd)

            CreateHeadingElem(1,"Scalar mult:","rScalM",Results)
            CreateDiv("res2", Results,"compRes")
            let rScalM = document.getElementById("res2")
            CreateText("rScal-real",rScalM)
            CreateHeadingElem(3,"+","adds2",rScalM)
            CreateText("rScal-img",rScalM)
            CreateHeadingElem(3,"i","imgi2",rScalM)

            CreateHeadingElem(1,"Complex mult:","rCompM",Results)
            CreateDiv("res3", Results,"compRes")
            let rCompM = document.getElementById("res3")
            CreateText("rCompM-real",rCompM)
            CreateHeadingElem(3,"+","adds3",rCompM)
            CreateText("rCompM-img",rCompM)
            CreateHeadingElem(3,"i","imgi3",rCompM)

            CreateHeadingElem(1,"Complex conjugate:","rCompC",Results)
            CreateDiv("res4", Results,"compRes")
            let rCompC = document.getElementById("res4")
            CreateText("rCompC-real",rCompC)
            CreateHeadingElem(3,"+","adds4",rCompC)
            CreateText("rCompC-img",rCompC)
            CreateHeadingElem(3,"i","imgi4",rCompC)

            CreateHeadingElem(1,"Modulus:","rCompMod",Results)
            CreateDiv("res5", Results,"compRes")
            let rCompMod = document.getElementById("res5")
            CreateText("rCompMod-val",rCompMod)

            CreateHeadingElem(1,"Division:","rCompDiv",Results)
            CreateDiv("res6", Results,"compRes")
            let rCompDiv = document.getElementById("res6")
            CreateText("rCompDiv-real",rCompDiv)
            CreateHeadingElem(3,"+","adds6",rCompDiv)
            CreateText("rCompDiv-img",rCompDiv)
            CreateHeadingElem(3,"i","imgi6",rCompDiv)

            CreateHeadingElem(1,"DeMoivre:","rCompDM",Results)
            CreateDiv("res7", Results,"compRes")
            let rCompDM = document.getElementById("res7")
            CreateHeadingElem(3,"r:","rDeMoiv",rCompDM)
            CreateText("rCompDM-r",rCompDM)
            CreateHeadingElem(3,"theta","thetaDeMoiv",rCompDM)
            CreateText("rCompDM-theta",rCompDM)

            CreateDiv("W1",Results,"compRes")
            CreateHeadingElem(5, 
                "** The above results are for Complex number 1 with the exception of Addition, Complex mult. and Division.**",
                "warn1",Results)
            
            document.getElementById("rAdd-real").value = data.Add.real
            document.getElementById("rAdd-img").value = data.Add.imaginary
            document.getElementById("rScal-real").value = data.ScalM.real
            document.getElementById("rScal-img").value = data.ScalM.imaginary
            document.getElementById("rCompM-real").value = data.CompM.real
            document.getElementById("rCompM-img").value = data.CompM.imaginary
            document.getElementById("rCompC-real").value = data.CConj.real
            document.getElementById("rCompC-img").value = data.CConj.imaginary
            document.getElementById("rCompMod-val").value = data.Mod
            document.getElementById("rCompDiv-real").value = data.CDiv.real
            document.getElementById("rCompDiv-img").value = data.CDiv.imaginary
            document.getElementById("rCompDM-r").value = data.Dem.r
            document.getElementById("rCompDM-theta").value = data.Dem.theta
            let btnClear = document.getElementById("btn1")
            btnClear.setAttribute("id","btn2")
            btnClear.innerHTML = "Clear"
            })
        .catch(error => console.log("Error:",error))

        
    }
    
    
    
    if(e.target && e.target.id == "btn2"){
        document.getElementById("real-1").value = "" 
        document.getElementById("real-2").value = ""
        document.getElementById("imaginary-1").value = ""
        document.getElementById("imaginary-2").value = ""
        document.getElementById("scalar").value = ""
        document.getElementById("Results").remove()
        document.getElementById("btn2").setAttribute("id", "btn1")
        document.getElementById("btn1").innerHTML = "Compute"
    }
})
