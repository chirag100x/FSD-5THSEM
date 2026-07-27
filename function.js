function greet(name) {
    console.log("Hello, " + name + "!");
}

greet("Alice");
greet("Bob");
// hoisting 
// a mechanism in JavaScript where variable and function declarations are conceptually moved to the top of their containing scope before code execution begins.
// example of hoisting
console.log(x); // undefined (not ReferenceError)
var x = 5;
console.log(x); // 5

// type of function
// 1. Named function
function add(a, b) {
    return a + b;
}

// 2. Anonymous function
const multiply = function(a, b) {
    return a * b;
};

// 3. Arrow function
const subtract = (a, b) => a - b;

// 4. Immediately Invoked Function Expression (IIFE)
(function() {
    console.log("This is an IIFE!");
})();

// 5. Function constructor
const divide = new Function('a', 'b', 'return a / b;');

// 6. Generator function
function* generatorFunction() {
    yield 1;
    yield 2;
    yield 3;
}

    