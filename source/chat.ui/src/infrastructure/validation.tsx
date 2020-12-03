import { useEffect, useState } from "react";

type InputFormFields = {
  username: string;
  email: string;
  password: string;
  passwordRepeated: string;
};

type ValidationType = {
  username: boolean;
  email: boolean;
  password: boolean;
};

export const useValidation = (props: InputFormFields) => {
  const [validation, setValidation] = useState<ValidationType>({
    username: false,
    email: false,
    password: false,
  });

  const RegexEmailPattern = RegExp(
    '^(([^<>()\\[\\]\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  );
  const RegexUsernamePattern = new RegExp(
    "^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$"
  );

  const isValidUsername = (text: string): boolean => {
    return RegexUsernamePattern.test(text);
  };

  const isValidEmail = (text: string): boolean => {
    return RegexEmailPattern.test(text);
  };

  const isEqualPassword = (
    passwordOne: string,
    passwordTwo: string
  ): boolean => {
    return (
      passwordOne.length > 0 &&
      passwordTwo.length > 0 &&
      passwordOne === passwordTwo
    );
  };

  useEffect(() => {
    if (isValidUsername(props.username) && !validation.username) {
      setValidation({ ...validation, username: true });
    }

    if (!isValidUsername(props.username) && validation.username) {
      setValidation({ ...validation, username: false });
    }

    if (isValidEmail(props.email) && !validation.email) {
      setValidation({ ...validation, email: true });
    }

    if (!isValidEmail(props.email) && validation.email) {
      setValidation({ ...validation, email: false });
    }

    if (
      isEqualPassword(props.password, props.passwordRepeated) &&
      !validation.password
    ) {
      setValidation({ ...validation, password: true });
    }

    if (
      !isEqualPassword(props.password, props.passwordRepeated) &&
      validation.password
    ) {
      setValidation({ ...validation, password: false });
    }
  }, [props]);

  return validation;
};
