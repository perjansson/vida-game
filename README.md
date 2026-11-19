# Vidas spel

Startprojekt: Vite + Three.js med en boll som hoppar när man trycker på den.

## Kom igång
    npm install
    npm run dev

Öppna adressen som visas (oftast http://localhost:5173).

## Deploy på Render
1. Pusha mappen till ett GitHub-repo.
2. I Render: New > Blueprint, välj repot. `render.yaml` sköter resten.
   Alternativt New > Static Site med build command `npm install && npm run build` och publish directory `dist`.
3. Varje push till huvudgrenen deployar automatiskt.

## Starta med Claude Code
Kör `claude` i den här mappen. `CLAUDE.md` läses in automatiskt.
Skriv sedan: "Hej! Vida är här nu. Hälsa på henne och sätt igång."
