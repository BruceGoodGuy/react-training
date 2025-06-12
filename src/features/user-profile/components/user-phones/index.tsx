import React from "react";
import { Card, Label, TextInput, Select, Button, HR } from "flowbite-react"; // Replace with your actual imports
import { useFieldArray } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

interface UserPhonesProps {
  isEdit: boolean;
  register: UseFormRegister<FormData>;
  control: any;
  errors: any;
}

const UserPhones: React.FC<UserPhonesProps> = ({
  isEdit,
  register,
  control,
  errors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "numbers",
  });
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Phones
      </h5>
      {fields?.length === 0 && (
        <div className="text-gray-500">No phones available.</div>
      )}
      {(fields ?? []).map((field, index: number) => {
        const phone = field || {};
        return (
          <div key={index}>
            {index > 0 && <HR />}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`phone-${index}`}>
                    Phone Number <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`phone-${index}`}
                      type="tel"
                      placeholder="Phone Number"
                      required
                      defaultValue={phone.number || ""}
                      {...register(`phones.${index}.number` as const)}
                      color={errors?.[index]?.number ? "failure" : undefined}
                    />
                    {errors?.[index]?.number && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index].number.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`phone-${index}`} className="font-normal">
                    {phone.number || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`type-phone-${index}`}>
                    Type <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Select
                      id={`type-phone-${index}`}
                      required
                      {...register(`phones.${index}.type` as const)}
                      defaultValue={phone.type}
                      color={errors?.[index]?.type ? "failure" : undefined}
                    >
                      <option value="">Select type</option>
                      <option value="0">Personal</option>
                      <option value="1">Work</option>
                    </Select>
                    {errors?.[index]?.type && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index].type.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label
                    htmlFor={`type-phone-${index}`}
                    className="font-normal"
                  >
                    {phone.type == 1 ? "Work" : "Personal" || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`preferred-phone-${index}`}>
                    Preferred <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Select
                      id={`preferred-phone-${index}`}
                      required
                      {...register(`phones.${index}.preferred` as const)}
                      defaultValue={phone.preferred}
                      color={errors?.[index]?.preferred ? "failure" : undefined}
                    >
                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </Select>
                    {errors?.[index]?.preferred && (
                      <Label className="text-red-600 text-sm mt-1">
                        {errors?.[index].preferred.message}
                      </Label>
                    )}
                  </>
                ) : (
                  <Label
                    htmlFor={`preferred-phone-${index}`}
                    className="font-normal"
                  >
                    {phone.preferred === 1 || phone.preferred === "1"
                      ? "Yes"
                      : "No"}
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
                number: "",
                type: "",
                preferred: "false",
              });
            }}
            color="green"
          >
            {" "}
            Add Phone{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserPhones;
