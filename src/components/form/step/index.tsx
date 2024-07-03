import type { StepData } from '@/app/form/types';

type StepProps = {
  isActive: boolean;
  item: StepData;
  onClick: (arg0: number) => void;
};

const Step = ({ item, isActive, onClick }: StepProps) => {
  const stepNum = item.id + 1;

  return (
    <div onClick={() => onClick(item.id)} className='flex flex-row gap-4 font-semibold text-white cursor-pointer'>
      <div
        className={`rounded-full ${isActive ? 'bg-accent text-primary' : 'border-[2px]'} text-sm w-[30px] h-[30px] flex items-center justify-center`}
      >
        {stepNum}
      </div>
      <div className='hidden md:block'>
        <p className='text-xs uppercase text-[#9a9aff]'>Step {stepNum}</p>
        <p className='text-sm font-semibold uppercase'>{item.label}</p>
      </div>
    </div>
  );
};

export default Step;
