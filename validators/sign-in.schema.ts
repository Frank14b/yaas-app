import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const SignInSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    email: yup
      .string()
      .email(t("signIn.schema.invalid_email"))
      .required(t("signIn.schema.email_is_required")),
    password: yup.string().required(t("signIn.schema.invalid_password")),
  });
};

export const SignInAdminSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    email: yup
      .string()
      .email(t("signIn.schema.invalid_email"))
      .required(t("signIn.schema.email_is_required")),
    password: yup.string().required(t("signIn.schema.invalid_password")),
  });
};
