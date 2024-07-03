'use client';
import { Step } from '@/components/form';
import AddOns from '@/components/form/add-ons';
import DurationSelector from '@/components/form/duration-selector';
import NavigationButtons from '@/components/form/navigation-buttons';
import PlanCard from '@/components/form/plan-card';
import SectionHeader from '@/components/form/section-header';
import { calcPrice } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { personalInfoSchema, planSchema, type TAddonsSchema, type TPersonalInfoSchema, type TPlanSchema } from '../../lib/types';
import { addOns, formData, planData, stepData } from './data';
import { StepEnums, type Data } from './types';

const loadStateFromLocalStorage = (): Data | null => {
  const savedState = localStorage.getItem('formData');
  return savedState ? JSON.parse(savedState) : null;
};

export default function Home() {
  const [data, setData] = useState<Data>(() => {
    const savedState = loadStateFromLocalStorage();
    return (
      savedState || {
        name: '',
        email: '',
        phoneNumber: '',
        plan: planData[0],
        addons: [],
        duration: 'Monthly',
      }
    );
  });
  const [currentStep, setCurrentStep] = useState<number>(() => {
    const savedStep = localStorage.getItem('currentStep');
    return savedStep ? parseInt(savedStep, 10) : StepEnums.PERSONAL_INFO;
  });
  const [confirmed, setConfirmed] = useState<boolean>(false);

  const {
    register: registerPersonalInfo,
    handleSubmit: handleSubmitPersonalInfo,
    formState: { errors: errorsPersonalInfo, isSubmitting: isSubmittingPersonalInfo },
  } = useForm<TPersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
  });

  const {
    register: registerPlan,
    handleSubmit: handleSubmitPlan,
    formState: { errors: errorsPlan, isSubmitting: isSubmittingPlan },
    setValue: setValuePlan,
  } = useForm<TPlanSchema>({
    resolver: zodResolver(planSchema),
    defaultValues: {
      plan: planData[0],
      duration: 'Monthly',
    },
  });

  useEffect(() => {
    saveStateToLocalStorage(data);
  }, [data]);

  useEffect(() => {
    localStorage.setItem('currentStep', currentStep.toString());
  }, [currentStep]);

  const onSubmit = async (formData: TPersonalInfoSchema | TPlanSchema | TAddonsSchema) => {
    switch (currentStep) {
      case StepEnums.PERSONAL_INFO:
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setData({ ...data, ...(formData as TPersonalInfoSchema) });
          setCurrentStep((prev) => prev + 1);
        } catch (error) {
          console.error(error);
        }
        break;
      case StepEnums.PLAN:
        try {
          setData({ ...data, ...(formData as TPlanSchema) });
          setCurrentStep((prev) => prev + 1);
        } catch (error) {
          console.error(error);
        }
        break;
      case StepEnums.ADD_ONS:
        try {
          // @ts-ignore
          setData({ ...data, ...(formData as TAddonsSchema) });
          setCurrentStep((prev) => prev + 1);
        } catch (error) {
          console.error(error);
        }
        break;
      case StepEnums.SUMMARY:
        try {
          // @ts-ignore
          setData({ ...data, ...(formData as TAddonsSchema) });
          setConfirmed(true);
        } catch (error) {
          console.error(error);
        }
        break;
    }
  };

  const onGoBack = () => {
    console.log(currentStep);
    setCurrentStep((prevState) => prevState - 1);
  };

  const saveStateToLocalStorage = (state: Data) => {
    localStorage.setItem('formData', JSON.stringify(state));
  };

  return (
    <>
      <form
        onSubmit={currentStep === StepEnums.PERSONAL_INFO ? handleSubmitPersonalInfo(onSubmit) : handleSubmitPlan(onSubmit)}
        className='flex flex-col w-full gap-y-2'
      >
        <main className='min-h-screen md:flex md:flex-row md:justify-center md:items-center bg-[#eef5ff] text-black'>
          {/* For Mobile */}
          <div className='w-full md:hidden pb-8 md:pb-0 md:w-[246px] pl-7 pt-9 bg-background '>
            <div className='flex flex-row justify-center space-x-4 md:space-x-0 md:flex-col md:space-y-6'>
              {stepData.map((step, index) => {
                return <Step key={step?.id} onClick={(id) => setCurrentStep(id)} item={step} isActive={index === currentStep} />;
              })}
            </div>
          </div>

          <div className='container flex flex-col md:flex-row bg-white  md:max-w-[848px] md:min-h-[542px] rounded-2xl'>
            {/* Navigation bar */}
            {/* For Tablet+ */}
            <div className='hidden md:block w-full pb-8 md:pb-0 md:w-[246px] pl-7 md:m-3 pt-9 bg-background md:rounded-xl'>
              <div className='flex flex-row justify-center space-x-4 md:space-x-0 md:flex-col md:space-y-6'>
                {stepData.map((step, index) => {
                  return <Step key={step?.id} onClick={(id) => setCurrentStep(id)} item={step} isActive={index === currentStep} />;
                })}
              </div>
            </div>

            {/* Main Form */}
            <div className='relative px-6 mx-auto mb-8 md:px-0 space-y-9 mt-14'>
              <SectionHeader step={currentStep} />

              {currentStep === StepEnums.PERSONAL_INFO ? (
                <>
                  {/* PERSONAL INFO */}
                  <div className='space-y-2 md:space-y-4'>
                    {formData.map((item, index) => {
                      return (
                        <div key={index} className='space-y-1'>
                          <div className='flex justify-between'>
                            <label className='text-sm font-medium text-primary'>{item.label}</label>
                            {errorsPersonalInfo[item.value] && (
                              <p className='text-sm font-semibold text-red-500'>{`${errorsPersonalInfo[item.value]?.message}`}</p>
                            )}
                          </div>
                          <input
                            {...registerPersonalInfo(`${item.value}`)}
                            type={item.inputType}
                            placeholder={item.placeholder}
                            value={data?.[item.value] || ''}
                            onChange={(e) => setData({ ...data, [item.value]: e.target.value })}
                            className={`flex h-10 border-[#9B9BA3] ${errorsPersonalInfo[item.value] ? 'border-red-500' : ''} font-semibold placeholder:text-[#9B9BA3] w-full rounded-md border border-input px-3 py-2 text-sm focus-visible:border-[#534d95] disabled:cursor-not-allowed disabled:opacity-50`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : currentStep === StepEnums.PLAN ? (
                <>
                  {/* PLAN */}
                  <div className='block md:flex space-y-3 space-x-0 md:space-y-0 md:space-x-[18px]'>
                    {planData.map((item, index) => {
                      return (
                        <PlanCard
                          key={index}
                          isYear={data?.duration === 'Yearly'}
                          onClick={() => {
                            setData({ ...data, plan: item });
                            setValuePlan('plan', item);
                          }}
                          selected={data?.plan?.name === item.name}
                          item={item}
                          setValue={setValuePlan}
                        />
                      );
                    })}
                  </div>
                  <DurationSelector
                    value={data.duration}
                    onSwitch={(checked) => {
                      const newDuration = checked ? 'Yearly' : 'Monthly';
                      setData({ ...data, duration: newDuration });
                      setValuePlan('duration', newDuration);
                    }}
                    setValue={setValuePlan}
                  />
                  {errorsPlan.plan && <p className='text-sm font-semibold text-red-500'>{errorsPlan.plan.message}</p>}
                  {errorsPlan.duration && <p className='text-sm font-semibold text-red-500'>{errorsPlan.duration.message}</p>}
                </>
              ) : currentStep === StepEnums.ADD_ONS ? (
                <>
                  {/* ADDONS */}
                  <div className='space-y-4'>
                    {addOns?.map((item, index) => {
                      return (
                        <AddOns
                          isActive={data?.addons?.some((addon) => addon.title === item.title)}
                          onClick={(clickedItem) => {
                            setData((prevData) => {
                              const isItemSelected = prevData.addons.some((addon) => addon.title === clickedItem.title);
                              let newAddons;
                              if (isItemSelected) {
                                newAddons = prevData.addons.filter((addon) => addon.title !== clickedItem.title);
                              } else {
                                newAddons = [...prevData.addons, clickedItem];
                              }
                              return {
                                ...prevData,
                                addons: newAddons,
                              };
                            });
                          }}
                          key={index}
                          item={item}
                          isYear={data?.duration === 'Yearly'}
                        />
                      );
                    })}
                  </div>
                </>
              ) : currentStep === StepEnums.SUMMARY ? (
                <>
                  {/* SUMMARY */}
                  <div className='flex space-y-4 md:space-y-6 flex-col rounded-lg bg-field md:w-[448px] pb-7 pt-5 px-6'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='text-xl font-bold text-primary'>
                          {data?.plan?.name} ({data?.duration})
                        </div>
                        <div
                          onClick={() => {
                            setCurrentStep(StepEnums.PLAN);
                          }}
                          className='underline cursor-pointer text-muted'
                        >
                          Change
                        </div>
                      </div>
                      <div className='font-bold text-primary'>{calcPrice(data?.plan?.price, data?.duration)}</div>
                    </div>

                    {data?.addons.length > 0 ? <hr className='h-[1px] border-[#9B9BA3]' /> : <></>}

                    {data?.addons?.map((item, index) => {
                      return (
                        <div key={index} className='flex items-center justify-between'>
                          <div className='text-muted'>{item.title}</div>
                          <div className='font-medium text-primary'>+{calcPrice(item?.price, data?.duration)}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div className='flex items-center justify-between px-6 md:pb-11'>
                    <div className='text-muted'>Total (per {data?.duration === 'Yearly' ? 'year' : 'month'})</div>
                    <div className='text-lg font-bold text-background'>
                      $
                      {(data?.duration === 'Yearly' ? data?.plan?.price * 10 : data?.plan?.price) +
                        (data?.duration === 'Yearly'
                          ? data?.addons?.reduce((acc, item) => acc + item.price * 10, 0)
                          : data?.addons?.reduce((acc, item) => acc + item.price, 0))}
                      /{data?.duration === 'Yearly' ? 'yr' : 'mo'}
                    </div>
                  </div>
                </>
              ) : (
                <></>
              )}

              {/* For Tablet+ */}
              <div className='hidden md:block'>
                <NavigationButtons
                  hideGoBack={currentStep === StepEnums.PERSONAL_INFO}
                  onGoBack={onGoBack}
                  isDisabled={isSubmittingPersonalInfo || isSubmittingPlan}
                  submitText={currentStep === StepEnums.SUMMARY ? 'Confirm' : 'Next Step'}
                />
              </div>
            </div>
          </div>

          {/* For Mobile */}
          <div className='absolute bottom-0 block w-full h-20 bg-white md:hidden'>
            <NavigationButtons
              hideGoBack={currentStep === StepEnums.PERSONAL_INFO}
              onGoBack={onGoBack}
              isDisabled={isSubmittingPersonalInfo || isSubmittingPlan}
              submitText={currentStep === StepEnums.SUMMARY ? 'Confirm' : 'Next Step'}
            />
          </div>
        </main>
      </form>
    </>
  );
}
