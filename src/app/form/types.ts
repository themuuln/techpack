export type StepData = {
  id: number;
  label: string;
};

export type StepProps = {
  isActive: boolean;
  item: StepData;
};
