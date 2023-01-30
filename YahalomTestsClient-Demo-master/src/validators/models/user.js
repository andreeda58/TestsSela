import * as Yup from "yup";

const user_validator = Yup.object().shape({
  email: Yup.string().email().required(),
  name: Yup.string().required(),
  lastName: Yup.string().required(),
});

export default user_validator;
