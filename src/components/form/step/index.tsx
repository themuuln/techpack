import type { StepProps } from '@/app/form/types';

const Step = ({ item, isActive }: StepProps) => {
  return (
    <div onClick={() => {}} className='flex cursor-pointer flex-row gap-4 text-white font-semibold'>
      <div
        className={`rounded-full ${isActive ? 'bg-accent text-primary' : 'border-[2px]'}  w-12 h-12 flex items-center justify-center`}
      >
        {item.id}
      </div>
      <div className='flex flex-col'>
        <p className='uppercase font-medium'>Step {item.id}</p>
        <p className='uppercase'>{item.label}</p>
      </div>
    </div>
  );
};

export default Step;
