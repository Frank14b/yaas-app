import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const CountrySchema = () => {
  const { t } = useTranslation();

  return yup.object({
    name: yup.string().required(t("countries.form.schema.name_is_required")),
    ccid: yup.string().required(t("countries.form.schema.code_is_required")),
  });
};
