
interface PlanningData {
  weddingDate: string;
  venue: string;
  venueSize: string;
  guestCount: number;
  decorStyle: string;
  selectedServices: Record<string, boolean>;
  totalEstimate: number;
}

export const savePlanningData = (planningData: PlanningData): void => {
  const existingPlans = getSavedPlans();
  const newPlan = {
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    ...planningData
  };
  
  const updatedPlans = [...existingPlans, newPlan];
  localStorage.setItem('veloura_saved_plans', JSON.stringify(updatedPlans));
};

export const getSavedPlans = (): Array<PlanningData & { id: string, createdAt: string }> => {
  const savedPlansJson = localStorage.getItem('veloura_saved_plans');
  if (!savedPlansJson) {
    return [];
  }
  
  try {
    return JSON.parse(savedPlansJson);
  } catch (error) {
    console.error('Error parsing saved plans:', error);
    return [];
  }
};

export const getPlanById = (id: string): (PlanningData & { id: string, createdAt: string }) | undefined => {
  const plans = getSavedPlans();
  return plans.find(plan => plan.id === id);
};

export const deletePlanById = (id: string): void => {
  const plans = getSavedPlans();
  const updatedPlans = plans.filter(plan => plan.id !== id);
  localStorage.setItem('veloura_saved_plans', JSON.stringify(updatedPlans));
};
