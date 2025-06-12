import React from "react";
import { Card, Label, Select } from "flowbite-react";

type InvestmentsProps = {
  isEdit: boolean;
  register: any; // Replace with proper type from react-hook-form if used
  control: any;
  errors: any;
  watch: any;
};

const Investments: React.FC<InvestmentsProps> = ({
  watch,
  isEdit,
  register,
  control,
  errors,
}) => {
  const investments = watch("investments");
  return (
    <Card className="my-3">
      <h5 className="font-bold tracking-tight text-sky-900 dark:text-white">
        Investment Experience and Objectives
      </h5>
      <div className="flex gap-5">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="experience">Experience in financial markets</Label>
          </div>
          {isEdit ? (
            <>
              <Select
                className="w-sm"
                id={`experience`}
                {...register(`investments.experience` as const)}
                color={errors?.experience ? "failure" : undefined}
                defaultValue={investments?.experience}
              >
                <option value="0">{"<"} 5 years</option>
                <option value="1">{"> 5 and < 10 years"}</option>
                <option value="2">{"> 10 years"}</option>
              </Select>
              {errors?.experience && (
                <p className="text-red-600 text-sm">
                  {errors.experience.message}
                </p>
              )}
            </>
          ) : (
            <Label htmlFor={`experience`} className="font-normal">
              {investments?.experience === "0"
                ? "< 5 years"
                : investments?.experience === "1"
                ? "> 5 and < 10 years"
                : investments?.experience === "2"
                ? "> 10 years"
                : ""}
            </Label>
          )}
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="risk">Risk Tolerance</Label>
          </div>
          {isEdit ? (
            <>
              <Select
                className="w-sm"
                id={`risk`}
                {...register(`investments.risk` as const)}
                color={errors?.risk ? "failure" : undefined}
                defaultValue={investments?.risk}
              >
                <option value="0">10%</option>
                <option value="1">30%</option>
                <option value="2">All-in</option>
              </Select>
              {errors?.risk && (
                <p className="text-red-600 text-sm">{errors.risk.message}</p>
              )}
            </>
          ) : (
            <Label htmlFor={`risk`} className="font-normal">
              {investments?.risk === "0"
                ? "10%"
                : investments?.risk === "1"
                ? "30%"
                : investments?.risk === "2"
                ? "All-in"
                : ""}
            </Label>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Investments;
