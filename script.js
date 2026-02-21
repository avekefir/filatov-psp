window.onload = function(){ 
    let a = ''     
    let b = ''     
    let expressionResult = ''  
    let selectedOperation = null
    const outputElement = document.getElementById("result")
    const digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit;
            }
            outputElement.innerHTML = a;
        } 
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                outputElement.innerHTML = b;        
            }
        }
    }

    digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        selectedOperation = '/';
    }

    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        selectedOperation = null
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    document.getElementById("btn_op_sign").onclick = function(){
        if (selectedOperation === null){
            a = -a
            outputElement.innerHTML = a
        }
        else{
            if (b!==''){
                b = -b
                outputElement.innerHTML = b
            }   
        }
    }

    document.getElementById("btn_op_percent").onclick = function(){
        if (selectedOperation === null){
            a = a/100
            outputElement.innerHTML = a
        }
        else{
            b = b/100
            outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_op_backspace").onclick = function(){
        if (selectedOperation === null){
            a = outputElement.innerHTML
            if (a.length === 2 && a[0] === '-'){
                a = ''
                outputElement.innerHTML = 0
            }
            if(a.length > 1 && a !== ''){
                a = a.slice(0, a.length-1)
                outputElement.innerHTML = a
            }
            else{
                a = ''
                outputElement.innerHTML = 0
            }
        }
        else{
            b = outputElement.innerHTML
            if (b.length === 2 && b[0] === '-'){
                b = ''
                outputElement.innerHTML = 0
            }
            if (b.length > 1 && b !== ''){
                b = b.slice(0, b.length-1)
                outputElement.innerHTML = b
            }
            else{
                b = ''
                outputElement.innerHTML = 0
            }
        }
    }
    
    flag = true
    document.getElementById("btn-switch").onclick = function(){
        flag = !flag
        if (flag){
            document.body.style.backgroundColor = 'green';
        }
        else{
            document.body.style.backgroundColor = 'gray';
        }
    }

    document.getElementById("btn_op_sqrt").onclick = function(){
        if (selectedOperation === null){
            a = a**0.5;
            outputElement.innerHTML = a;
        }
        else{
            b = b**0.5;
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_square").onclick = function(){
        if (selectedOperation === null){
            a = a**2;
            outputElement.innerHTML = a;
        }
        else{
            b = b**2;
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_fact").onclick = function(){
        let res = 1;
        if (selectedOperation === null){
            for(let i = 1; i <= +a; i++){
                res *= i;
            }
            a = res;
            outputElement.innerHTML = a;
        }
        else{
            for(let i = 1; i <= +b; i++){
                res *= i;
            }
            b = res;
            outputElement.innerHTML = b;
        }
    }

    this.document.getElementById("btn_digit_000").onclick = function(){
        if (selectedOperation === null){
            a += '000';
            outputElement.innerHTML = a;
        }
        else{
            b += '000';
            outputElement.innerHTML = b;
        }
    }

    this.document.getElementById("btn_op_reverse").onclick = function(){
        if (selectedOperation === null){
            a = 1/a;
            outputElement.innerHTML = a;
        }
        else{
            b = 1/b;
            outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !selectedOperation)
            return
            
        switch(selectedOperation) { 
            case 'x':
                expressionResult = (+a) * (+b)
                break;
            case '+':
                expressionResult = (+a) + (+b)
                break;
            case '-':
                expressionResult = (+a) - (+b)
                break;
            case '/':
                expressionResult = (+a) / (+b)
                break;
            default:
                break;
        }
        
        a = expressionResult.toString()
        b = ''
        selectedOperation = null

        outputElement.innerHTML = a
    }
};