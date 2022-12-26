import * as Yup from "yup";

export const sendTokenViaEmailValidations = Yup.object({
  email: Yup.string()
    .email("pleaser provide a valid email address")
    .required("required"),
});
