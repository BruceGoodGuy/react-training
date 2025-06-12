import { Toast as FlowbiteToast, ToastToggle } from "flowbite-react";
import type { ReactNode, FC } from "react";

interface CommonToastProps {
  icon?: ReactNode;
  message: string;
  className?: string;
}

const Toast: FC<CommonToastProps> = ({ icon, message, className = "" }) => {
  return (
    <FlowbiteToast className={className}>
      {icon && (
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
          {icon}
        </div>
      )}
      <div className="ml-3 text-sm font-normal">{message}</div>
      <ToastToggle />
    </FlowbiteToast>
  );
};

export default Toast;
