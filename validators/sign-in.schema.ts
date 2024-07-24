import * as yup from "yup";

export const SignInSchema = () => {

    return yup.object({
        email: yup.string().email("Provide a valid email").required("Email Address is required"),
        password: yup.string().required("Provide a valid password")
    })
};