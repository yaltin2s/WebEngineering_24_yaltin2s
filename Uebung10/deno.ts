import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

// Hilfsfunktionen zur Berechnung
function berechneStatistiken(values: number[]) {
    const summe = values.reduce((acc, val) => acc + val, 0);
    const durchschnitt = summe / values.length;
    const minimum = Math.min(...values);
    const maximum = Math.max(...values);

    return { summe, durchschnitt, minimum, maximum };
}

async function ladeDaten(): Promise<any[]> {
    const decoder = new TextDecoder("utf-8");
    const jsonData = await Deno.readFile("daten.json");
    return JSON.parse(decoder.decode(jsonData));
}

// Server erstellen
let server: any;
server = serve({"port": 8000});
console.log("Server läuft auf http://localhost:8000");

for await (const request of server) {
    try {
        const daten = await ladeDaten();

        // Extrahiere die Nettoexport-Werte (ohne leere oder ungültige Werte)
        const nettoExportWerte = daten
            .map((eintrag) =>
                parseFloat(
                    eintrag["Nettoexport [MWh] Berechnete Auflösungen"].replace(",", "")
                )
            )
            .filter((wert) => !isNaN(wert));

        const statistiken = berechneStatistiken(nettoExportWerte);

        // HTML-Antwort generieren
        const html = `
      <!DOCTYPE html>
      <html lang="de">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Statistiken</title>
      </head>
      <body>
        <h1>Statistiken aus daten.json</h1>
        <ul>
          <li>Summe: ${statistiken.summe.toFixed(2)} MWh</li>
          <li>Durchschnitt: ${statistiken.durchschnitt.toFixed(2)} MWh</li>
          <li>Minimum: ${statistiken.minimum.toFixed(2)} MWh</li>
          <li>Maximum: ${statistiken.maximum.toFixed(2)} MWh</li>
        </ul>
      </body>
      </html>
    `;

        request.respond({ body: html, headers: new Headers({ "Content-Type": "text/html" }) });
    } catch (error) {
        console.error("Fehler:", error);
        request.respond({ status: 500, body: "Interner Serverfehler" });
    }
}
