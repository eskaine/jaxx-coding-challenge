import { useState, useMemo } from "react";

export const withOnChangeHandler = (Component, state) => {
  return function (props) {
    const [formState, setFormState] = useState(state);

    const onChangeHandler = ({ target }) => {
      const field = target.getAttribute("data-type");

      setFormState({
        ...formState,
        [field]: target.value,
      });
    };

    const memoizedState = useMemo(() => ({
      ...props,
      formState,
      setFormState,
      onChangeHandler,
    }));

    return <Component {...memoizedState} />;
  };
};
