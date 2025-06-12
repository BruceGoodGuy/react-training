import * as yup from "yup";

export const contactsValidationSchema = yup.object().shape({
  country: yup
    .string()
    .max(20, "Country cannot exceed 20 characters")
    .matches(/^[a-zA-Z\s]+$/, "Country must only contain letters and spaces")
    .required("Country is required"),
  city: yup
    .string()
    .max(20, "City cannot exceed 20 characters")
    .matches(/^[a-zA-Z\s]+$/, "City must only contain letters and spaces")
    .required("City is required"),
  street: yup
    .string()
    .max(255, "Street cannot exceed 255 characters")
    .required("Street is required"),
  postalcode: yup.string().max(20, "Postal code cannot exceed 20 characters"),
  type: yup
    .string()
    .oneOf(["0", "1"], "Type must be one of Mailing, Work.")
    .required("Type is required"),
});

export const basicInfoValidationSchema = yup.object({
  firstname: yup
    .string()
    .required("First name is required")
    .max(50, "First name cannot exceed 50 characters"),
  lastname: yup
    .string()
    .required("Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),
  middlename: yup.string().max(50, "Middle name cannot exceed 50 characters"),
  dateofbirth: yup
    .date()
    .typeError("Invalid date format")
    // .required("Date of birth is required")
    .test("is-adult", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      return (
        age > 18 ||
        (age === 18 && monthDiff >= 0 && today.getDate() >= birthDate.getDate())
      );
    }),
});

export const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  type: yup
    .string()
    .oneOf(["0", "1"], "Type must be one of Personal or Work")
    .required("Type is required"),
  preferred: yup.boolean().required("Preferred is required"),
});

export const phoneValidationSchema = yup.object().shape({
  number: yup
    .string()
    .matches(/^\d{1,12}$/, "Phone must be a number and less than 12 digits")
    .required("Phone is required"),
  preferred: yup.boolean().required("Preferred is required"),
  type: yup
    .string()
    .oneOf(["0", "1"], "Type must be one of Personal or Work")
    .required("Type is required"),
});

export const occupationsValidationSchema = yup.object().shape({
  occupation: yup
    .string()
    .oneOf(
      ["0", "1"],
      "Currently employed must be either Employed or Unemployed"
    )
    .required(),
  from: yup
    .date()
    .typeError("Invalid date format")
    .required("Start date is required")
    .test("is-valid-date", "Start date must be a valid date", (value) => {
      return value instanceof Date && !isNaN(value.getTime());
    }),
  to: yup
    .date()
    .typeError("Invalid date format")
    .nullable()
    .test("is-valid-end-date", "End date must be a valid date", (value) => {
      return (
        value === null || (value instanceof Date && !isNaN(value.getTime()))
      );
    })
    .test(
      "is-after-start-date",
      "End date must be after start date",
      function (value) {
        const { from } = this.parent;
        if (!value || !from) return true;
        return new Date(value) > new Date(from);
      }
    ),
});

export const identificationsValidationSchema = yup.object().shape({
  type: yup
    .string()
    .oneOf(
      ["0", "1", "2"],
      "Type must be one of Passport, national id card, or driver's license"
    )
    .required("Type is required"),
  expire_date: yup
    .date()
    .typeError("Invalid date format")
    .required("Expire date is required")
    .test(
      "is-future-date",
      "Expire date must be a future date",
      (value) => value && new Date(value) > new Date()
    ),
  file: yup
    .mixed()
    .required("File is required")
    .test(
      "is-image",
      "File must be an image",
      (value) => {
        return value && ["image/jpeg", "image/png", "image/gif"].includes(value[0].type)
      }
        
    ),
});
