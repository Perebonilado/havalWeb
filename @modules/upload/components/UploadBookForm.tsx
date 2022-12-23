import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
  Box,
  TextField,
  Stack,
  InputLabel,
  MenuItem,
  Typography,
  styled,
  Button,
  CircularProgress,
} from "@mui/material";

import { useFormik, FormikProvider, Form } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

import { UploadBookValidation } from "../../../models/upload";
import {
  allowedBookGenres,
  allowedBookCoverMimeTypes,
  allowedBookMimeTypes,
} from "../constants";
import UploadFileButton from "./UploadFileButton";
import useToken from "../../../hooks/useToken";
import { useUploadBookMutation } from "../../../config/features/api";

const initalValues = {
  title: "",
  author: "",
  amount: "",
  genre: "",
  description: "",
};

const DatePickerContainer = styled(Box)`
  width: 100%;
  input {
    width: 100%;
    padding: 0.5rem;
    outline: none;
    border: 1px solid lightgrey;
    cursor: pointer;
  }
`;

const UploadBookForm: FC = () => {
  const [bookCover, setBookCover] = useState<File | null>(null);
  const [book, setBook] = useState<File | null>(null);
  const [releaseDate, setReleaseDate] = useState<Date>(new Date());
  const [amount, setAmount] = useState<string>("");
  const { token } = useToken();
  const [uploadBook, { data, isSuccess, isError, isLoading }] =
    useUploadBookMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: UploadBookValidation,
    onSubmit: (values) => handleSubmit({ values }),
  });

  const handleSubmit = ({ values }: { values: typeof initalValues }) => {
    if (book && bookCover && releaseDate) {
      const uploadData: any = {
        ...values,
        releaseDate: releaseDate.toISOString().replace('Z', ''),
      };
      console.log(releaseDate.toISOString().replace('Z', ''))
      const formData = new FormData();
      for (let key in uploadData) {
        formData.append(key, uploadData[key]);
      }
      formData.append("book", book);
      formData.append("book_cover", bookCover);
      uploadBook({ token: token, data: formData });
    } else toast.error("Ensure all fields are filled and Uploads are done");
  };

  useEffect(() => {
    formik.setFieldValue("amount", amount);
  }, [amount]);

  useEffect(() => {
    if (isError) toast.error("Error uploading book, please try again");
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book successfully uploaded");
      router.push("/books");
    }
  }, [isSuccess]);

  return (
    <Box
      sx={{
        margin: "auto",
        width: "100%",
        maxWidth: "600px",
      }}
    >
      <Typography variant="h5" fontWeight={600} marginBottom={2}>
        Upload Book Form
      </Typography>
      <FormikProvider value={formik}>
        <Form>
          <Stack spacing={2}>
            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Book Title
              </InputLabel>
              <TextField
                label=""
                fullWidth
                size="small"
                {...formik.getFieldProps("title")}
                helperText={formik.touched.title && formik.errors.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
              />
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Author
              </InputLabel>
              <TextField
                label=""
                fullWidth
                size="small"
                {...formik.getFieldProps("author")}
                helperText={formik.touched.author && formik.errors.author}
                error={formik.touched.author && Boolean(formik.errors.author)}
              />
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Amount <>(&#8358;)</>
              </InputLabel>
              <TextField
                label=""
                fullWidth
                size="small"
                value={amount}
                onChange={(e) => {
                  let result = e.target.value.replace(/\D/g, "");

                  setAmount(result);
                  formik.setFieldValue("amount", amount, true);
                }}
                onBlur={() => {
                  formik.setFieldTouched("amount", true);
                }}
                helperText={formik.touched.amount && formik.errors.amount}
                error={formik.touched.amount && Boolean(formik.errors.amount)}
              />
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Genre
              </InputLabel>
              <TextField
                label=""
                fullWidth
                size="small"
                select
                {...formik.getFieldProps("genre")}
                helperText={formik.touched.genre && formik.errors.genre}
                error={formik.touched.genre && Boolean(formik.errors.genre)}
              >
                {allowedBookGenres.map((item, idx) => {
                  return (
                    <MenuItem key={idx} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </TextField>
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Description
              </InputLabel>
              <TextField
                label=""
                fullWidth
                size="small"
                multiline
                rows={5}
                {...formik.getFieldProps("description")}
                helperText={
                  formik.touched.description && formik.errors.description
                }
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
              />
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Release Date
              </InputLabel>
              <DatePickerContainer>
                <DatePicker
                  minDate={new Date()}
                  selected={releaseDate}
                  onChange={(date: Date) => setReleaseDate(date)}
                />
              </DatePickerContainer>
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Book Cover
              </InputLabel>
              <UploadFileButton
                file={bookCover}
                setFile={setBookCover}
                fileDescription={"JPEG, PNG/5mb Max"}
                allowedMimeTypes={allowedBookCoverMimeTypes}
                maxFileSizeInMB={5}
              />
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Book
              </InputLabel>
              <UploadFileButton
                file={book}
                setFile={setBook}
                fileDescription={"PDF/20mb Max"}
                allowedMimeTypes={allowedBookMimeTypes}
                maxFileSizeInMB={20}
              />
            </Box>

            <Box>
              <Button
                variant="contained"
                size="small"
                sx={{ display: "block", margin: "auto" }}
                type="submit"
                disabled={isLoading || !book || !bookCover || !releaseDate}
              >
                {isLoading ? <CircularProgress size={15}/> : "Upload Book"}
              </Button>
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default UploadBookForm;
