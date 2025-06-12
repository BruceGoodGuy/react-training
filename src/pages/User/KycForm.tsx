import { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import UserBasicInfoSection from "../../features/user-profile/components/user-basic/index.tsx";
import Incomes from "../../features/user-kyc/components/incomes/index.tsx";
import Assets from "../../features/user-kyc/components/assets/index.tsx";
import Liabilities from "../../features/user-kyc/components/liabilities/index.tsx";
import SourceOfWealth from "../../features/user-kyc/components/source-of-wealth/index.tsx";
import Breadcrumb from "../../components/Breadcrumb/index.tsx";
import NetWorth from "../../features/user-kyc/components/net-worth/index.tsx";
import Investments from "../../features/user-kyc/components/investments/index.tsx";
import Status from "../../features/user-kyc/components/status/index.tsx";
import { useStore } from "../../shared";
import {
  Card,
  Label,
  TextInput,
  Button,
  Select,
  HRTrimmed,
} from "flowbite-react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  incomeValidationSchema,
  assetsValidationSchema,
  liabilitiesValidationSchema,
  sourceOfWealthValidationSchema,
} from "../../utils/validation/kyc";

const schema = yup.object().shape({
  incomes: yup.array().of(incomeValidationSchema),
  assets: yup.array().of(assetsValidationSchema),
  liabilities: yup.array().of(liabilitiesValidationSchema),
  sourceofwealths: yup.array().of(sourceOfWealthValidationSchema),
});

const KycForm = ({ userId }: { userId?: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const [isEdit, setIsEdit] = useState(false);
  const [totalNetWorth, setTotalNetWorth] = useState("0");
  const isOfficer = useStore((state) => state.userData?.isofficer || false);
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}u/kyc`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        setIsEdit(false);
        alert("KYC information saved successfully");
        fetchKycData(); // Refresh data
      } else {
        alert(`Failed to save: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error submitting KYC data:", error);
      alert("Failed to save KYC information. Please try again.");
    }
  };

  const calculateTotal = () => {
    // Get values from the form
    const values = getValues();
    // Initialize total net worth
    let total = 0;

    // Add incomes
    if (values.incomes && Array.isArray(values.incomes)) {
      total += values.incomes.reduce((sum, income) => {
        if (income.type && income.type !== "") {
          return sum + (Number(income.amount) || 0);
        }
        return sum;
      }, 0);
    }

    // Add assets
    if (values.assets && Array.isArray(values.assets)) {
      total += values.assets.reduce((sum, asset) => {
        if (asset.type && asset.type !== "") {
          return sum + (Number(asset.amount) || 0);
        }
        return sum;
      }, 0);
    }

    // Subtract liabilities
    if (values.liabilities && Array.isArray(values.liabilities)) {
      total -= values.liabilities.reduce((sum, liability) => {
        if (liability.type && liability.type !== "") {
          return sum + (Number(liability.amount) || 0);
        }
        return sum;
      }, 0);
    }

    if (values.sourceofwealths && Array.isArray(values.sourceofwealths)) {
      total += values.sourceofwealths.reduce((sum, source) => {
        if (source.type && source.type !== "") {
          return sum + (Number(source.amount) || 0);
        }
        return sum;
      }, 0);
    }
    setTotalNetWorth(total.toLocaleString());
  };

  const fetchKycData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}u/kyc${
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
      calculateTotal();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchKycData();
  }, [userId]);

  const kyc = watch("kycs");
  return (
    <div className="grid grid-cols-1 px-4 pt-6 xl:gap-4 dark:bg-gray-900">
      <div className="mb-4 col-span-full xl:mb-2">
        {/* No need edit */}
        <Breadcrumb
          items={[{ label: "Users", href: "/pages/home" }, { label: "KYC" }]}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
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
              </div>
            )}
          </div>
          <UserBasicInfoSection
            watch={watch}
            isEdit={false}
            register={register}
            control={control}
            errors={{}}
          />
          <Status
            status={(kyc && Object.keys(kyc).length) > 0 ? kyc.status : "3"}
          />
          <div className="flex flex-wrap gap-2 justify-between align-center">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white inline-flex self-center">
              Financial status
            </h1>
          </div>
          <Incomes
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.incomes || {}}
            triggerCalulateNetWorth={calculateTotal}
          />
          <Assets
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.assets || {}}
            triggerCalulateNetWorth={calculateTotal}
          />
          <Liabilities
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.liabilities || {}}
            triggerCalulateNetWorth={calculateTotal}
          />
          <SourceOfWealth
            isEdit={isEdit}
            register={register}
            control={control}
            errors={errors.sourceofwealths || {}}
            triggerCalulateNetWorth={calculateTotal}
            getValues={getValues}
          />
          <NetWorth totalNetWorth={totalNetWorth} />
          <Investments
            watch={watch}
            isEdit={isEdit}
            register={register}
            control={control}
            errors={{}}
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

export default KycForm;
