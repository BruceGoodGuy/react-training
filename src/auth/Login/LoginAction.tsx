import * as yup from "yup";

import { formatYupErrors } from "../../utils/index";

export async function doLogin(
  prevState: any,
  formData: URLSearchParams
): Promise<Object | undefined> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  let errors: { email?: string; password?: string; unexpected?: string } = {};

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  try {
    await schema.validate({ email, password }, { abortEarly: false });
    const data = await fetch(
      `${import.meta.env.VITE_API_URL}users/authenticate`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const response = await data.json();
    if (response.success) {
      return { isValid: true, values: response.data, errors };
    } else {
      for (const index in response.errors) {
        const key = response.errors[index].field as keyof typeof errors;
        if (key && !errors[key]) {
          errors[key] = response.errors[index].message;
        }
      }
    }
  } catch (error: any) {
    if (error.name === "ValidationError") {
      errors = formatYupErrors(error);
    } else {
      console.error("Login error:", error);
      errors.unexpected =
        "An unexpected error occurred. Please try again later.";
    }
  }
  if (Object.keys(errors).length > 0) {
    return { isValid: false, values: { email, password }, errors };
  }
}
