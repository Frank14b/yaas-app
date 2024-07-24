import * as yup from "yup";

export const AddViolenceSchema = () => {

    return yup.object({
        date_occured: yup.date().required("Provide the incident date"),
        nature: yup.string().required("Choose the nature"),
        details: yup.string().required("Please describe the incident")
    })
};