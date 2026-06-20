export type CompanyId = "builtsmart-hub" | "builtsmart-ai" | "metzger-real-estate" | "custom";

export type OfferStatus = "Entwurf" | "In Prüfung" | "Versendet" | "Beauftragt" | "Archiviert";

export type PositionStatus = "Offen" | "Abgestimmt" | "Optional" | "Zurückgestellt";

export type RateKey =
  | "strategy"
  | "concept"
  | "project"
  | "ux"
  | "development"
  | "ai"
  | "prompt"
  | "deployment"
  | "training"
  | "support";

export type CompanyProfile = {
  id: CompanyId;
  name: string;
  logoText: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  vatId: string;
  bank: string;
  contact: string;
  footer: string;
  liability: string;
  offerText: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  exportLayout: string;
};

export type RateCard = Record<RateKey, number>;

export type Project = {
  id: string;
  companyId: CompanyId;
  client: string;
  contactPerson: string;
  projectName: string;
  shortDescription: string;
  objective: string;
  technicalContext: string;
  modules: string[];
  calculationType: "Stundenbasiert" | "Pauschal" | "Hybrid";
  status: OfferStatus;
  offerNumber: string;
  validUntil: string;
  paymentTerms: string;
  vatRate: number;
  discountPercent: number;
  flatFee: number | null;
  rates: RateCard;
};

export type Position = {
  id: string;
  groupId: string;
  number: string;
  title: string;
  description: string;
  unit: "Std." | "Pauschal" | "Tag" | "Monat";
  quantity: number;
  rateKey: RateKey;
  unitPrice: number;
  category: string;
  required: boolean;
  note: string;
  status: PositionStatus;
  active: boolean;
};

export type PositionGroup = {
  id: string;
  title: string;
  intro: string;
  positions: Position[];
};

export type Summary = {
  net: number;
  discount: number;
  vat: number;
  gross: number;
};
