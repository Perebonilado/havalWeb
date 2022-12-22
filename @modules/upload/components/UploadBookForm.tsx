import React, { FC, useState } from "react";

import {
  Box,
  TextField,
  Stack,
  InputLabel,
  MenuItem,
  Typography,
  styled,
} from "@mui/material";

import { useFormik, FormikProvider, Form } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { UploadBookValidation } from "../../../models/upload";
import { allowedBookGenres } from "../constants";

const initalValues = {
  title: "",
  author: "",
  releaseDate: "",
  amount: "",
  genre: "",
  description: "",
};

const DatePickerContainer = styled(Box)`
  width: 100%;
  input {
    width: 100%;
    padding: .5rem;
    outline: none;
    border: 1px solid lightgrey;
    cursor: pointer;
  }
`;

const UploadBookForm: FC = () => {
  const [bookCover, setBookCover] = useState<File | null>(null);
  const [book, setBook] = useState<File | null>(null);
  const [releaseDate, setReleaseDate] = useState<Date>(new Date());

  const handleSubmit = ({ values }: { values: typeof initalValues }) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: initalValues,
    validationSchema: UploadBookValidation,
    onSubmit: (values) => handleSubmit({ values }),
  });

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
              <TextField label="" fullWidth size="small" />
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Author
              </InputLabel>
              <TextField label="" fullWidth size="small" />
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Amount <>(&#8358;)</>
              </InputLabel>
              <TextField label="" fullWidth size="small" />
            </Box>

            <Box>
              <InputLabel required sx={{ marginBottom: ".5rem" }}>
                Genre
              </InputLabel>
              <TextField label="" fullWidth size="small" select>
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
              <TextField label="" fullWidth size="small" multiline rows={5} />
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
                  style={{ width: "100%" }}
                />
              </DatePickerContainer>
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
};

export default UploadBookForm;
