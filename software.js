window.onload = function(){ 
    let a = ''     
    let b = ''     
    let software_expressionResult = ''  
    let software_selectedOperation = null
    const software_outputElement = document.getElementById("result")
    const software_digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

    function software_onDigitButtonClicked(digit) {
        if (!software_selectedOperation) {
            if ((digit != '.') || (digit == '.' && !a.includes(digit))) { 
                a += digit;
            }
            software_outputElement.innerHTML = a;
        } 
        else {
            if ((digit != '.') || (digit == '.' && !b.includes(digit))) { 
                b += digit;
                software_outputElement.innerHTML = b;        
            }
        }
    }
        
    function factorial(n){
        if (n === 0) return 1;
        return n*factorial(n-1);
    }

    function software_poisson(){
        probability = (Math.pow(a, b)*Math.pow(Math.E, -a))/factorial(b);
        return probability;
    }

    software_digitButtons.forEach(button => {
        button.onclick = function() {
            const digitValue = button.innerHTML;
            software_onDigitButtonClicked(digitValue);
        }
    });

    document.getElementById("btn_op_mult").onclick = function() { 
        if (a === '') return;
        software_selectedOperation = 'x';
    }
    document.getElementById("btn_op_plus").onclick = function() { 
        if (a === '') return;
        software_selectedOperation = '+';
    }
    document.getElementById("btn_op_minus").onclick = function() { 
        if (a === '') return;
        software_selectedOperation = '-';
    }
    document.getElementById("btn_op_div").onclick = function() { 
        if (a === '') return;
        software_selectedOperation = '/';
    }
    document.getElementById("btn_op_poisson").onclick = function(){
        if (a === '') return;
        software_selectedOperation = 'poisson';
    }

    document.getElementById("btn_op_clear").onclick = function() { 
        a = ''
        b = ''
        software_selectedOperation = null
        software_expressionResult = ''
        software_outputElement.innerHTML = 0
    }

    document.getElementById("btn_op_sign").onclick = function(){
        if (software_selectedOperation === null){
            a = -a
            software_outputElement.innerHTML = a
        }
        else{
            if (b!==''){
                b = -b
                software_outputElement.innerHTML = b
            }   
        }
    }

    document.getElementById("btn_op_percent").onclick = function(){
        if (software_selectedOperation === null){
            a = a/100
            software_outputElement.innerHTML = a
        }
        else{
            b = b/100
            software_outputElement.innerHTML = b
        }
    }

    document.getElementById("btn_op_backspace").onclick = function(){
        if (software_selectedOperation === null){
            a = software_outputElement.innerHTML
            if (a.length === 2 && a[0] === '-'){
                a = ''
                software_outputElement.innerHTML = 0
            }
            if(a.length > 1 && a !== ''){
                a = a.slice(0, a.length-1)
                software_outputElement.innerHTML = a
            }
            else{
                a = ''
                software_outputElement.innerHTML = 0
            }
        }
        else{
            b = software_outputElement.innerHTML
            if (b.length === 2 && b[0] === '-'){
                b = ''
                software_outputElement.innerHTML = 0
            }
            if (b.length > 1 && b !== ''){
                b = b.slice(0, b.length-1)
                software_outputElement.innerHTML = b
            }
            else{
                b = ''
                software_outputElement.innerHTML = 0
            }
        }
    }
    
    flag = true
    document.getElementById("btn-switch").onclick = function(){
        flag = !flag
        if (flag){
            document.body.style.backgroundColor = 'white';
        }
        else{
            document.body.style.backgroundColor = 'black';
        }
    }

    document.getElementById("btn_op_sqrt").onclick = function(){
        if (software_selectedOperation === null){
            a = a**0.5;
            software_outputElement.innerHTML = a;
        }
        else{
            b = b**0.5;
            software_outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_square").onclick = function(){
        if (software_selectedOperation === null){
            a = a**2;
            software_outputElement.innerHTML = a;
        }
        else{
            b = b**2;
            software_outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_fact").onclick = function(){
        let res = 1;
        if (software_selectedOperation === null){
            for(let i = 1; i <= +a; i++){
                res *= i;
            }
            a = res;
            software_outputElement.innerHTML = a;
        }
        else{
            for(let i = 1; i <= +b; i++){
                res *= i;
            }
            b = res;
            software_outputElement.innerHTML = b;
        }
    }

    this.document.getElementById("btn_digit_000").onclick = function(){
        if (software_selectedOperation === null){
            a += '000';
            software_outputElement.innerHTML = a;
        }
        else{
            b += '000';
            software_outputElement.innerHTML = b;
        }
    }

    this.document.getElementById("btn_op_reverse").onclick = function(){
        if (software_selectedOperation === null){
            a = 1/a;
            software_outputElement.innerHTML = a;
        }
        else{
            b = 1/b;
            software_outputElement.innerHTML = b;
        }
    }

    document.getElementById("btn_op_equal").onclick = function() { 
        if (a === '' || b === '' || !software_selectedOperation)
            return
            
        switch(software_selectedOperation) { 
            case 'x':
                software_expressionResult = (+a) * (+b)
                break;
            case '+':
                software_expressionResult = (+a) + (+b)
                break;
            case '-':
                software_expressionResult = (+a) - (+b)
                break;
            case '/':
                software_expressionResult = (+a) / (+b)
                break;
            case 'poisson':
                software_expressionResult = software_poisson();
                break;
            default:
                break;
        }
        
        a = software_expressionResult.toString()
        b = ''
        software_selectedOperation = null

        software_outputElement.innerHTML = a
    }
};