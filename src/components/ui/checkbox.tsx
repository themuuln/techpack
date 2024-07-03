import { type FC } from 'react';

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const Checkbox: FC<CheckboxProps> = ({ checked, onCheckedChange, className = '', disabled = false }) => {
  const handleToggle = () => {
    if (!disabled) {
      onCheckedChange(!checked);
    }
  };

  const baseClasses =
    'inline-flex items-center justify-center w-5 h-5 rounded border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background';
  const checkedClasses = checked ? 'bg-background border-background' : 'bg-white border-gray-300';
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer';

  return (
    <div
      className={`${baseClasses} ${checkedClasses} ${disabledClasses} ${className}`}
      onClick={handleToggle}
      role='checkbox'
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
    >
      {checked && (
        <svg className='w-[14px] h-[14px] text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3} d='M5 13l4 4L19 7' />
        </svg>
      )}
    </div>
  );
};

export default Checkbox;
