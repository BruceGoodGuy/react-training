import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useStore } from "../../shared";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb/index.tsx";
import UserBasicInfoSection from "../../features/user-profile/components/user-basic/index.tsx";
import UserAddressSection from "../../features/user-profile/components/user-address/index.tsx";
import UserEmails from "../../features/user-profile/components/user-emails";
import UserPhones from "../../features/user-profile/components/user-phones";
import UserOccupation from "../../features/user-profile/components/user-occupation";
import UserIdentifications from "../../features/user-profile/components/user-identifications";
import {
  contactsValidationSchema,
  basicInfoValidationSchema,
  emailValidationSchema,
  phoneValidationSchema,
  occupationsValidationSchema,
  identificationsValidationSchema,
} from "../../utils/validation/user-profile";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Contacts {
  country?: string;
  city?: string;
  street?: string;
  postalcode?: string;
  type?: string;
}

interface Email {
  emailaddress: string;
  type: string;
  preferred: boolean | string;
}

interface Phone {
  number: string;
  type: string;
  preferred: boolean | string;
}

interface Identification {
  idtype: string;
  idexpiry: string;
  idfile: FileList | string;
}

interface Occupation {
  occupation: string;
  occupationFrom: string;
  occupationTo?: string;
}

interface FormData {
  user: any[];
  email: string;
  firstname: string;
  middlename?: string;
  lastname?: string;
  dateofbirth?: string;
  age?: number;
  isofficer?: boolean;
  country?: string;
  city?: string;
  street?: string;
  postalcode?: string;
  type?: string;
  contacts?: Contacts[];
  emails?: Email[];
  phones?: Phone[];
  idtype?: string;
  idexpiry?: string;
  idfile?: FileList | string;
  identifications?: Identification[];
  occupations?: Occupation[];
  // Add other fields as needed
}

const schema = yup.object().shape({
  contacts: yup.array().of(contactsValidationSchema),
  user: basicInfoValidationSchema,
  emails: yup.array().of(emailValidationSchema),
  phones: yup.array().of(phoneValidationSchema),
  occupations: yup.array().of(occupationsValidationSchema),
  identifications: yup.array().of(identificationsValidationSchema),
});

const ProfileForm = ({ userId }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const authenticatedData = useStore((state) => state.userData);
  const isOfficer = authenticatedData?.isofficer || false;
  const [isEdit, setIsEdit] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}u/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit data");
      }

      await response.json();
      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting user data:", error);
    }
  };

  const goToKYC = () => {
    navigate(`/pages/users/kyc`);
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}u/profile${
          userId !== undefined ? "/" + userId : ""
        }`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { data } = await response.json();
      reset(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
      <div className="mb-4 col-span-full xl:mb-2">
        <Breadcrumb
          items={[
            { label: "Users", href: "/pages/home" },
            { label: "Profile" },
          ]}
        />
        <form className="flex flex-col gap-4" noValidate>
          <div className="flex flex-wrap gap-2 justify-between align-center">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white inline-flex self-center">
              Personal Information
            </h1>
            {!isOfficer && (
              <div className="flex items-center gap-2">
                <Button
                  pill
                  color="alternative"
                  className="bg-primary-700"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  {isEdit ? "Cancel" : "Edit"}
                </Button>
                <Button pill color="alternative" onClick={goToKYC}>
                  KYC
                </Button>
              </div>
            )}
          </div>

          <UserBasicInfoSection
            watch={watch}
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.user || {}}
          />
          <UserAddressSection
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.contacts || {}}
          />
          <UserEmails
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.emails || {}}
          />

          <UserPhones
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.phones || {}}
          />

          <UserIdentifications
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.identifications || {}}
          />

          <UserOccupation
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.occupations || {}}
          />

          {isEdit && (
            <div className="flex justify-end mt-4 gap-2">
              <Button
                pill
                color="green"
                type="submit"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
