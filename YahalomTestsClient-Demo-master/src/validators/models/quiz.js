import * as Yup from "yup";



const quiz_validator = Yup.object({
  lenguage: Yup.string(),
  name: Yup.string().max(200).required(),
  questions: Yup.array(),
  header: Yup.string().required(),
  noteToPass: Yup.number().required().min(0).max(100),
  showAnswer: Yup.boolean().required(),
  topic: Yup.string().required(),
  textSucced: Yup.string().required(),
  textFailed: Yup.string().required(),

});

export default quiz_validator;
