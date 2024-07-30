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
  const scopeT = (d: string) => {
    return d;
  };

  return yup.object({
    user_id: yup
      .number()
      .min(0, scopeT("victim_is_required"))
      .required(scopeT("victim_is_required")),
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
          .test("firstName", scopeT("first_name_required"), (_) => {
            return isFirstNamValid;
          }),
        lastname: yup.string().notRequired(),
        phone: yup
          .number()
          .positive()
          .integer()
          .test("phoneNumber", scopeT("phone_required"), (_) => {
            return isFirstNamValid;
          }),
        email: yup.string().email().notRequired(),
        profession: yup.string().notRequired(),
        age: yup.number().required(),
        address: yup.string().notRequired(),
        gender: yup.string().test("gender", scopeT("gender_required"), (_) => {
          return isGenderValid;
        }),
      }),
    date_occured: yup.date().required(),
    country: yup.string().required(),
    city: yup.string().required(),
    details: yup.string().min(10, "Min. 10 Char.").required(),
    type_id: yup
      .number()
      .min(1, scopeT("type_required"))
      .required(scopeT("type_required")),
    flag_id: yup
      .number()
      .min(1, scopeT("flag_required"))
      .required(scopeT("flag_required")),
    nature: yup.string().required(scopeT("nature_required")),
    natureLocation: yup.string().required(scopeT("location_required")),
  });
};

export const AddInvestigation = () => {
  const scopeT = (d: string) => {
    return d;
  };

  return yup.object({
    notice_id: yup
      .number()
      .min(0, scopeT("victim_is_required"))
      .required(scopeT("victim_is_required")),
    datepoll: yup.date().required(),
    details: yup.string().min(10, "Min. 10 Char.").required(),
    second_details: yup.string().min(10, "Min. 10 Char.").required(),
    flag_id: yup
      .number()
      .min(1, scopeT("flag_required"))
      .required(scopeT("flag_required")),
    source: yup.string().required(scopeT("source_required")),
    violenceAuthor: yup.string().required(scopeT("violenceAuthor_required")),
    pollmethod_id: yup
      .number()
      .min(1, scopeT("pollmethod_id_required"))
      .required(scopeT("pollmethod_id_required")),
  });
};
