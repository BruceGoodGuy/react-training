import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  Label,
  TextInput,
  Button,
  Select,
  HR,
  HelperText,
} from "flowbite-react";
import { useFieldArray } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

interface SourceOfWealthProps {
  isEdit?: boolean;
  register?: any;
  control?: any;
  errors?: any;
  getValues: any;
  triggerCalulateNetWorth: any;
}

const SourceOfWealth: React.FC<SourceOfWealthProps> = ({
  isEdit,
  register,
  control,
  errors,
  getValues,
  triggerCalulateNetWorth,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sourceofwealths",
  });

  const [total, setTotal] = useState("0");

  const calculateTotal = () => {
    if (!getValues) return "0";
    const values = getValues();
    const sourceofwealths = values.sourceofwealths || [];
    return sourceofwealths
      .reduce((sum: number, entry: any) => {
        // Only include if type has a value
        if (entry.type !== "" && entry.type !== undefined) {
          const amount = parseFloat(entry.amount) || 0;
          return sum + amount;
        }
        return sum;
      }, 0)
      .toLocaleString();
  };

  useEffect(() => {
    const newTotal = calculateTotal();

    setTotal(newTotal);
  }, [fields]);
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Source Of Wealth(D)
      </h5>
      <HelperText className="mt-1">
        This section identifies the origin of your wealth, such as any
        inheritance or donations you may have received. It's important for
        financial transparency
      </HelperText>
      {fields?.length === 0 && (
        <div className="text-gray-500">No source of wealth available.</div>
      )}
      {(fields ?? []).map((field, index: number) => {
        const sourceofwealth = field || {};
        return (
          <div key={index}>
            {index > 0 && <HR />}
            <div className="flex gap-4">
              <div className="mr-2">
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
                      {...register(`sourceofwealths.${index}.type` as const, {
                        onChange: () => {
                          setTotal(calculateTotal());
                          triggerCalulateNetWorth();
                        },
                      })}
                      color={errors[index]?.type ? "failure" : undefined}
                      defaultValue={sourceofwealth.type}
                    >
                      <option value="">Select type</option>
                      <option value="0">Inheritance</option>
                      <option value="1">Donation</option>
                    </Select>
                    {errors[index]?.type && (
                      <p className="text-red-600 text-sm">
                        {errors[index].type.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`type-${index}`} className="font-normal">
                    {["Inheritance", "Donation"][sourceofwealth.type] || "N/A"}
                  </Label>
                )}
              </div>
              <div className="mr-2">
                <div className="mb-2 block">
                  <Label htmlFor={`amount-${index}`}>
                    Amount (currency) <span className="text-red-600">*</span>
                  </Label>
                </div>
                {isEdit ? (
                  <>
                    <TextInput
                      id={`amount-${index}`}
                      type="text"
                      placeholder="Enter amount"
                      required={true}
                      defaultValue={sourceofwealth.amount || ""}
                      color={errors[index]?.amount ? "failure" : undefined}
                      {...register(`sourceofwealths.${index}.amount` as const, {
                        onBlur: () => {
                          setTotal(calculateTotal());
                          triggerCalulateNetWorth();
                        },
                      })}
                    />
                    {errors[index]?.amount && (
                      <p className="text-red-600 text-sm">
                        {errors[index].amount.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`amount-${index}`} className="font-normal">
                    {sourceofwealth.amount || ""}
                  </Label>
                )}
              </div>
            </div>
            {isEdit && (
              <div className="flex mt-3">
                <Button
                  color="red"
                  onClick={() => {
                    remove(index);
                    triggerCalulateNetWorth();
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        );
      })}
      <HR />
      <div className="mr-2">
        <div className="mb-2 block">
          <Label htmlFor={`total`}>Total Source of Wealth</Label>
        </div>
        <Label htmlFor={`total`} className="font-normal">
          {total}$
        </Label>
      </div>
      {isEdit && fields?.length < 5 && (
        <div className="mt-3">
          <Button
            onClick={(e) => {
              e.preventDefault();
              append({
                type: "",
                amount: "",
              });
            }}
            color="green"
          >
            {" "}
            Add Source of Wealth{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SourceOfWealth;
