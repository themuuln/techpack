import { useState, useEffect } from 'react';
import type { AddonsData } from '@/app/form/types';
import Checkbox from '@/components/ui/checkbox';

const AddOns = ({
  item,
  isYear,
  isActive,
  onClick,
}: {
  item: AddonsData;
  isYear: boolean;
  isActive: boolean;
  onClick: (arg0: AddonsData) => void;
}) => {
  const [checked, setChecked] = useState(isActive);

  useEffect(() => {
    setChecked(isActive);
  }, [isActive]);

  const handleClick = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onClick(item);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center transition-all duration-200 md:h-20 border ${checked ? 'border-background' : ''} rounded-lg cursor-pointer`}
    >
      <div className='flex w-full md:w-[450px] flex-row items-center justify-between p-4 md:p-6'>
        <div className='flex items-center gap-4 md:gap-6'>
          <Checkbox
            checked={checked}
            onCheckedChange={() => {}} // We don't need to handle change here as it's handled by the div click
          />
          <div>
            <p className='font-semibold text-primary'>{item.title}</p>
            <p className='text-sm text-muted'>{item.description}</p>
          </div>
        </div>
        <p className='text-sm text-background'>
          +${isYear ? item.price * 10 : item.price}/${isYear ? 'yr' : 'mo'}
        </p>
      </div>
    </div>
  );
};

export default AddOns;
