import { object, string, number, date } from 'yup';

export const validationSchema = object({
  username: string()
    .min(3, "Must contain at least 3 letters")
    .matches(/^[a-zA-Z\s]+$/, "Username should contain only letters")
    .required("This field is required"),
  passwrd: string()
    .min(6, "Password must be at least 6 characters long")
    .max(15, "Password must be at most 15 characters long")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain both letters and numbers")
    .required("This field is required"),
  mail: string()
    .email("Invalid email address")
    .required("This field is required"),
});

export const initialValues = {
  username: "",
  passwrd: "",
  mail: "",
};
