import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const AddServiceSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    id: yup.string(),
    country: yup.string().required(t("services.form.schema.field_is_required")),
    city: yup.string().required(t("services.form.schema.field_is_required")),
    type_id: yup.number().required(t("services.form.schema.field_is_required")),
    details: yup.string().required(t("services.form.schema.field_is_required")),
    booking_date: yup
      .string()
      .required("services.form.schema.field_is_required"),
  });
};
