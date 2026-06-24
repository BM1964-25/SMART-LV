import { OfferSharePayload } from "@/lib/share";

const tableName = "smart_offerflow_offers";

export type StoredOffer = {
  token: string;
  offer_number: string;
  title: string;
  payload: OfferSharePayload;
  created_at: string;
  updated_at: string;
};

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error("Supabase ist nicht konfiguriert. Bitte SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY setzen.");
  }

  return {
    url: url.replace(/\/$/, ""),
    serviceKey
  };
}

export function createOfferToken(offerNumber: string) {
  const readable = offerNumber
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const random = crypto.randomUUID().replaceAll("-", "").slice(0, 8);
  return `${readable || "angebot"}-${random}`;
}

export async function saveOfferToSupabase(payload: OfferSharePayload, token = createOfferToken(payload.project.offerNumber)) {
  const { url, serviceKey } = supabaseConfig();
  const now = new Date().toISOString();
  const row = {
    token,
    offer_number: payload.project.offerNumber,
    title: payload.project.projectName,
    payload,
    updated_at: now
  };

  const response = await fetch(`${url}/rest/v1/${tableName}?on_conflict=token`, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      authorization: `Bearer ${serviceKey}`,
      "content-type": "application/json",
      prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify(row)
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const rows = (await response.json()) as StoredOffer[];
  return rows[0] ?? { ...row, created_at: now } as StoredOffer;
}

export async function loadOfferFromSupabase(token: string) {
  const { url, serviceKey } = supabaseConfig();
  const response = await fetch(`${url}/rest/v1/${tableName}?token=eq.${encodeURIComponent(token)}&select=*`, {
    headers: {
      apikey: serviceKey,
      authorization: `Bearer ${serviceKey}`
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const rows = (await response.json()) as StoredOffer[];
  return rows[0] ?? null;
}
