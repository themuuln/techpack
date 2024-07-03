import type { Durations } from '@/app/form/types';
import Switch from '@/components/ui/switch';
import type { TPlanSchema } from '@/lib/types';
import type { UseFormSetValue } from 'react-hook-form';

type DurationSelectorProps = {
  onSwitch: (arg0: boolean) => void;
  value: Durations;
};

const DurationSelector = ({ onSwitch, value, setValue }: DurationSelectorProps & { setValue: UseFormSetValue<TPlanSchema> }) => {
  const baseStyle = `font-semibold text-sm`;
  return (
    <div className='flex justify-center w-full p-4 space-x-4 rounded-lg bg-field'>
      <div className={`${value === 'Monthly' ? 'text-primary' : 'text-muted'} ${baseStyle}`}>Monthly</div>
      <Switch defaultChecked={value !== 'Monthly'} onCheckedChange={(checked) => onSwitch(checked)} />
      <div className={`${value === 'Yearly' ? 'text-primary' : 'text-muted'} ${baseStyle}`}>Yearly</div>
    </div>
  );
};

export default DurationSelector;
