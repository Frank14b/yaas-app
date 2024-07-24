import { create } from "zustand";
import { FieldValues, UseFormReturn } from "react-hook-form";

export interface FormStoreProps<T extends FieldValues> {
  reactHookUseForm: UseFormReturn<T> | null;
  setReactHookUseForm: (data: UseFormReturn<T> | null) => void;
}

export const useFormStore = create<FormStoreProps<any>>()((set) => ({
  reactHookUseForm: null,
  setReactHookUseForm: (data: UseFormReturn<any> | null) =>
    set({ reactHookUseForm: data }),
}));