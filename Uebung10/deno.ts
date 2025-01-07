// Import der benötigten Module

import { serve } from 'https://deno.land/std/http/server.ts';

// Typdefinitionen

interface MarketData {

    name: string;

    value: number;

}

// URL der Marktdaten (Beispiel-URL; durch die echte URL ersetzen)

const MARKET_DATA_URL = "https://example.com/market-data";

// Funktion: HTTP-Anfrage an die Bundesnetzagentur

// @ts-ignore
async function fetchMarketData(): Promise<MarketData[]> {

    try {

        const response = await fetch(MARKET_DATA_URL);

        if (!response.ok) {

            throw new Error(`HTTP-Error: ${response.status}`);

        }

        const data: MarketData[] = await response.json();

        return data;

    } catch (error) {

        console.error("Fehler beim Abrufen der Marktdaten:", error.message);

        return [];

    }

}

// Funktion: Statistiken berechnen

function calculateStatistics(data: MarketData[]): {

    min: number;

    max: number;

    average: number;

    sum: number;

} {

    const values = data.map((item) => item.value);

    const sum = values.reduce((acc, curr) => acc + curr, 0);

    const min = Math.min(...values);

    const max = Math.max(...values);

    const average = sum / values.length || 0;

    return { min, max, average, sum };

}

// Funktion: HTML-Seite generieren

function generateHTML(

    stats: { min: number; max: number; average: number; sum: number },

    data: MarketData[]

): string {

    const rows = data

        .map(

            (item) =>

                `<tr><td>${item.name}</td><td>${item.value.toFixed(2)}</td></tr>`

        )

        .join("");

    return `

    <!DOCTYPE html>

    <html lang="de">

    <head>

      <meta charset="UTF-8">

      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Marktdaten Analyse</title>

      <style>

        table { width: 100%; border-collapse: collapse; margin: 20px 0; }

        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }

        th { background-color: #f4f4f4; }

      </style>

    </head>

    <body>

      <h1>Marktdaten Analyse</h1>

      <p>Min: ${stats.min.toFixed(2)}</p>

      <p>Max: ${stats.max.toFixed(2)}</p>

      <p>Durchschnitt: ${stats.average.toFixed(2)}</p>

      <p>Summe: ${stats.sum.toFixed(2)}</p>

      <table>

        <thead>

          <tr>

            <th>Name</th>

            <th>Wert</th>

          </tr>

        </thead>

        <tbody>

          ${rows}

        </tbody>

      </table>

    </body>

    </html>

  `;

}

// Server starten

const PORT = 8000;

console.log(`HTTP-Webserver läuft auf http://localhost:${PORT}/`);

serve(async (req) => {

    try {

        // Marktdaten abrufen

        const data = await fetchMarketData();

        if (data.length === 0) {

            return new Response("Fehler: Keine Marktdaten verfügbar.", {

                status: 500,

            });

        }

        // Statistiken berechnen

        const stats = calculateStatistics(data);

        // HTML-Seite generieren

        const html = generateHTML(stats, data);

        // HTML zurückgeben

        return new Response(html, {

            headers: { "Content-Type": "text/html" },

        });

    } catch (error) {

        console.error("Fehler im Server:", error.message);

        return new Response("Interner Serverfehler", { status: 500 });

    }

});

