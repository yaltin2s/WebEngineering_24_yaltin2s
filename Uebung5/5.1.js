// Anzahl der Wiederholungen für die Messungen
const repetitions = 10000;
// Funktion zur Messung von innerHTML
function measureInnerHTML(element) {
    const start = performance.now();
    for (let i = 0; i < repetitions; i++) {
        element.innerHTML = "<p>Text</p>";
    }
    const end = performance.now();
    return end - start;
}
// Funktion zur Messung von innerText
function measureInnerText(element) {
    const start = performance.now();
    for (let i = 0; i < repetitions; i++) {
        element.innerText = "Text";
    }
    const end = performance.now();
    return end - start;
}
// Funktion zur Messung von textContent
function measureTextContent(element) {
    const start = performance.now();
    for (let i = 0; i < repetitions; i++) {
        element.textContent = "Text";
    }
    const end = performance.now();
    return end - start;
}
// Funktion zur Messung von outerHTML
function measureOuterHTML(element) {
    const start = performance.now();
    for (let i = 0; i < repetitions; i++) {
        element.outerHTML = "<div><p>Text</p></div>";
    }
    const end = performance.now();
    return end - start;
}
// Hauptfunktion zum Ausführen der Performanzmessungen und Ausgabe der Ergebnisse
function runPerformanceTests() {
    const element = document.createElement('div'); // Dummy-Element
    document.body.appendChild(element); // Element im DOM anhängen, um reale Bedingungen zu simulieren

    const results = [
        { method: 'innerHTML', time: measureInnerHTML(element) },
        { method: 'innerText', time: measureInnerText(element) },
        { method: 'textContent', time: measureTextContent(element) },
        { method: 'outerHTML', time: measureOuterHTML(element) }
    ];
    document.body.removeChild(element); // Element nach Test entfernen
    // Tabelle erstellen und Ergebnisse ausgeben
    console.table(results);
}
// Performanztests ausführen
runPerformanceTests();
