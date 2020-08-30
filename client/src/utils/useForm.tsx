import { useState, useEffect } from "react";
import validate from './validator';

const useForm = (fieldValues: object, required: object, cb: any) => {
  const [values, setValues] = useState({...fieldValues});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    let fieldEntries = Object.entries(values);
    for(let [fieldType, fieldValue] of fieldEntries) {
      let error = validate([fieldType, fieldValue], required[fieldType]);
      setErrors({...error});
    }
    setIsSubmitting(true);
  }

  useEffect(() => {
    let errorKeys = Object.keys(errors);
    if(isSubmitting && errorKeys.length === 0) {
      cb()
    }
  }, [isSubmitting, errors])

  return {
    handleChange,
    handleSubmit,
    values,
    errors
  }
}

export default useForm;