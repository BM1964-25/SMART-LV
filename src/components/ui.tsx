import { clsx } from "clsx";
import { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  detail,
  tone = "default"
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "default" | "accent";
}) {
  return (
    <div className={clsx("rounded-lg border border-line bg-white p-5 shadow-sm", tone === "accent" && "border-blue-100 bg-blue-50/70")}>
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-normal text-ink">{value}</p>
      <p className="mt-2 text-sm text-muted">{detail}</p>
    </div>
  );
}

export function IconButton({
  icon: Icon,
  label,
  onClick,
  active = false,
  disabled = false
}: {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border transition",
        active ? "border-blue-200 bg-blue-50 text-blue-700" : "border-line bg-white text-muted hover:border-slate-300 hover:text-ink",
        disabled && "cursor-not-allowed opacity-40"
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={clsx(
        "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100",
        props.className
      )}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={clsx(
        "min-h-24 w-full rounded-md border border-line bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:ring-4 focus:ring-blue-100",
        props.className
      )}
    />
  );
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx(
        "h-10 w-full rounded-md border border-line bg-white px-3 text-sm text-ink outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100",
        props.className
      )}
    />
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-ink">
      <span>{label}</span>
      {children}
    </label>
  );
}

export function SectionTitle({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <div>
      {kicker ? <p className="text-sm font-medium text-blue-700">{kicker}</p> : null}
      <h2 className="mt-1 text-xl font-semibold tracking-normal text-ink">{title}</h2>
    </div>
  );
}
