# CSS Optimierung – TODO

## Ziele

- Verbessere Struktur und Lesbarkeit
- Entferne redundanten/ungenutzten Code
- Optimiere Performance (weniger `all`, effizientere Selektoren)
- Nutze moderne Best Practices (CSS-Variablen, Flexbox, Grid)
- Konsistenz (Farben, Abstände, Naming)
- Responsiveness verbessern (mehr Breakpoints)
- Browser-Kompatibilität

## Fortschritt

✅ **1. index.css** — Fertig

- CSS-Custom-Properties (`:root`) eingeführt
- Basis-Reset & Typografie zusammengefasst
- Header & Nav optimiert, redundante Hover-Regeln entfernt
- Buttons: `inline-flex` statt fehlerhaftem `inline-block`
- Hero & Services bereinigt
- Karten & Icons: `transition: all` -> explizit
- Dev-Badge: tote `.dev-badge-*`-Regeln entfernt
- Media Queries: 480px, 768px, 1024px Breakpoints ergänzt
- Einheitliche Formatierung & Kommentare

✅ **2. BookingWizard.css** — Fertig

- Lokale CSS-Variablen für Dark-Wizard
- Formular-Styles zusammengefasst
- `.input-error` ohne `!important` (höhere Spezifität)
- `transition: all` -> explizit
- `.wizard-btn-back` als eigene Klasse definiert
- Mobile Breakpoint bei 720px beibehalten

✅ **3. BookingWizard.tsx** — Fertig

- `.wizard-btn-back` für Back-Button ergänzt
- `.wizard-btn-next` für Send-Button ergänzt

✅ **4. App.tsx** — Geprüft

- Keine Klassenreferenzen betroffen (`.dev-fixed` bleibt bestehen)

⏳ **5. Finaler Check**

- [ ] Syntax-Validierung
- [ ] Visueller Test im Browser
