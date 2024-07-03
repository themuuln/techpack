import type { AddonsData, FormData, PlanData, StepData } from './types';

export const stepData: StepData[] = [
  {
    id: 0,
    label: 'Your info',
  },
  {
    id: 1,
    label: 'Select plan',
  },
  {
    id: 2,
    label: 'Add-ons',
  },
  {
    id: 3,
    label: 'Summary',
  },
];

export const pageInfo: { [key in StepData['id']]: { title: string; description: string } } = {
  0: {
    title: 'Personal Info',
    description: 'Please provide your name, email address, and phone number.',
  },
  1: {
    title: 'Select your Plan',
    description: 'You have the option of monthly or yearly billing.',
  },
  2: {
    title: 'Pick add-ons',
    description: 'Add-ons help enhance your gaming experience.',
  },
  3: {
    title: 'Finishing up',
    description: 'Double-check everything looks 0K before confirming.',
  },
};

export const planData: PlanData[] = [
  {
    name: 'Arcade',
    price: 9,
    color: '#FEAF7E',
    bonus: 2,
    icon: '/icon/arcade.svg',
  },
  {
    name: 'Advanced',
    price: 12,
    color: '#FD8392',
    bonus: 2,
    icon: '/icon/advanced.svg',
  },
  {
    name: 'Pro',
    price: 15,
    color: '#483EFE',
    bonus: 2,
    icon: '/icon/pro.svg',
  },
];

export const addOns: AddonsData[] = [
  {
    title: 'Online service',
    description: 'Access to multiplayer games',
    price: 1,
  },
  {
    title: 'Larger storage',
    description: 'Extra 1TB of cloud save',
    price: 2,
  },
  {
    title: 'Customizable Profile',
    description: 'Custom theme on your profile',
    price: 2,
  },
];

export const formData = [
  {
    label: 'Name',
    placeholder: 'e.g. Stephen King',
    value: 'name',
    inputType: 'text',
  },
  {
    label: 'Email Address',
    placeholder: 'e.g. stephenking@lorem.com',
    value: 'email',
    inputType: 'email',
  },
  {
    label: 'Phone Number',
    placeholder: 'e.g. +1 234 567 890',
    value: 'phoneNumber',
    inputType: 'number',
  },
] satisfies FormData[];
