import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const RoleSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    name: yup.string().required(t("roles.form.schema.name_is_required")),
  });
};
