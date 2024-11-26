//Curry funktion
function curry(fn, arg1) {
    return function(arg2) {
        return fn(arg1, arg2);
    };
}

// Beispiel-Funktionen
 function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

// Beispiele zur Nutzung
const add3 = curry(add, 3);
console.log(add3(4)); // Ausgabe: 7

const mul5 = curry(mul, 5);
console.log(mul5(6)); // Ausgabe: 30

//Funktion inc*****************************************************************

function applyf(fn) {
    return function(x) {
        return function(y) {
            return fn(x, y);
        };
    };
}


// Beispiel: Binäre add-Funktion
function add(a, b) {
    return a + b;
}

// Implementierung von inc
const inc = applyf(add)(1);

console.log(inc(5)); // Ausgabe: 6
console.log(inc(10)); // Ausgabe: 11

//Methode von Methodize***************************************************
function methodize(fn) {
    return function(y) {
        return fn(this, y);
    };
}

// Beispiel: Binäre Funktionen*********************************************
function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

// Anwendung auf Number.prototype
Number.prototype.add = methodize(add);
Number.prototype.mul = methodize(mul);

// Beispiele
console.log((3).add(4)); // Ausgabe: 7
console.log((5).mul(6)); // Ausgabe: 30

//Methode demethodize******************************************************
function demethodize(method) {
    return function(x, y) {
        return method.call(x, y);
    };
}

// Beispiel: Anwendung auf eine Methode
Number.prototype.add = function(y) {
    return this + y;
};

// Umwandlung in eine binäre Funktion
const add = demethodize(Number.prototype.add);

// Beispiele
console.log(add(5, 6)); // Ausgabe: 11
console.log(add(10, 15)); // Ausgabe: 25

//Methode Twice*****************************************************************
function twice(fn) {
    return function(x) {
        return fn(x, x);
    };
}

// Beispiel: Binäre Funktionen
function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

// Verwendung von twice
const double = twice(add);
const square = twice(mul);

// Beispiele
console.log(double(11)); // Ausgabe: 22 (add(11, 11))
console.log(square(11)); // Ausgabe: 121 (mul(11, 11))

//Methode composeu************************************************************
function composeu(f1, f2) {
    return function(x) {
        return f2(f1(x));
    };
}

// Beispiel: Unäre Funktionen
function double(x) {
    return x * 2;
}

function square(x) {
    return x * x;
}

// Verwendung von composeu
const composedFunction = composeu(double, square);

// Beispiel
console.log(composedFunction(3)); // Ausgabe: 36 (double(3) -> 6, square(6) -> 36)

//Methode composeb*******************************************************************
function composeb(f1, f2) {
    return function(x, y, z) {
        return f2(f1(x, y), z);
    };
}

// Beispiel: Binäre Funktionen
function add(a, b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

// Verwendung von composeb
const composedFunction = composeb(add, mul);

// Beispiel
console.log(composedFunction(2, 3, 5)); // Ausgabe: 25 (add(2, 3) -> 5, mul(5, 5) -> 25)

//Methode Once***************************************************************************
function once(fn) {
    let called = false;
    return function(...args) {
        if (called) {
            throw new Error("Function can only be called once");
        }
        called = true;
        return fn(...args);
    };
}

// Beispiel: Binäre Funktion
function add(a, b) {
    return a + b;
}

// Verwendung von once
const add_once = once(add);

console.log(add_once(3, 4)); // Ausgabe: 7

try {
    console.log(add_once(3, 4)); // Löst einen Fehler aus
} catch (e) {
    console.error(e.message); // Ausgabe: Function can only be called once
}

//Methode Counterf***********************************************************
function counterf(initialValue) {
    let count = initialValue;
    return {
        inc: function() {
            return ++count;
        },
        dec: function() {
            return --count;
        }
    };
}

// Verwendung von counterf
const counter = counterf(10);

console.log(counter.inc()); // Ausgabe: 11
console.log(counter.dec()); // Ausgabe: 10
console.log(counter.inc()); // Ausgabe: 11
console.log(counter.dec()); // Ausgabe: 10

//Methode revocable********************************************************
function revocable(fn) {
    let isRevoked = false;
    return {
        invoke: function(...args) {
            if (isRevoked) {
                throw new Error("Function has been revoked and cannot be called.");
            }
            return fn(...args);
        },
        revoke: function() {
            isRevoked = true;
        }
    };
}

// Beispielverwendung
const temp = revocable(alert);

temp.invoke(7); // Führt zu alert(7)
temp.revoke();
try {
    temp.invoke(8); // Führt zu einem Fehler
} catch (e) {
    console.error(e.message); // Ausgabe: Function has been revoked and cannot be called.
}

//Methode Vector**********************************************
function vector() {
    const data = []; // Privates Array

    return {
        get: function(index) {
            if (index >= 0 && index < data.length) {
                return data[index];
            }
            throw new Error("Index out of bounds");
        },
        store: function(index, value) {
            if (index >= 0) {
                data[index] = value; // Fügt ein neues Element hinzu oder überschreibt es
            } else {
                throw new Error("Index must be non-negative");
            }
        },
        append: function(value) {
            data.push(value); // Fügt ein neues Element am Ende hinzu
        }
    };
}

// Beispielverwendung
const my_vector = vector();

my_vector.append(7);          // Fügt 7 hinzu
my_vector.store(1, 8);        // Speichert 8 an Index 1
console.log(my_vector.get(0)); // Ausgabe: 7
console.log(my_vector.get(1)); // Ausgabe: 8

try {
    console.log(my_vector.get(2)); // Fehler: Index out of bounds
} catch (e) {
    console.error(e.message); // Ausgabe: Index out of bounds
}

