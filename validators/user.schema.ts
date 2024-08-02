import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const AddUserSchema = ({ isVictim }: { isVictim: boolean }) => {
  const { t } = useTranslation();

  if (isVictim) {
    return yup.object({
      firstname: yup
        .string()
        .required(t("users.form.schema.field_is_required")),
      lastname: yup.string().required(t("users.form.schema.field_is_required")),
      username: yup.string().required(t("users.form.schema.field_is_required")),
      phone: yup.string().required(t("users.form.schema.field_is_required")),
      email: yup.string().email("users.form.schema.invalid_email").required(t("users.form.schema.field_is_required")),
      country: yup.string().required(t("users.form.schema.field_is_required")),
      city: yup.string().required(t("users.form.schema.field_is_required")),
    });
  }

  return yup.object({
    firstname: yup.string().required(t("users.form.schema.field_is_required")),
    lastname: yup.string().required(t("users.form.schema.field_is_required")),
    username: yup.string().required(t("users.form.schema.field_is_required")),
    email: yup.string().required(t("users.form.schema.field_is_required")),
    is_su_admin: yup
      .boolean()
      .required(t("users.form.schema.field_is_required")),
    role_id: yup.string().required(t("users.form.schema.field_is_required")),
    country: yup.string().required(t("users.form.schema.field_is_required")),
    city: yup.string().required(t("users.form.schema.field_is_required")),
  });
};
