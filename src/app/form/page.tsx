"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import type { StepData, StepProps } from "./types";
import { personalInfoSchema, type TPersonalInfoSchema } from "../../lib/types";
import { Step } from "@/components/form";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TPersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
  });

  const onSubmit = async (data: TPersonalInfoSchema) => {
    // TODO: submit to server
    // ...
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <main className="min-h-screen flex justify-center py-10 bg-[#eef5ff] text-black">
          <div className="bg-white flex container rounded-xl">
            <div className="bg-background rounded-xl py-8 px-12">
              <div className="space-y-6">
                {stepData.map((step, index) => {
                  return (
                    <Step key={step?.id} item={step} isActive={index === 0} />
                  );
                })}
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <h2>Personal Info</h2>
                <p>Please provide your name, email address, and phone number</p>
              </div>

              <div className="flex flex-col">
                <label>Name</label>
                <input
                  {...register("name")}
                  type="name"
                  placeholder="Name"
                  className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.name && (
                  <p className="text-red-500">{`${errors.name.message}`}</p>
                )}
              </div>

              {/* <button disabled={isSubmitting} type="submit" className="">
                Next Step
              </button> */}
            </div>
          </div>
        </main>
      </form>
    </>
  );
}

const stepData: StepData[] = [
  {
    id: 1,
    label: "Your info",
  },
  {
    id: 2,
    label: "Select plan",
  },
  {
    id: 3,
    label: "Add-ons",
  },
  {
    id: 4,
    label: "Summary",
  },
];
