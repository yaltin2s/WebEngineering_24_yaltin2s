// Fibonacci mit Memoization
function fibonacci(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
    return memo[n];
}

// Ausgabe der ersten 2000 Fibonacci-Zahlen mit BigInt
function printFibonacciUpTo2000() {
    let fib = [0n, 1n]; // Array mit BigInt-Werten
    for (let i = 2; i < 2000; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    fib.forEach((val, index) => console.log(`F(${index}) = ${val}`));
}

printFibonacciUpTo2000();

// Berechnung der größten Fibonacci-Zahl, die als Integer sicher gespeichert werden kann
function findMaxSafeFibonacci() {
    let a = 0;
    let b = 1;
    let index = 1;
    while (b <= Number.MAX_SAFE_INTEGER) {
        let temp = a + b;
        a = b;
        b = temp;
        index++;
    }
    console.log(`Größte sichere Fibonacci-Zahl (MAX_SAFE_INTEGER): F(${index - 1}) = ${a}`);
}

// Berechnung der größten Fibonacci-Zahl, die als Number gespeichert werden kann
function findMaxFibonacci() {
    let a = 0;
    let b = 1;
    let index = 1;
    while (b <= Number.MAX_VALUE) {
        let temp = a + b;
        a = b;
        b = temp;
        index++;
    }
    console.log(`Größte Fibonacci-Zahl (MAX_VALUE): F(${index - 1}) = ${a}`);
}

findMaxSafeFibonacci();
findMaxFibonacci();
