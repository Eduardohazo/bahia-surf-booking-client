import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const useForm = (selector, action, validators = {}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const values = useSelector(selector);
  
  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Run validation if validator exists for this field
    if (validators[name]) {
      const error = validators[name]({
        ...values,
        [name]: value,
      });
      setErrors((prev) => ({ ...prev, [name]: error }));
    }

    // Always treat the field as string (no object merge)
    dispatch(
      action({
        ...values,
        [name]: value,
      }),
    );
  };

  const handleContinue = (e, path) => {
    if (e) e.preventDefault();
    if (validateAll()) {
      navigate(path);
    }
  };

  const validateAll = (time) => {
    const newErrors = {};
    let valid = true;

    for (const key in validators) {
      const error = validators[key](time ? time : values);
      if (error) valid = false;
      newErrors[key] = error;
    }

    setErrors(newErrors);
    return valid;
  };

  return { values, handleChange, errors, handleContinue };
};
