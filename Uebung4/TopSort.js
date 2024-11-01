function topSort(dependencies){
    // Erstellen Sie ein Map für die Knoten (Aufgaben)
    const graph= new Map();
    const inDegree = new Map();
    // Initialisieren Sie das Graph und den Eingangsgrad
    dependencies.forEach(([task1,task2]) => {
        if(!graph.has(task1)) graph.set(task1, []);
        if(!graph.has(task2)) graph.set(task2, []);

        // Füge die Abhängigkeit hinzu
        graph.get(task1).push(task2);
        // Erhöhe den Eingangsgrad für task2
        inDegree.set(task2,(inDegree.get(task2) || 0)+1);
        // Stelle sicher, dass task1 auch im inDegree enthalten ist
        inDegree.set(task1, inDegree.get(task1) || 0);
    });
    // Knoten ohne Eingangsgrad (keine Abhängigkeiten)
    const queue = [];
    inDegree.forEach((degree, node)=>{
        if(degree ===0){
            queue.push(node);
        }
    });
    const sorted=[];
    while(queue.length>0){
        const current = queue.shift();
        sorted.push(current);
        // Verringere den Eingangsgrad der abhängigen Knoten
        if(graph.has(current)){
            for(const neighbor of graph.get(current)){
                inDegree.set(neighbor, inDegree.get(neighbor)-1);
                // Wenn der Eingangsgrad 0 erreicht, füge ihn zur Warteschlange hinzu
                if (inDegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            }
        }
    }
    // Prüfen, ob die topologische Sortierung möglich ist (keine Zyklen)
    if (sorted.length !== inDegree.size) {
        throw new Error("Es gibt zirkuläre Abhängigkeiten!");
    }

    return sorted;
}

// Testen der Funktion
function testTopSort() {
    // Test 1
    const dependencies1 = [["schlafen", "studieren"], ["essen", "studieren"], ["studieren", "prüfen"]];
    const result1 = topSort(dependencies1);
    console.log("Result1=", result1);


    // Test 2
    const dependencies2 = [["a", "b"], ["b", "c"], ["a", "c"]];
    const result2 = topSort(dependencies2);
    console.log("Result2=",result2);

    // Test 3 - Zirkuläre Abhängigkeit
    const dependencies3 = [["a", "b"], ["b", "a"]];
    console.log("Result3=")
    try {
        let result3 = topSort(dependencies3);
        console.log(result3);
    }catch (e){
        console.error("Es gibt zirkuläre Abhängigkeiten!")
    }
}
testTopSort();