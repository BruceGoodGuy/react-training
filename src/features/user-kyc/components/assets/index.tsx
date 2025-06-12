import React from "react";
import { Card, Label, TextInput, Button, Select, HR } from "flowbite-react";
import { useFieldArray } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";

interface AssetsProps {
  isEdit?: boolean;
  register?: any;
  control?: any;
  errors?: any;
  triggerCalulateNetWorth: any;
}

const Assets: React.FC<AssetsProps> = ({
  isEdit,
  register,
  control,
  errors,
  triggerCalulateNetWorth,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assets",
  });
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Assets(B)
      </h5>
      {fields?.length === 0 && (
        <div className="text-gray-500">No assets available.</div>
      )}
      {(fields ?? []).map((field, index: number) => {
        const asset = field || {};
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
                      {...register(`assets.${index}.type` as const, {
                        onChange: triggerCalulateNetWorth,
                      })}
                      color={errors[index]?.type ? "failure" : undefined}
                      defaultValue={asset.type}
                    >
                      <option value="">Select type</option>
                      <option value="0">Bond</option>
                      <option value="1">Liquidity</option>
                      <option value="2">Real Estate</option>
                      <option value="3">Others</option>
                    </Select>
                    {errors[index]?.type && (
                      <p className="text-red-600 text-sm">
                        {errors[index].type.message}
                      </p>
                    )}
                  </>
                ) : (
                  <Label htmlFor={`type-${index}`} className="font-normal">
                    {["Bond", "Liquidity", "Real Estate", "Others"][
                      asset.type
                    ] || "N/A"}
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
                      defaultValue={asset.amount || ""}
                      color={errors[index]?.amount ? "failure" : undefined}
                      {...register(`assets.${index}.amount` as const, {
                        onBlur: triggerCalulateNetWorth,
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
                    {asset.amount || ""}
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
            Add asset{" "}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default Assets;
