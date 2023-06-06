import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  validateYupSchema,
} from "formik";
import * as Yup from "yup";
import {
  Typography,
  Card,
  CardContent,
  Select,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Box,
  Button,
} from "@mui/material";
import categories from "../data/categories.json";
import cookingTime from "../data/cookingTime.json";
import FormControlContext from "@mui/material/FormControl/FormControlContext";

const initialValues = {
  title: "",
  about: "",
  category: "",
  initialInvestment: "",
  investmentRisk: [],
  commentAboutInvestmentRisk: "",
  acceptedTermsAndConditions: false,
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Your name is mandatory").min(2).max(10),
  about: Yup.string().required().min(2).max(20),
  category: Yup.string().required(),
  initialInvestment: Yup.number().required().min(1).max(7),
  commentAboutInvestmentRisk: Yup.string().required(),
  acceptedTermsAndConditions: Yup.boolean().oneOf([true]),
  investmentRisk: Yup.array(Yup.string().oneOf(["High", "Medium", "Low"])).min(
    1
  ),
});

export const AddRecipeForm = () => {
  return (
    <Card>
      <CardContent>
        <Box mb={2}>
          <Typography variant="h4">Add recipe</Typography>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, formikHelpers) => {
            console.log(values);
            console.log(formikHelpers);
          }}
        >
          {({ values, errors, touched, isSubmitting, isValidating }) => (
            <Form>
              <Box mb={2}>
                <FormGroup>
                  <Field name="title" as={TextField} label="Full name" />
                  {touched.title && errors.title ? errors.title : null}
                  <Field name="about" as={TextField} label="about" />
                  <ErrorMessage name="about" />
                  <Field
                    name="initialInvestment"
                    as={TextField}
                    label="Initial Investment"
                    type="number"
                  />
                  <ErrorMessage name="initialInvestment" />
                </FormGroup>
              </Box>
              <Box mb={2}>
                <Field name="investmentRisk" value="Low" type="checkbox" />
                <Field name="investmentRisk" value="Medium" type="checkbox" />
                <Field name="investmentRisk" value="High" type="checkbox" />
                <ErrorMessage name="investmentRisk" />
              </Box>
              <Box mb={2}>
                <FormGroup>
                  <Field
                    name="commentAboutInvestmentRisk"
                    as="textarea"
                    label="comment about investment"
                    rows={5}
                  />
                  <ErrorMessage name="commentAboutInvestmentRisk" />
                  <Field name="category" as={TextField} select>
                    <MenuItem value={-1}>Select</MenuItem>
                    <MenuItem value={0}>0</MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Field>
                  <ErrorMessage name="category" />
                </FormGroup>
              </Box>

              <Field name="acceptedTermsAndConditions" type="checkbox"></Field>
              <ErrorMessage name="acceptedTermsAndConditions" />

              <Button type="submit" disabled={isSubmitting || isValidating}>
                Submit
              </Button>
              <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};
