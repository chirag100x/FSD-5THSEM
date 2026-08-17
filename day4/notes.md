## Scope chaining

- **What:** The process the JavaScript engine uses to resolve an identifier: it first looks in the current (innermost) lexical environment, then in outer environments, continuing outward until the global environment.
- **Why it matters:** Allows nested functions to access variables defined in outer scopes.

```javascript
function outer() {
	const a = 1;
	function inner() {
		const b = 2;
		console.log(a + b); // 3 — `inner` finds `a` via the scope chain
	}
	inner();
}
```

## Lexical environment

- **What:** An internal record that pairs identifiers (variable and function names) with their values for a particular execution context (global, function, block).
- **Key point:** Lexical environments are created at definition/execution time and determine which variables are visible based on where code is written (lexical scoping), not where it's called.

```javascript
const x = 10;
function f() {
	const x = 20; // new lexical environment for `f`
	function g() {
		return x; // refers to `x` in `f`'s lexical environment (20)
	}
	return g;
}
const fn = f();
fn(); // 20
```

## Closures

- **What:** A closure is a function together with the lexical environment in which it was created. That environment lets the function access variables from its outer scopes even after those outer functions have finished executing.
- **Common uses:** data privacy, factories, partial application, memoization.

```javascript
function makeCounter() {
	let count = 0;
	return function () { // this inner function closes over `count`
		count += 1;
		return count;
	};
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```

- **Notes:**
	- Closures retain references to variables, so they can keep data alive — useful but can increase memory usage if held indefinitely.
	- Use `let`/`const` in loops to avoid common closure pitfalls with `var`.

## Currying

- **What:** Currying transforms a function that takes multiple arguments into a sequence of functions each taking one or fewer arguments. Each call returns a new function expecting the remaining arguments until all are supplied.
- **Why:** Enables partial application, improves reusability and composition of small utilities.

```javascript
// simple manual curry
function add(a) {
	return function (b) {
		return a + b;
	};
}
const add5 = add(5);
add5(3); // 8

// generic curry helper
function curry(fn) {
	return function curried(...args) {
		if (args.length >= fn.length) return fn(...args);
		return function (...next) {
			return curried(...args, ...next);
		};
	};
}

const mul = (a, b, c) => a * b * c;
const curriedMul = curry(mul);
curriedMul(2)(3)(4); // 24
curriedMul(2, 3)(4); // 24
```

- **Notes:**
	- Currying is distinct from partial application but often used together: currying changes function shape; partial application fixes arguments.
	- Utility libraries like Ramda or Lodash/fp provide tested curry helpers.

