export type StepData = {
  id: number;
  label: string;
};

export type PlanData = {
  name: string;
  price: number;
  color: string;
  bonus: number;
  icon?: string;
};

export type AddonsData = {
  title: string;
  description: string;
  price: number;
};

export type formValues = 'name' | 'email' | 'phoneNumber';

export type FormData = { label: string; placeholder: string; value: formValues; inputType: string };

export enum StepEnums {
  PERSONAL_INFO = 0,
  PLAN = 1,
  ADD_ONS = 2,
  SUMMARY = 3,
}

export type Durations = 'Yearly' | 'Monthly';

export type Data = {
  name: string;
  email: string;
  phoneNumber: string;
  plan: PlanData;
  addons: AddonsData[];
  duration: Durations;
};
