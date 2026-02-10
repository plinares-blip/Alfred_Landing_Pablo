export enum TechPlan {
  BASIC = 'BASIC',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export enum PaymentTerm {
  NET0_30 = 'NET0_30',
  NET31_60 = 'NET31_60',
}

export enum ContractDuration {
  NONE = 0,
  ONE_YEAR = 1,
  TWO_YEARS = 2,
  THREE_YEARS = 3,
}

export interface QuoteState {
  numVehicles: number;
  plan: TechPlan;
  includeInPlant: boolean;
  numWorkshops: number;
  paymentTerm: PaymentTerm;
  contractDuration: ContractDuration;
}

export interface ROIState {
  preventiveCostPerMonth: number;
  correctiveCostPerMonth: number;
}