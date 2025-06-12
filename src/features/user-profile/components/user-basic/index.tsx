import React from "react";
import { Card, Label, TextInput, Datepicker } from "flowbite-react";
import { Controller } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

type UserBasicInfoProps = {
  isEdit: boolean;
  register: any; // Replace with proper type from react-hook-form if used
  control: any;
  errors: any;
  watch: any;
};

// Function to calculate age from date of birth
const calculateAge = (dateOfBirth: string | Date | undefined): number => {
  if (!dateOfBirth) return 0;

  const dob = dateOfBirth instanceof Date ? dateOfBirth : new Date(dateOfBirth);

  // Return 0 if invalid date
  if (isNaN(dob.getTime())) return 0;

  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();

  // Adjust age if birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
};

const formatDateString = (date) => {
  let dateString = "";
  let parsedDate: Date | null = null;
  if (date) {
    if (typeof date === "string") {
      parsedDate = new Date(date);
    } else if (date instanceof Date) {
      parsedDate = date;
    }
    if (parsedDate && !isNaN(parsedDate.getTime())) {
      const adjustedDate = new Date(
        parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000
      );
      dateString = adjustedDate.toISOString().split("T")[0];
    }
  }

  return dateString;
};

const UserBasicInfoSection: React.FC<UserBasicInfoProps> = ({
  watch,
  isEdit,
  register,
  control,
  errors,
}) => {
  const user = watch("user");
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Basic Information
      </h5>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="email">
              Email <span className="text-red-600">*</span>
            </Label>
          </div>
          <Label htmlFor="email" className="font-normal">
            {user?.email || ""}
          </Label>
        </div>
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="firstname">
              First name <span className="text-red-600">*</span>
            </Label>
          </div>
          {isEdit ? (
            <>
              <TextInput
                id="firstname"
                type="text"
                placeholder="Khoa"
                required
                defaultValue={user?.firstname || ""}
                color={errors.firstname ? "failure" : "default"}
                {...register("user.firstname")}
              />
              {errors.firstname && (
                <Label className="text-red-600 text-sm">
                  {errors.firstname.message}
                </Label>
              )}
            </>
          ) : (
            <Label htmlFor="firstname" className="font-normal">
              {user?.firstname || ""}
            </Label>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="middlename">Middle name</Label>
          </div>
          {isEdit ? (
            <>
              <TextInput
                id="middlename"
                type="text"
                placeholder="Van"
                defaultValue={user?.middlename || ""}
                color={errors.middlename ? "failure" : "default"}
                {...register("user.middlename")}
              />
              {errors.middlename && (
                <Label className="text-red-600 text-sm">
                  {errors.middlename.message}
                </Label>
              )}
            </>
          ) : (
            <Label htmlFor="middlename" className="font-normal">
              {user?.middlename || ""}
            </Label>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="lastname">
              Last name <span className="text-red-600">*</span>
            </Label>
          </div>
          {isEdit ? (
            <>
              <TextInput
                id="lastname"
                type="text"
                placeholder="Nguyen"
                required
                defaultValue={user?.lastname || ""}
                color={errors.lastname ? "failure" : "default"}
                {...register("user.lastname")}
              />
              {errors.lastname && (
                <Label className="text-red-600 text-sm">
                  {errors.lastname.message}
                </Label>
              )}
            </>
          ) : (
            <Label htmlFor="lastname" className="font-normal">
              {user?.lastname || ""}
            </Label>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="dateofbirth">
              Date of Birth <span className="text-red-600">*</span>
            </Label>
          </div>
          {isEdit ? (
            <>
              <Controller
                name={`user.dateofbirth`}
                control={control}
                rules={{
                  required: "Expire date is required",
                }}
                render={({ field }) => (
                  <Datepicker
                    id={`user.dateofbirth}`}
                    value={field.value ? new Date(field.value) : undefined}
                    onChange={(date) => {
                      return field.onChange(date.toISOString());
                    }}
                    color={errors.dateofbirth ? "failure" : "default"}
                  />
                )}
              />
              {errors.dateofbirth && (
                <Label className="text-red-600 text-sm">
                  {errors.dateofbirth.message}
                </Label>
              )}
            </>
          ) : (
            <Label htmlFor="dateofbirth" className="font-normal">
              {formatDateString(user?.dateofbirth) || ""}
            </Label>
          )}
        </div>
        <div className="flex-1">
          <div className="mb-2 block">
            <Label htmlFor="age">Age</Label>
          </div>
          <Label className="font-normal" htmlFor="age">
            {calculateAge(user?.dateofbirth) || ""}
          </Label>
        </div>
        <div className="flex-2">
          <div className="mb-2 block">
            <Label htmlFor="isofficer">Role</Label>
          </div>
          <Label htmlFor="isofficer" className="font-normal">
            {user?.isofficer ? "Officer" : "Guest"}
          </Label>
        </div>
      </div>
    </Card>
  );
};

export default UserBasicInfoSection;
