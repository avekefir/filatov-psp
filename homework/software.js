export function ConcatArrays(...arrays){
    return arrays.flat().toString().replaceAll(',', ' ');
}

export function IsPalindrome(input){
    input = String(input);
    input = input.replaceAll(' ', '');
    input = input.toLowerCase();

    for (let i = 0; i < input.length/2; i++) {
        if (input[i] !== input[input.length-1-i]) {
            return false;
        }
    }
    return true;
}

export function IsPalindrome2(input){
    if (input === input.split('').reverse().join('')) return true;
    return false;
}