import * as Yup from "yup"

export const UploadBookValidation = Yup.object({
    title: Yup.string().required("required"),
    author: Yup.string().required("required"),
    releaseDate: Yup.date().required("required"),
    amount: Yup.number().required("required"),
    genre: Yup.string().required("required"),
    description: Yup.string().required("required"),
})