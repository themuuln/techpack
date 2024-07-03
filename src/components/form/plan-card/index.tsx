import type { PlanData } from '@/app/form/types';
import type { TPlanSchema } from '@/lib/types';
import Image from 'next/image';
import type { UseFormSetValue } from 'react-hook-form';

const PlanCard = ({
  item,
  selected,
  onClick,
  isYear,
  setValue,
}: {
  item: PlanData;
  selected?: boolean;
  onClick: () => void;
  isYear: boolean;
  setValue: UseFormSetValue<TPlanSchema>;
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex space-x-3 md:space-x-0 cursor-pointer duration-300 transition-colors flex-row md:flex-col ${selected ? 'bg-[#F8F9FE] border-background' : 'border-muted'} border  md:justify-between ${item?.bonus ? '' : ''} px-4 py-5 rounded-lg w-full md:w-36`}
    >
      <div style={{ backgroundColor: item.color }} className={`h-10 md:mb-10 w-10 rounded-full flex items-center justify-center`}>
        <Image src={item.icon ?? ''} alt={item.name} width={20} height={20} />
      </div>
      <div className='space-y-1'>
        <div className='text-lg font-bold text-primary'>{item.name}</div>
        <div className='font-medium text-muted'>${isYear ? item.price * 10 : item.price}/mo</div>
        {isYear && <div className='font-medium text-primary'>{item.bonus} months free</div>}
      </div>
    </div>
  );
};

export default PlanCard;
