import { useTranslation } from "react-i18next";
import * as yup from "yup";

let isFirstNamValid = true;
let isPhoneNumberValid = true;
let isGenderValid = true;

const isUserDataValid = (
  context: yup.TestContext<yup.AnyObject>,
  value: string | number
) => {
  if (context.parent.user_id != 0) return true;
  if (!value || `${value}`.length <= 2) return false;
  return true;
};

export const AddViolenceSchema = () => {
  const { t } = useTranslation();

  return yup.object({
    user_id: yup
      .number()
      .min(0, t("violences.form.schema.victim_is_required"))
      .required(t("violences.form.schema.victim_is_required")),
    user: yup
      .object()
      .test((_, context) => {
        isFirstNamValid = isUserDataValid(
          context,
          context.parent.user.firstname
        );
        isPhoneNumberValid = isUserDataValid(
          context,
          context.parent.user.phone
        );
        isGenderValid = isUserDataValid(context, context.parent.user.gender);
        return true;
      })
      .shape({
        firstname: yup
          .string()
          .test("firstName", t("violences.form.schema.first_name_required"), (_) => {
            return isFirstNamValid;
          }),
        lastname: yup.string().notRequired(),
        phone: yup
          .number()
          .positive()
          .integer()
          .test("phoneNumber", t("violences.form.schema.phone_required"), (_) => {
            return isFirstNamValid;
          }),
        email: yup.string().email().notRequired(),
        profession: yup.string().notRequired(),
        age: yup.number().required(),
        address: yup.string().notRequired(),
        gender: yup.string().test("gender", t("violences.form.schema.gender_required"), (_) => {
          return isGenderValid;
        }),
      }),
    date_occured: yup.string().required(t("violences.form.schema.date_required")),
    country: yup.string().required(t("violences.form.schema.country_required")),
    city: yup.string().required(t("violences.form.schema.city_required")),
    details: yup.string().min(10, "Min. 10 Char.").required(),
    type_id: yup
      .number()
      .min(1, t("violences.form.schema.type_required"))
      .required(t("violences.form.schema.type_required")),
    flag_id: yup
      .number()
      .min(1, t("violences.form.schema.flag_required"))
      .required(t("violences.form.schema.flag_required")),
    nature: yup.string().required(t("violences.form.schema.nature_required")),
    natureLocation: yup.string().required(t("violences.form.schema.location_required")),
  });
};

export const AddInvestigation = () => {
  const { t } = useTranslation();

  return yup.object({
    notice_id: yup
      .number()
      .min(0, t("investigations.form.schema.victim_is_required"))
      .required(t("investigations.form.schema.victim_is_required")),
    datepoll: yup.date().required(),
    details: yup.string().min(10, "Min. 10 Char.").required(),
    second_details: yup.string().min(10, "Min. 10 Char.").required(),
    flag_id: yup
      .number()
      .min(1, t("investigations.form.schema.flag_required"))
      .required(t("investigations.form.schema.flag_required")),
    source: yup.string().required(t("investigations.form.schema.source_required")),
    violenceAuthor: yup.string().required(t("investigations.form.schema.violenceAuthor_required")),
    pollmethod_id: yup
      .number()
      .min(1, t("investigations.form.schema.pollmethod_id_required"))
      .required(t("investigations.form.schema.pollmethod_id_required")),
  });
};