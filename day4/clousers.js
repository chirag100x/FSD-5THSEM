// wrote a code about clouser example 
function outerFunction(x) { 
    return function innerFunction(y) {
        return x + y;
    };
}

