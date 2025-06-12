import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Modal from "../../components/Modal";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Checkbox, Label, TextInput, Select, Datepicker } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required")
    .test("checkEmailExists", "Email already exists", async (value) => {
      // This is not optimal, but it works. :)
      if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        // Skip check if email is missing or invalid
        return true;
      }
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}p/check-email/${value}`
      );
      const data = await response.json();
      return data.success; // Return true if email does not exist
    }),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  remember: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions")
    .required("Agreement to terms is required"),
  firstName: yup
    .string()
    .required("First name is required")
    .max(50, "First name must be at most 50 characters"),
  middleName: yup
    .string()
    .max(50, "Middle name must be at most 50 characters")
    .notRequired(),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(50, "Last name must be at most 50 characters"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(
      [
        "male",
        "female",
        "transgender_male",
        "transgender_female",
        "non_binary",
        "genderqueer",
        "genderfluid",
        "agender",
        "bigender",
        "demiboy",
        "demigirl",
        "two_spirit",
        "pangender",
        "androgyne",
        "intersex",
        "third_gender",
        "neutrois",
        "questioning",
        "other",
      ],
      "Invalid gender selection"
    ),
  dateOfBirth: yup
    .string()
    .required("Date of birth is required")
    .test("age", "You must be at least 18 years old", (value) => {
      if (!value) return false;
      const dob = new Date(value);
      if (isNaN(dob.getTime())) return false;
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        return age - 1 >= 18;
      }
      return age >= 18;
    }),
});
const SignUp = () => {
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
    confirmPassword: "",
    remember: false,
    errors: {},
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
  });

  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    schema
      .validate(formData, { abortEarly: false })
      .then(() => {
        setFormData((prev: any) => ({
          ...prev,
          errors: {},
        }));

        fetch(`${import.meta.env.VITE_API_URL}users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
          }),
        })
          .then(async (res) => {
            if (!res.ok) {
              const errorData = await res.json();
              throw new Error(
                JSON.stringify(errorData) || "Failed to create user"
              );
            }
            return res.json();
          })
          .then((data) => {
            // Handle success (e.g., redirect, show message, etc.)
            alert("Account created successfully!");
            navigate("/auth/login");
          })
          .catch((errorData) => {
            errorData = JSON.parse(errorData.message || "{}");
            console.error("Error creating account:", errorData);
            // If the error response contains field errors, map them to formData.errors
            if (errorData && Array.isArray(errorData.errors)) {
              const apiErrors: Record<string, string> = {};
              errorData.errors.forEach(
                (err: { field: string; message: string }) => {
                  if (err.field && err.message) {
                    apiErrors[err.field] = err.message;
                  }
                }
              );
              setFormData((prev: any) => ({
                ...prev,
                errors: { ...prev.errors, ...apiErrors },
              }));
            } else {
              setFormData((prev: any) => ({
                ...prev,
                errors: { ...prev.errors, api: errorData.message },
              }));
            }
          });
      })
      .catch((err) => {
        const errors: Record<string, string> = {};
        err.inner.forEach((error: yup.ValidationError) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setFormData((prev: typeof formData) => ({
          ...prev,
          errors,
        }));
        console.error("Validation errors:", errors);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
      <a
        href=""
        className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
      >
        <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo" />
        <span>Sign-up for Simple KYC</span>
      </a>
      <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create a Free Account {openModal ? " - Terms Accepted" : ""}
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name <span className="text-red-600">*</span>
              </Label>
              <TextInput
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Your first name"
                required
                value={(formData as any).firstName || ""}
                onChange={handleChange}
                color={formData.errors?.firstName ? "failure" : undefined}
              />
              {formData.errors?.firstName && (
                <div className="mt-2">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {formData.errors.firstName}
                  </p>
                </div>
              )}
            </div>
            <div className="flex-1">
              <Label
                htmlFor="middleName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Middle name
              </Label>
              <TextInput
                type="text"
                name="middleName"
                id="middleName"
                placeholder="Your middle name"
                value={(formData as any).middleName || ""}
                onChange={handleChange}
                color={formData.errors?.middleName ? "failure" : undefined}
              />
              {formData.errors?.middleName && (
                <div className="mt-2">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {formData.errors.middleName}
                  </p>
                </div>
              )}
            </div>
            <div className="flex-1">
              <Label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name <span className="text-red-600">*</span>
              </Label>
              <TextInput
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Your last name"
                required
                value={(formData as any).lastName || ""}
                onChange={handleChange}
                color={formData.errors?.lastName ? "failure" : undefined}
              />
              {formData.errors?.lastName && (
                <div className="mt-2">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {formData.errors.lastName}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <Label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender <span className="text-red-600">*</span>
            </Label>
            <Select
              id="gender"
              name="gender"
              required
              value={(formData as any).gender || ""}
              onChange={handleChange}
              color={formData.errors?.gender ? "failure" : undefined}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="transgender_male" style={{ color: "#e40303" }}>
                Transgender Male 🏳️‍🌈
              </option>
              <option value="transgender_female" style={{ color: "#ff8c00" }}>
                Transgender Female 🏳️‍🌈
              </option>
              <option value="non_binary" style={{ color: "#ffed00" }}>
                Non-binary 🏳️‍🌈
              </option>
              <option value="genderqueer" style={{ color: "#008026" }}>
                Genderqueer 🏳️‍🌈
              </option>
              <option value="genderfluid" style={{ color: "#004dff" }}>
                Genderfluid 🏳️‍🌈
              </option>
              <option value="agender" style={{ color: "#750787" }}>
                Agender 🏳️‍🌈
              </option>
              <option value="bigender" style={{ color: "#e40303" }}>
                Bigender 🏳️‍🌈
              </option>
              <option value="demiboy" style={{ color: "#ff8c00" }}>
                Demiboy 🏳️‍🌈
              </option>
              <option value="demigirl" style={{ color: "#ffed00" }}>
                Demigirl 🏳️‍🌈
              </option>
              <option value="two_spirit" style={{ color: "#008026" }}>
                Two-Spirit 🏳️‍🌈
              </option>
              <option value="pangender" style={{ color: "#004dff" }}>
                Pangender 🏳️‍🌈
              </option>
              <option value="androgyne" style={{ color: "#750787" }}>
                Androgyne 🏳️‍🌈
              </option>
              <option value="intersex" style={{ color: "#e40303" }}>
                Intersex 🏳️‍🌈
              </option>
              <option value="third_gender" style={{ color: "#ff8c00" }}>
                Third Gender 🏳️‍🌈
              </option>
              <option value="neutrois" style={{ color: "#ffed00" }}>
                Neutrois 🏳️‍🌈
              </option>
              <option value="questioning" style={{ color: "#008026" }}>
                Questioning 🏳️‍🌈
              </option>
              <option value="other">Other</option>
            </Select>
            {formData.errors?.gender && (
              <div className="mt-2">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formData.errors.gender}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email <span className="text-red-600">*</span>
            </Label>
            <TextInput
              type="email"
              name="email"
              id="email"
              placeholder="name@company.com"
              required
              value={formData.email}
              onChange={handleChange}
              color={formData.errors?.email ? "failure" : undefined}
            />
            {formData.errors?.email && (
              <div className="mt-2">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formData.errors.email}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password <span className="text-red-600">*</span>
            </Label>
            <TextInput
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              required
              value={formData.password}
              onChange={handleChange}
              color={formData.errors?.password ? "failure" : undefined}
            />
            {formData.errors?.password && (
              <div className="mt-2">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formData.errors.password}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password <span className="text-red-600">*</span>
            </Label>
            <TextInput
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="••••••••"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              color={formData.errors?.confirmPassword ? "failure" : undefined}
            />
            {formData.errors?.confirmPassword && (
              <div className="mt-2">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formData.errors.confirmPassword}
                </p>
              </div>
            )}
          </div>
          <div>
            <Label
              htmlFor="dateOfBirth"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth <span className="text-red-600">*</span>
            </Label>
            <Datepicker
              id="dateOfBirth"
              name="dateOfBirth"
              required
              value={
                (formData as any).dateOfBirth ||
                (() => {
                  // Default: today minus 18 years
                  const today = new Date();
                  const eighteenYearsAgo = new Date(
                    today.getFullYear() - 18,
                    today.getMonth(),
                    today.getDate()
                  );
                  return eighteenYearsAgo;
                })()
              }
              maxDate={new Date()} // Only allow past dates (up to today)
              onChange={(date: any) => {
                let dateString = "";
                let parsedDate: Date | null = null;
                if (date) {
                  if (typeof date === "string") {
                    parsedDate = new Date(date);
                  } else if (date instanceof Date) {
                    parsedDate = date;
                  }
                  if (parsedDate && !isNaN(parsedDate.getTime())) {
                    dateString = parsedDate.toISOString().split("T")[0];
                  }
                }
                setFormData((prev: any) => ({
                  ...prev,
                  dateOfBirth: dateString,
                }));
              }}
              color={formData.errors?.dateOfBirth ? "failure" : undefined}
            />
            {formData.errors?.dateOfBirth && (
              <div className="mt-2">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {formData.errors.dateOfBirth}
                </p>
              </div>
            )}
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Checkbox
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <Label
                htmlFor="remember"
                className="font-medium text-gray-900 dark:text-white"
              >
                I accept the{" "}
              </Label>
              <a
                onClick={() => {
                  setOpenModal(true);
                }}
                className="text-primary-700 hover:underline dark:text-primary-500 cursor-pointer"
              >
                Terms and Conditions
              </a>
            </div>
          </div>
          <div>
            {formData.errors?.remember && (
              <p className="text-sm text-red-600 dark:text-red-400 ml-0">
                {formData.errors.remember}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="border border-gray-300 w-full px-5 py-3 text-base font-medium border-gray-300 text-center dark:text-white dark:bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/auth/login?redirectTo=/auth/signup"
              className="text-primary-700 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </div>
        </form>
        <Modal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Terms of Service"
        >
          <div className="terms-of-service">
            <h1>📜 Terms of Service</h1>
            <p>
              Welcome to our platform! By using our services, you agree to the
              following terms, whether you've read them or not (we know you
              haven't).
            </p>
            <ol>
              <li>
                <strong>Acceptance of Terms</strong>
                <p>
                  By accessing our services, you automatically agree to these
                  terms. It's like a secret handshake, but with more legal
                  implications.
                </p>
              </li>
              <li>
                <strong>User Responsibilities</strong>
                <p>
                  You're responsible for all activities under your account. If
                  your cat walks across your keyboard and posts something
                  embarrassing, that's on you.
                </p>
              </li>
              <li>
                <strong>Privacy Policy</strong>
                <p>
                  We respect your privacy. Any data we collect is purely for
                  enhancing your experience... and maybe for our amusement.
                </p>
              </li>
              <li>
                <strong>Content Ownership</strong>
                <p>
                  Anything you post is still yours, but we reserve the right to
                  use it in our marketing materials, especially if it's
                  hilarious.
                </p>
              </li>
              <li>
                <strong>Service Modifications</strong>
                <p>
                  We may change or discontinue services at any time. Think of it
                  as us keeping things fresh and unpredictable.
                </p>
              </li>
              <li>
                <strong>Limitation of Liability</strong>
                <p>
                  We're not liable for any damages, including but not limited
                  to, your coffee spilling due to laughter from our content.
                </p>
              </li>
              <li>
                <strong>Governing Law</strong>
                <p>
                  These terms are governed by the laws of the universe, or at
                  least the ones that make sense.
                </p>
              </li>
              <li>
                <strong>Final Clause</strong>
                <p>
                  If you've read this far, congratulations! You're among the
                  0.0001% who do. As a reward, here's a virtual high-five. ✋
                </p>
              </li>
            </ol>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default SignUp;
