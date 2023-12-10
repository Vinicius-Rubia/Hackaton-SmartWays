import React from "react";

interface IHelperTextError {
  validation: string | undefined;
}

export const HelperTextError: React.FC<IHelperTextError> = ({ validation }) => {
  return (
    validation && (
      <span className="text-red-500 text-xs mt-1 text-red font-bold">
        {validation}
      </span>
    )
  );
};
