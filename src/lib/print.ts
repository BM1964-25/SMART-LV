export function printElement(selector: string, title: string) {
  const element = document.querySelector(selector);
  if (!element) {
    window.print();
    return;
  }

  const styleNodes = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((node) => node.outerHTML)
    .join("\n");
  const printWindow = window.open("", "_blank", "noopener,noreferrer,width=900,height=1200");

  if (!printWindow) {
    window.print();
    return;
  }

  printWindow.document.open();
  printWindow.document.write(`<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    ${styleNodes}
    <style>
      @page { size: A4; margin: 14mm 12mm; }
      html, body {
        height: auto !important;
        min-height: 0 !important;
        overflow: visible !important;
        background: #fff !important;
        color: #172033;
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
      body {
        margin: 0;
        padding: 0;
      }
      .print-area {
        width: 100% !important;
        max-width: none !important;
        padding: 0 !important;
        border: none !important;
        border-radius: 0 !important;
        box-shadow: none !important;
      }
      .print-section {
        padding-top: 14px !important;
        padding-bottom: 14px !important;
      }
      .print-page-break-before {
        display: block !important;
        break-before: page !important;
        break-before: always !important;
        page-break-before: always !important;
        -webkit-column-break-before: always !important;
      }
      .print-page-break-before.border-t {
        border-top: 0 !important;
      }
      .screen-page-break-before {
        margin-top: 0 !important;
        padding-top: 14px !important;
      }
      .break-inside-avoid,
      .print-keep {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      .print-table {
        overflow: visible !important;
      }
      .print-table > div {
        break-inside: auto;
        page-break-inside: auto;
      }
      .no-print {
        display: none !important;
      }
      @media print {
        html, body {
          height: auto !important;
          overflow: visible !important;
        }
      }
    </style>
  </head>
  <body>
    ${element.outerHTML}
  </body>
</html>`);
  printWindow.document.close();

  printWindow.setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 250);
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}
