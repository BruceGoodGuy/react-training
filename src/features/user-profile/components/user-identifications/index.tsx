import React from "react";
import {
  Card,
  Label,
  TextInput,
  Select,
  Button,
  HR,
  Datepicker,
} from "flowbite-react"; // Replace with your actual imports
import { useFieldArray, Controller } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

interface UserIdentificationsProps {
  isEdit: boolean;
  register: UseFormRegister<FormData>;
  control: any;
  errors: any;
}

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

const UserIdentifications: React.FC<UserIdentificationsProps> = ({
  isEdit,
  register,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "identifications",
  });

  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Identification Documents
      </h5>
      {fields?.length === 0 && (
        <div className="text-gray-500">No identifications available.</div>
      )}
      {(fields ?? []).map((field, index: number) => {
        const identification = field || {};
        return (
          <div key={index}>
            {index > 0 && <HR />}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`type-${index}`}>
                    Type <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Select
                      id={`type-${index}`}
                      required
                      {...register(`identifications.${index}.type` as const, {
                        required: "Type is required",
                      })}
                      defaultValue={identification.type}
                      color={errors?.[index]?.type ? "failure" : undefined}
                    >
                      <option value="">Select type</option>
                      <option value="0">Passport</option>
                      <option value="1">National ID</option>
                      <option value="2">Driver License</option>
                    </Select>
                    {errors?.[index]?.type && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors[index].type.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`type-${index}`} className="font-normal">
                    {identification.type === "0"
                      ? "Passport"
                      : identification.type === "1"
                      ? "National ID"
                      : "Driver License"}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`expire_date-${index}`}>
                    Expiry Date <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Controller
                      name={`identifications.${index}.expire_date`}
                      control={control}
                      rules={{
                        required: "Expire date is required",
                      }}
                      render={({ field }) => (
                        <Datepicker
                          id={`expire_date-${index}`}
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          onChange={(date) => {
                            return field.onChange(date.toISOString());
                          }}
                          color={
                            errors?.[index]?.expire_date ? "failure" : undefined
                          }
                        />
                      )}
                    />
                    {errors?.[index]?.expire_date && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors[index].expire_date.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label
                    htmlFor={`expire_date-${index}`}
                    className="font-normal"
                  >
                    {formatDateString(identification.expire_date) || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`file-${index}`}>
                    Upload Document <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`file-${index}`}
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      {...register(`identifications.${index}.file` as const, {
                        required: "Document is required",
                      })}
                      color={errors?.[index]?.file ? "failure" : undefined}
                    />
                    {errors?.[index]?.file && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors[index].file.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`file-${index}`} className="font-normal">
                    {identification.file ? "Document Uploaded" : ""}
                  </Label>
                )}
              </div>
            </div>
            {isEdit && (
              <div className="flex mt-3">
                <Button color="red" onClick={() => remove(index)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        );
      })}
      {isEdit && fields?.length < 5 && (
        <div className="mt-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              append({
                type: "",
                expire_date: "",
                file: "",
              });
            }}
            color="green"
          >
            {" "}
            Add Identification{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserIdentifications;
