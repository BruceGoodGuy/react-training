import React from "react";
import { Spinner } from "flowbite-react";

const Loading: React.FC<Record<string, never>> = ({ isLoading }) => {
  return (
    isLoading && (
      <div className="absolute top-0 inset-0 flex justify-center items-center bg-white/50 z-50">
        <Spinner color="pink" aria-label="Pink spinner example" />
      </div>
    )
  );
};

export default Loading;
