# SMART OfferFlow

Webbasierte Anwendung für Angebote, Aufträge und Abrechnung in einem Prozess.

## Enthalten

- Next.js, TypeScript, React und Tailwind CSS
- Firmenprofil- und Kundendatenstruktur mit vier Beispielprofilen
- Vollständige Angebots- und LV-Standardstruktur mit zehn Hauptgruppen
- Editierbare Positionen mit Aktivierung, Duplizieren, Löschen und Drag-and-drop-Sortierung
- Stundensatzlogik, Netto-/USt-/Brutto-Berechnung, Rabatt und optionaler Pauschalpreis
- Angebotsvorschau mit Deckblatt, Einleitung, LV, Summen, Zahlungsbedingungen und Footer
- Lokale Speicherung im Browser
- Kurze Kundenlinks ueber Supabase-Speicherung
- CSV-/JSON-Export und druckfähige Vorschau für PDF/DOCX-Workflows

## Entwicklung

```bash
npm install
npm run dev
```

Die Anwendung ist anschließend unter `http://localhost:3000` erreichbar.

## Anthropic-Anbindung

Die KI-generierte LV-Erstellung nutzt serverseitig die Anthropic Messages API.

```bash
ANTHROPIC_API_KEY=sk-ant-... npm run dev
```

Optional kann das Modell gesetzt werden:

```bash
ANTHROPIC_MODEL=claude-sonnet-4-5-20250929
```

GitHub Pages bleibt statisch. Fuer die echte Anthropic-Generierung ist ein Server-Deployment oder Proxy erforderlich, damit der API-Key nicht im Browser landet.

## Supabase-Kundenlinks

Der Button `Angebot an Kunden versenden` speichert den aktuellen Angebotsstand serverseitig in Supabase und kopiert einen kurzen Link im Format:

```text
https://offerflow.builtsmart-ai.app/#offerToken=mrea-2026-001-ab12cd34
```

Dafuer muss die Tabelle aus `supabase/smart_offerflow_offers.sql` in Supabase angelegt werden. Auf Vercel werden folgende Environment Variables benoetigt:

```bash
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_OFFERFLOW_PUBLIC_URL=https://offerflow.builtsmart-ai.app
```

Der Service-Role-Key darf nur serverseitig gesetzt werden. GitHub Pages kann diese API-Routen nicht ausfuehren; fuer kurze Kundenlinks ist deshalb ein Server-Deployment wie Vercel erforderlich.

## GitHub Pages

Der statische Export für GitHub Pages wird mit dem Base Path `/SMART-OfferFlow` gebaut:

```bash
npm run build:pages
```

Die veröffentlichte Anwendung ist unter `https://bm1964-25.github.io/SMART-OfferFlow/` erreichbar.
