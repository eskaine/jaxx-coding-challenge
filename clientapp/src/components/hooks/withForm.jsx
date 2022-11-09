import { useState } from "react";

// export const withOnChangeHandler = (Component, state) => {
//   return function (props) {
//     const [formState, setFormState] = useState(state);

//     const updateFormState = (updatedState) => {
//       setFormState(updatedState);
//       console.log('update state');
//       console.log({formState})
//     };

//     const onChangeHandler = ({ target }) => {
//       const field = target.getAttribute("data-type");
// console.log('change state');
//       console.log({formState})

//       // setFormState({
//       //   ...formState,
//       //   [field]: target.value,
//       // });
//     };

//     const updatedProps = {
//       ...props,
//       formState,
//       updateFormState,
//       onChangeHandler,
//     };

//     return <Component {...updatedProps} />;
//   };
// };


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
