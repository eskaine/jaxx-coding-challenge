import { useState } from "react";

export const useForm = (defaultState) => {
  const [formState, setFormState] = useState(defaultState);

  const updateFormState = (updatedState) => setFormState(updatedState);

  const onChangeHandler = ({ target }) => {
    const field = target.getAttribute("data-type");

    setFormState({
      ...formState,
      [field]: target.value,
    });
  };

  return {formState, updateFormState, onChangeHandler}
};
