export const PLAN_LIMITS = {

  basic: {
    viewingGuarantee: 3,
    name: "MietGate Basic"
  },


  premium: {
    viewingGuarantee: 5,
    name: "MietGate Premium"
  }

} as const;



export type PlanType =
  keyof typeof PLAN_LIMITS;



