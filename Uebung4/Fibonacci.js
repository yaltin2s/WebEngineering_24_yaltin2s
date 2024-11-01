const fibonaccicache= [0n,1n];

function getFibonacci(n) {
    if( fibonaccicache[n]!== undefined){
        return fibonaccicache[n];
    }
    fibonaccicache[n] = getFibonacci(n-1)+getFibonacci(n-2);
    return fibonaccicache[n];
}

for (let i = 0; i < 2000; i++) {
    console.log(getFibonacci(i).toString());
}

function findLargestFibonacciWithinJsMax() {
    const MAX_VALUE_JS = Number.MAX_VALUE;
    let a = 0n, b = 1n; // Verwende BigInt für große Zahlen
    let index = 1;

    while (b <= BigInt(MAX_VALUE_JS)) {
        [a, b] = [b, a + b];
        index += 1;
    }

    // Die letzte gültige Fibonacci-Zahl war `a` bei Index `index - 1`
    return { value: a, index: index - 1 };
}

const result = findLargestFibonacciWithinJsMax();
console.log("Größte Fibonacci-Zahl unter Number.MAX_VALUE:", result.value.toString());
console.log("Index der Zahl:", result.index);