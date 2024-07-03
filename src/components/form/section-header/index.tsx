import { pageInfo } from '@/app/form/data';

const SectionHeader = ({ step }: { step: number }) => {
  return (
    <div className='space-y-4'>
      <h2>{pageInfo[step].title}</h2>
      <p className='font-medium text-muted'>{pageInfo[step].description}</p>
    </div>
  );
};

export default SectionHeader;
