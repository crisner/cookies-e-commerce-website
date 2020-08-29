import { useState, useEffect } from "react";

const useForm = (fieldValues: object, cb: any, validator?: any) => {
  const [values, setValues] = useState({...fieldValues});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
  }

  useEffect(() => {
    if(isSubmitting) {
      cb()
    }
  }, [isSubmitting])

  return {
    handleChange,
    handleSubmit,
    values
  }
}

export default useForm;