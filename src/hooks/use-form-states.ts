import { useState } from "react";

export function useFormStates() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [genericError, setGenericError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  return {
    hidePassword,
    setHidePassword,
    genericError,
    setGenericError,
    isLoading,
    setIsLoading,
    hideConfirmPassword,
    setHideConfirmPassword,
  };
}
