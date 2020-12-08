export const passValidator = (rule, value, callback) => {
  if(value === '') {
    callback()
  }
  if (!(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/.test(value))) {
    callback(new Error('Password must contain 8 characters and at least one number, one letter and one unique character such as !#$%&?'))
  } else {
    callback();
  }
}
