import React from "react";
import { Card, Label, TextInput, Button, Select, HR } from "flowbite-react";
import { useFieldArray } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

interface Contacts {
  country?: string;
  city?: string;
  street?: string;
  postalcode?: string;
  type?: string;
}

interface FormData {
  contacts?: Contacts[];
  [key: string]: any;
}

interface UserAddressSectionProps {
  userData: FormData;
  isEdit: boolean;
  register: UseFormRegister<FormData>;
  control: any;
  errors: any;
}

const UserAddressSection: React.FC<UserAddressSectionProps> = ({
  isEdit,
  register,
  control,
  errors = {},
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Address
      </h5>
      {fields?.length === 0 && (
        <div className="text-gray-500">No addresses available.</div>
      )}
      {(fields ?? []).map((field, index: number) => {
        const contact = field || {};
        return (
          <div key={index}>
            {index > 0 && <HR />}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`country-${index}`}>
                    Country <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`country-${index}`}
                      type="text"
                      placeholder="Country"
                      required={true}
                      defaultValue={contact.country || ""}
                      color={errors[index]?.country ? "failure" : undefined}
                      {...register(`contacts.${index}.country` as const, {})}
                    />
                    {errors[index]?.country && (
                      <p className="text-red-600 text-sm">
                        {errors[index].country.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`country-${index}`} className="font-normal">
                    {contact.country || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`city-${index}`}>
                    City <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`city-${index}`}
                      type="text"
                      placeholder="City"
                      required={true}
                      defaultValue={contact.city || ""}
                      color={errors[index]?.city ? "failure" : undefined}
                      {...register(`contacts.${index}.city` as const, {})}
                    />
                    {errors[index]?.city && (
                      <p className="text-red-600 text-sm">
                        {errors[index].city.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`city-${index}`} className="font-normal">
                    {contact.city || ""}
                  </Label>
                )}
              </div>
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`street-${index}`}>
                    Street <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`street-${index}`}
                      type="text"
                      placeholder="Street"
                      required={true}
                      defaultValue={contact.street || ""}
                      color={errors[index]?.street ? "failure" : undefined}
                      {...register(`contacts.${index}.street` as const, {})}
                    />
                    {errors[index]?.street && (
                      <p className="text-red-600 text-sm">
                        {errors[index].street.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`street-${index}`} className="font-normal">
                    {contact.street || ""}
                  </Label>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mb-2 block">
                  <Label htmlFor={`postalcode-${index}`}>Postal Code</Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`postalcode-${index}`}
                      type="text"
                      placeholder="Postal Code"
                      defaultValue={contact.postalcode || ""}
                      color={errors[index]?.postalcode ? "failure" : undefined}
                      {...register(`contacts.${index}.postalcode` as const, {
                        required: "Postal Code is required",
                      })}
                    />
                    {errors[index]?.postalcode && (
                      <p className="text-red-600 text-sm">
                        {errors[index].postalcode.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label
                    htmlFor={`postalcode-${index}`}
                    className="font-normal"
                  >
                    {contact.postalcode || ""}
                  </Label>
                )}
              </div>
              <div className="flex-2">
                <div className="mb-2 block">
                  <Label htmlFor={`type-${index}`}>
                    Type <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <Select
                      className="w-sm"
                      id={`type-${index}`}
                      {...register(`contacts.${index}.type` as const)}
                      color={errors[index]?.type ? "failure" : undefined}
                      defaultValue={
                        contact.type === "1"
                          ? "1"
                          : contact.type === "0"
                          ? "0"
                          : ""
                      }
                    >
                      <option value="">Select type</option>
                      <option value="0">Mailing</option>
                      <option value="1">Work</option>
                    </Select>
                    {errors[index]?.type && (
                      <p className="text-red-600 text-sm">
                        {errors[index].type.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`type-${index}`} className="font-normal">
                    {contact.type === "1"
                      ? "Work"
                      : contact.type === "0"
                      ? "Mailing"
                      : contact.type || ""}
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
                country: "",
                city: "",
                street: "",
                postalcode: "",
                type: "",
              });
            }}
            color="green"
          >
            {" "}
            Add Contact{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserAddressSection;