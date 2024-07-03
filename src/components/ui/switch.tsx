import { useState, type FC } from 'react';

interface SwitchProps {
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  disabled?: boolean;
}

const Switch: FC<SwitchProps> = ({ defaultChecked = false, onCheckedChange, className = '', disabled = false }) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (!disabled) {
      const newChecked = !checked;
      setChecked(newChecked);
      onCheckedChange && onCheckedChange(newChecked);
    }
  };

  const baseClasses =
    'inline-flex pl-[2px] h-6 w-11 shrink-0 bg-primary cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50';
  const disabledClasses = disabled ? 'cursor-not-allowed opacity-50' : '';

  return (
    <div
      className={`${baseClasses} ${disabledClasses} ${className}`}
      onClick={handleToggle}
      role='switch'
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
    >
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </div>
  );
};

export default Switch;
