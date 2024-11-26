const fs = require('fs');

const stopwords = require('https://github.com/stopwords-iso/stopwords-de'); // Stoppwort-Liste aus Github laden

// Beispiel: Text aus der Datei laden

fs.readFile('Plagiatsresolution.txt', 'utf8', (err, data) => {

    if (err) {

        console.error('Fehler beim Lesen der Datei:', err);

        return;

    }

    // Textvorbereitung

    const text = data

        .replace(/<[^>]*>/g, '') // HTML-Tags entfernen

        .replace(/[^\w\säöüß]/gi, '') // Sonderzeichen entfernen

        .toLowerCase(); // In Kleinbuchstaben umwandeln

    // In Wörter splitten und Stoppworte filtern

    const words = text

        .split(/\s+/)

        .filter(word => !stopwords.includes(word) && word.length > 2); // Stoppworte und kurze Wörter entfernen

    // Häufigkeiten berechnen

    const wordFrequency = words.reduce((acc, word) => {

        acc[word] = (acc[word] || 0) + 1;

        return acc;

    }, {});
    // Sortieren und die drei häufigsten Wörter auswählen

    const topWords = Object.entries(wordFrequency)

        .sort((a, b) => b[1] - a[1]) // Nach Häufigkeit sortieren

        .slice(0, 3); // Die drei häufigsten Begriffe

    // Ausgabe

    console.log('Die 3 häufigsten Begriffe:', topWords.map(([word, count]) => `${word} (${count})`));

});