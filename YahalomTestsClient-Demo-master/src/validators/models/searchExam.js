import * as Yup from "yup";

const searchExamValidator = Yup.object().shape({
  test: Yup.string().email().required(),
  FinalDate: Yup.date(),
  initialDate: Yup.date(),
});

export default  searchExamValidator;
