//Person-Prototype
function Person(Name){
    this.Name = Name;
    this.cars=[];
}
//Methode um ein Auto hinzufügen
Person.prototype.addCar = function(car){
    this.cars.push(car);
    car.owners.push(this);
};
//Auto-Prototype
function Car(brand, model){
    this.brand = brand;
    this.model = model;
    this.owners = [];
}
// Funktion, die prüft, ob ein Auto von mehr als einer Person besessen wird
function conflict(allCars) {
    let conflicts= [];
    for(let i=0; i< allCars.length; i++){
        let car = allCars[i];
        if(car.owners.length>1){
            conflicts.push(car);
        }
    }
    return conflicts;
}
//Nutzung
let person1 = new Person("Alice");
let person2 = new Person("Bob");

let car1 = new Car("Toyota", "Corolla");
let car2 = new Car("Honda", "Civic");

// Globale Liste für alle Autos (für die conflict-Funktion)
let allCars = [car1, car2];

person1.addCar(car1); // Alice besitzt Toyota Corolla
person2.addCar(car1); // Bob besitzt ebenfalls Toyota Corolla
person2.addCar(car2); // Bob besitzt Honda Civic

// Konflikte überprüfen
let conflicts = conflict();
if (conflicts.length > 0) {
    console.log("Konflikt gefunden bei folgenden Autos:");
    conflicts.forEach(car => {
        console.log(car.brand + " " + car.model + " wird von mehreren Personen besessen.");
    });
} else {
    console.log("Kein Konflikt gefunden.");
}