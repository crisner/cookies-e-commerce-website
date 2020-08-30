
let errors = {};
const validator = ([fieldType, fieldValue]: [string, any], required: boolean) => {
  switch(fieldType) {
    case 'email': {
      delete errors['email'];
      if(required && fieldValue.length === 0) {
        errors['email'] = 'Email cannot be empty';
      } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(fieldValue)) {
        errors['email'] = 'Invalid email address';
      }
    }
    case 'password': {
      delete errors['password'];
      if(required && fieldValue.length === 0) {
        errors['password'] = 'Password cannot be empty';
      } else if(fieldValue.length < 6) {
        errors['password'] = (errors['password'] || '') + 'Password should have atleast 6 characters\n';
      } else if(fieldValue.toLocaleLowerCase().includes('password')) {
        errors['password'] = (errors['password'] || '') + 'Password cannot contain the word \'password\'\n';
      }
    }
    default: {
      if(fieldType !== 'email' && fieldType !== 'password') {
        delete errors[fieldType];
        if(required && fieldValue.length === 0) {
          errors[fieldType] = fieldType === 'firstName' ? 'First name cannot be empty' : (fieldType === 'lastName' ? 'Last name cannot be empty': `${fieldType} cannot be empty`)
        } else if(!/^[A-Za-z]+$/.test(fieldValue)) {
          errors[fieldType] = fieldType === 'firstName' ? 'First name should contain only letters' : (fieldType === 'lastName' ? 'Last name should contain only letters': `${fieldType} should contain only letters`)
        }
      }
    }
  }
  return errors;
}

export default validator;