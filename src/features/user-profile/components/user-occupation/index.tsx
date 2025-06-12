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

interface Occupation {
  occupation: string;
  from: string;
  to: string;
}

interface UserOccupationProps {
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

const UserOccupation: React.FC<UserOccupationProps> = ({
  isEdit,
  register,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "occupations",
  });
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Occupation
      </h5>
      {fields?.length === 0 && (
        <div className="text-gray-500">No occupations available.</div>
      )}

      {(fields ?? []).map((field, index: number) => {
        const occupation = field || {};
        return (
          <div key={index}>
            {index > 0 && <HR />}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`occupation-${index}`}>
                    Occupation <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Select
                      id={`occupation-${index}`}
                      required
                      {...register(`occupations.${index}.occupation` as const, {
                        required: true,
                      })}
                      defaultValue={occupation.occupation}
                      color={
                        errors?.[index]?.occupation ? "failure" : undefined
                      }
                    >
                      <option value="">Select occupation</option>
                      <option value="0">Employed</option>
                      <option value="1">Unemployed</option>
                    </Select>
                    {errors?.[index]?.occupation && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index]?.occupation.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label
                    htmlFor={`occupation-${index}`}
                    className="font-normal"
                  >
                    {occupation.occupation ? "Employed" : "Unemployed" || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`from-${index}`}>
                    From Date <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Controller
                      name={`occupations.${index}.from`}
                      control={control}
                      rules={{
                        required: "From date is required",
                      }}
                      render={({ field }) => (
                        <Datepicker
                          id={`from-${index}`}
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          onChange={(date) =>
                            field.onChange(date.toISOString())
                          }
                          color={errors?.[index]?.from ? "failure" : undefined}
                        />
                      )}
                    />
                    {errors?.[index]?.from && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index].from.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`from-${index}`} className="font-normal">
                    {formatDateString(occupation.from) || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`to-${index}`}>To Date</Label>
                </div>
                {isEdit ? (
                  <>
                    <Controller
                      name={`occupations.${index}.to`}
                      control={control}
                      rules={{
                        required: "To date is required",
                      }}
                      render={({ field }) => (
                        <Datepicker
                          id={`to-${index}`}
                          value={
                            field.value ? new Date(field.value) : undefined
                          }
                          onChange={(date) =>
                            field.onChange(date.toISOString())
                          }
                          color={errors?.[index]?.from ? "failure" : undefined}
                        />
                      )}
                    />
                    {errors?.[index]?.to && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index].to.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`to-${index}`} className="font-normal">
                   {formatDateString(occupation.to) || ""}
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
              append({ occupation: "", from: "", to: "" });
            }}
            color="green"
          >
            {" "}
            Add Occupation{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserOccupation;
