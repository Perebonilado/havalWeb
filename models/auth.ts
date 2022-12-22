import * as Yup from "yup"

export const loginValidation = Yup.object({
    email: Yup.string().email("Please enter a valid email").required("Required"),
    password: Yup.string().required("Required")
})

export const signupValidation = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    email: Yup.string().email("Please enter a valid email").required("Required"),
    password: Yup.string().required("Required")
})