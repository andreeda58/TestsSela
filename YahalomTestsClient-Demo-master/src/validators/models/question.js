import * as Yup from "yup";
import answer_validator  from"../../validators/models/answer";



const question_validator = Yup.object().shape({
  
  questionKind: Yup.string().required(),
  content: Yup.string().required(),
  complementContent: Yup.string(),
  answer: Yup.array()
    .of(answer_validator)
    .required("answers required")
    .min(2, "at least 2 answers"),
    display:Yup.string().required(),
  tags: Yup.string().required(),
  topic:Yup.string().default("development") ,
  lastUpdated: Yup.date(new Date(Date.now())),
  version: Yup.number().default(1),
  replaced: Yup.boolean().default(false),
});




export default question_validator;
