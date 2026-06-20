import { companyProfiles } from "@/lib/data";
import { calculateSummary, formatCurrency, groupTotal, positionTotal } from "@/lib/calculations";
import { PositionGroup, Project } from "@/lib/types";

export function OfferPreview({ project, groups }: { project: Project; groups: PositionGroup[] }) {
  const company = companyProfiles.find((profile) => profile.id === project.companyId) ?? companyProfiles[0];
  const summary = calculateSummary(groups, project);
  const today = new Intl.DateTimeFormat("de-DE", { dateStyle: "long" }).format(new Date());

  return (
    <article className="print-area rounded-lg border border-line bg-white p-8 shadow-soft">
      <section className="border-b border-line pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <div
              className="mb-8 inline-flex h-14 min-w-14 items-center justify-center rounded-md px-4 text-sm font-bold text-white"
              style={{ background: company.colors.primary }}
            >
              {company.logoText}
            </div>
            <p className="text-sm uppercase tracking-[0.16em] text-muted">Angebot</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold tracking-normal text-ink">{project.projectName}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{company.offerText}</p>
          </div>
          <div className="min-w-64 rounded-lg border border-line p-4 text-sm text-muted">
            <p className="font-semibold text-ink">{company.name}</p>
            <p className="mt-2">{company.address}</p>
            <p className="mt-3">{company.email}</p>
            <p>{company.phone}</p>
            <p>{company.website}</p>
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          <PreviewMeta label="Empfänger" value={project.client} />
          <PreviewMeta label="Ansprechpartner" value={project.contactPerson} />
          <PreviewMeta label="Angebotsnummer" value={project.offerNumber} />
          <PreviewMeta label="Datum" value={today} />
        </div>
      </section>

      <section className="py-8">
        <h2 className="text-lg font-semibold text-ink">Einleitung</h2>
        <p className="mt-3 leading-7 text-muted">
          Wir bedanken uns für Ihr Interesse an der Entwicklung einer individuellen KI-gestützten Softwarelösung. Auf Grundlage
          der vorliegenden Anforderungen erstellen wir nachfolgend ein strukturiertes Leistungsverzeichnis für die Konzeption,
          Entwicklung, Implementierung und Einführung der Anwendung.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold text-ink">Projektbeschreibung</h3>
            <p className="mt-2 leading-7 text-muted">{project.shortDescription}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink">Zielsetzung</h3>
            <p className="mt-2 leading-7 text-muted">{project.objective}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-8">
        <h2 className="text-lg font-semibold text-ink">Leistungsverzeichnis</h2>
        <div className="mt-5 overflow-hidden rounded-lg border border-line">
          {groups.map((group) => {
            const activePositions = group.positions.filter((position) => position.active);
            if (activePositions.length === 0) return null;

            return (
              <div key={group.id} className="border-b border-line last:border-b-0">
                <div className="flex items-start justify-between gap-4 bg-slate-50 px-5 py-4">
                  <div>
                    <h3 className="font-semibold text-ink">{group.title}</h3>
                    <p className="mt-1 text-sm text-muted">{group.intro}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-ink">{formatCurrency(groupTotal(group))}</p>
                </div>
                <div className="divide-y divide-line">
                  {activePositions.map((position) => (
                    <div key={position.id} className="grid gap-4 px-5 py-4 lg:grid-cols-[72px_1fr_100px_120px]">
                      <p className="text-sm font-semibold text-muted">{position.number}</p>
                      <div>
                        <p className="font-medium text-ink">{position.title}</p>
                        <p className="mt-1 text-sm leading-6 text-muted">{position.description}</p>
                        {position.note ? <p className="mt-2 text-xs font-medium text-slate-500">{position.note}</p> : null}
                      </div>
                      <p className="text-sm text-muted">
                        {position.quantity} {position.unit}
                      </p>
                      <p className="text-right text-sm font-semibold text-ink">{formatCurrency(positionTotal(position))}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="grid gap-6 border-t border-line py-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="text-lg font-semibold text-ink">Zahlungsbedingungen</h2>
          <p className="mt-3 leading-7 text-muted">{project.paymentTerms}</p>
          <h2 className="mt-6 text-lg font-semibold text-ink">Gültigkeit</h2>
          <p className="mt-3 leading-7 text-muted">Dieses Angebot ist {project.validUntil} gültig.</p>
          <h2 className="mt-6 text-lg font-semibold text-ink">Haftungshinweise</h2>
          <p className="mt-3 leading-7 text-muted">{company.liability}</p>
        </div>
        <div className="rounded-lg border border-line bg-slate-50 p-5">
          <div className="flex justify-between py-2 text-sm">
            <span className="text-muted">Summe netto</span>
            <span className="font-semibold text-ink">{formatCurrency(summary.net + summary.discount)}</span>
          </div>
          {summary.discount > 0 ? (
            <div className="flex justify-between py-2 text-sm">
              <span className="text-muted">Rabatt</span>
              <span className="font-semibold text-ink">-{formatCurrency(summary.discount)}</span>
            </div>
          ) : null}
          <div className="flex justify-between py-2 text-sm">
            <span className="text-muted">Umsatzsteuer {project.vatRate} %</span>
            <span className="font-semibold text-ink">{formatCurrency(summary.vat)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-line pt-4 text-lg font-semibold text-ink">
            <span>Gesamt brutto</span>
            <span>{formatCurrency(summary.gross)}</span>
          </div>
        </div>
      </section>

      <footer className="border-t border-line pt-6 text-sm leading-6 text-muted">
        <p className="font-medium text-ink">{company.contact}</p>
        <p>{company.footer}</p>
        <p className="mt-3">
          {company.vatId} · {company.bank}
        </p>
      </footer>
    </article>
  );
}

function PreviewMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-line bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-2 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}
