/*
1. Eine Funktion identity(),
die ein Argument als Parameter entgegennimmt
und dieses als Ergebnis zurückgibt.
 */
function identity(value){
    return value;
}
/*
2. Eine Funktion identity_function(),
die ein Argument als Parameter entgegennimmt
und eine Funktion zurückgibt,
die dieses Argument zurückgibt.
 */
function identity_function(value){
    return function (){
        return value;
    };
}
/*
3. Eine binäre Funktion add, die die Summe berechnet
 */
function add(x,y){
    return x+y;
}
/*
3. Eine binäre Funktion mul, die das Produkt berechnet
 */
function mul(x,y){
    return x*y;
}
/*
4. Eine Addierer-Funktion addf(), so dass addf(x)(y) genau x + y zurückgibt.
*/
function addf(x){
    return function (y){
      return x+y;
    };
}
/*
5. Eine Funktion applyf(),
die aus einer binären Funktion
wie add(x,y) eine Funktion addf berechnet
 */
function applyf(func){
    return function (x){
        return function (y){
            return func(x,y);
        };
    };
}