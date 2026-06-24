import { CompanyProfile, PositionGroup, Project } from "@/lib/types";

export type OfferSharePayload = {
  version: number;
  sharedAt: string;
  project: Project;
  groups: PositionGroup[];
  profiles: CompanyProfile[];
};

const offerShareKey = "offer";
const publicOfferFlowUrl = "https://bm1964-25.github.io/SMART-OfferFlow/";

function encodeBase64Url(value: string) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeBase64Url(value: string) {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function createOfferSharePayload(project: Project, groups: PositionGroup[], profiles: CompanyProfile[]): OfferSharePayload {
  const activeProfile = profiles.find((profile) => profile.id === project.companyId);
  return {
    version: 1,
    sharedAt: new Date().toISOString(),
    project,
    groups,
    profiles: activeProfile ? [activeProfile] : profiles
  };
}

export function createOfferShareLink(project: Project, groups: PositionGroup[], profiles: CompanyProfile[]) {
  const payload = createOfferSharePayload(project, groups, profiles);
  const encoded = encodeBase64Url(JSON.stringify(payload));
  const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
  const baseUrl = isLocalhost ? publicOfferFlowUrl : `${window.location.origin}${window.location.pathname}`;
  return `${baseUrl}#${offerShareKey}=${encoded}`;
}

export function readOfferSharePayloadFromLocation(): OfferSharePayload | null {
  if (!window.location.hash.startsWith(`#${offerShareKey}=`)) return null;
  const encoded = window.location.hash.slice(`#${offerShareKey}=`.length);
  if (!encoded) return null;

  try {
    const parsed = JSON.parse(decodeBase64Url(encoded)) as Partial<OfferSharePayload>;
    if (!parsed.project || !parsed.groups || !parsed.profiles) return null;
    return {
      version: parsed.version ?? 1,
      sharedAt: parsed.sharedAt ?? new Date().toISOString(),
      project: parsed.project,
      groups: parsed.groups,
      profiles: parsed.profiles
    };
  } catch {
    return null;
  }
}
