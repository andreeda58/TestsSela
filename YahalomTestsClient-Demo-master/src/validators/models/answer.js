const Yup = require("yup");

const answer_validator = Yup.object().shape({
  content: Yup.string().required("answer content is missing"),
  correct: Yup.boolean().required(),
});

module.exports = answer_validator;
