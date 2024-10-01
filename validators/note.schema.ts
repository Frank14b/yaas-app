import { useTranslation } from "react-i18next";
import * as yup from "yup";

export const AddNoteSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    id: yup.string(),
    type_id: yup.number().required(t("services.form.schema.field_is_required")),
    flag_id: yup.number().required(t("services.form.schema.field_is_required")),
    details: yup.string().required(t("services.form.schema.field_is_required")),
    name: yup.string().required(t("services.form.schema.field_is_required")),
  });
};

export const AddNoteFlagSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    id: yup.string(),
    name: yup.string().required(t("services.form.schema.field_is_required")),
    details: yup.string().required(t("services.form.schema.field_is_required")),
  });
};

export const AddNoteTypeSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    id: yup.string(),
    name: yup.string().required(t("services.form.schema.field_is_required")),
    details: yup.string().required(t("services.form.schema.field_is_required")),
  });
};

export const AddNoteCommentSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    content: yup.string().required(t("services.form.schema.field_is_required")),
  });
};