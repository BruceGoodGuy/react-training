import * as yup from "yup";

export const incomeValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .max(1000000, "Amount cannot exceed 1,000,000")
    .required("Amount is required"),
  type: yup
    .string()
    .oneOf(["0", "1", "2"], "Type must be one of: Salary, Investments, Others")
    .required("Type is required"),
});

export const assetsValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .max(1000000, "Amount cannot exceed 1,000,000")
    .required("Amount is required"),
  type: yup
    .string()
    .oneOf(
      ["0", "1", "2", "3"],
      "Type must be one of: Bond, Liquidity, Real Estate, Others"
    )
    .required("Type is required"),
});

export const liabilitiesValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .max(1000000, "Amount cannot exceed 1,000,000")
    .required("Amount is required"),
  type: yup
    .string()
    .oneOf(
      ["0", "1", "2"],
      "Type must be one of: Personal Loan, Loan, Real Estate Loan, Others"
    )
    .required("Type is required"),
});

export const sourceOfWealthValidationSchema = yup.object().shape({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .max(1000000, "Amount cannot exceed 1,000,000")
    .required("Amount is required"),
  type: yup
    .string()
    .oneOf(["0", "1"], "Type must be one of: Inheritance, Donation")
    .required("Type is required"),
});

export const investmentsValidationSchema = yup.object().shape({
  experience: yup
    .string()
    .oneOf(["0", "1", "2"], "Experience must be one of the valid options")
    .required("Experience is required"),
  risk: yup
    .string()
    .oneOf(["0", "1", "2"], "Risk must be one of the valid options")
    .required("Risk is required"),
});
