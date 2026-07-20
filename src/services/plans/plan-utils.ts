import {
  PLAN_LIMITS,
  PlanType
} from "@/services/plans/plans";



export function getPlanName(
  plan:PlanType
){

  return PLAN_LIMITS[plan].name;

}



export function getViewingGuarantee(
  plan:PlanType
){

  return PLAN_LIMITS[plan].viewingGuarantee;

}



export function isPremium(
  plan:PlanType
){

  return plan === "premium";

}



