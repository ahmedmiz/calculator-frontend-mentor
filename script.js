//  ------------constants------------ 
const links = document.querySelectorAll("link");
const toggleBtn = document.querySelectorAll("input");
const num = document.querySelectorAll("[data-num]");
const operatorBtn = document.querySelectorAll("[data-operator]");
const reset = document.querySelector("[data-reset]");
const equalBtn = document.querySelector("[data-output");
const preText = document.querySelector(".previous-operand");
const currText = document.querySelector(".current-operand");
const deleteBtn = document.querySelector("[data-delete]");


let oldValue;
let newValue;
let operator;
let ans;



//  -------- event listeners ---------
reset.addEventListener("click", resetFunction);
num.forEach(cell => {
    cell.addEventListener("click", numberClicked);
})
operatorBtn.forEach(ele => {
    ele.addEventListener("click", operatorFunction);
})
equalBtn.addEventListener("click", equalOut);
deleteBtn.addEventListener("click", deleteFunction);
toggleBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        themeChange(btn.value);
    });
})

//------theme function ----------

function themeChange(i) {
    if (i === "0") {
        links[2].setAttribute("href", "");
    } else {
        links[2].setAttribute("href", `css/theme${i}.css`);
    }
}


//  ------ reset function -------
function resetFunction() {
    currText.textContent = '0';
    preText.textContent = '';
}


//  -------- entering number function --------
function numberClicked() {
    let value = currText.innerText;
    if (value == 0)
        currText.innerText = this.innerText;
    else {
        currText.innerText = value + this.innerText;

    }
}
// ------- operator function ---------
function operatorFunction() {
    if (preText.innerText.length === 0 && currText.innerText.length !== 0) {
        operator = this.innerText;
        preText.innerText = currText.innerText + ' ' + this.innerText;
        currText.innerText = '';
    }
    else if (preText.innerText.length !== 0 && currText.innerText.length !== 0) {
        operatorOut(this.innerText);

    }
}

// ----- calc function ------
function calc() {
    oldValue = parseFloat(preText.innerText);
    newValue = parseFloat(currText.innerText);
    if (operator == "x")
        ans = oldValue * newValue;
    else if (operator == "/")
        ans = oldValue / newValue;
    else if (operator == "+")
        ans = oldValue + newValue;
    else if (operator == "-")
        ans = oldValue - newValue;

}

// ------equal button outPut-----
function equalOut() {
    calc();
    if (ans !== null ) {
        currText.innerText = ans;
        preText.innerText = '';
    }
}
// ----------- operator output -----------
function operatorOut(sign) {
    calc();
    if (ans !== null) {
        preText.innerText = ans + ' ' + sign;
        currText.innerText = '';
        operator = sign;

    }
}
// -------delete function --------
function deleteFunction() {
    if (currText.innerText === '0')
        return;
    else if (currText.innerText.length === 1)
        currText.innerText = '0';
    else {
        let NewText = currText.innerText.slice(0, -1);
        currText.innerText = NewText;
    }
}
