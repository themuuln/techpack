type NavigationButtonsProps = {
  hideGoBack?: boolean;
  onGoBack?: () => void;
  isDisabled: boolean;
  submitText?: string;
};

const NavigationButtons = ({ hideGoBack = false, onGoBack, isDisabled, submitText }: NavigationButtonsProps) => {
  return (
    <div className='flex flex-row justify-between'>
      {!hideGoBack ? (
        <button
          disabled={isDisabled}
          onClick={onGoBack}
          className='absolute flex items-center justify-center px-6 py-4 font-semibold rounded-lg md:bottom-0 md:left-0 bottom-4 left-4 hover:underline h-11 text-muted'
        >
          Go Back
        </button>
      ) : (
        <></>
      )}
      <button
        disabled={isDisabled}
        type='submit'
        className='h-11 right-4 md:right-0 absolute bottom-4 md:bottom-0 transition-all duration-200 bg-[#03295a] hover:bg-[#0c2547] text-white py-4 px-6 flex items-center justify-center rounded-lg font-medium '
      >
        {submitText ?? 'Next Step'}
      </button>
    </div>
  );
};

export default NavigationButtons;
