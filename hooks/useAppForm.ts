import { useFormStore } from "@/stores";
import { DefaultValues, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from "react";

export type DefaultValuesProps = {
  [key: string]: any;
};

interface UseFormProps<T extends DefaultValuesProps> {
  schema: DefaultValuesProps;
  defaultValues?: T | DefaultValues<T> | undefined;
}

export function useAppForm<T extends DefaultValuesProps>({
  schema,
  defaultValues,
}: UseFormProps<T>): UseFormReturn<T> {
    const { setReactHookUseForm } = useFormStore();

    const appForm = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues as DefaultValues<T> | undefined,
        reValidateMode: "onChange"
    });

    useEffect(() => {
        setReactHookUseForm(appForm);
    }, [appForm, setReactHookUseForm]);

    return appForm;
}