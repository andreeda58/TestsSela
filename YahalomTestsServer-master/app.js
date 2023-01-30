const express = require("express");
const app = express();
const questionRouter = require("./routes/questionRoutes");
const testRouter = require("./routes/testsRoutes");
const userRouter = require("./routes/userRoutes");
const examRouter = require("./routes/examRoutes");
const questionOverviewRouter = require("./routes/questionOverview");
const cors = require("cors");
const bodyParser = require("body-parser");
const Urls = require("./settings/staticUrls");
const logger = require("../YahalomTestsServer-master/logger")

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api/Test", testRouter);
app.use("/api/Questions", questionRouter);
app.use("/api/User", userRouter);
app.use("/api/Exam", examRouter);
app.use("/api/QuestionOverview", questionOverviewRouter);

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(400).send(err);
});

app.listen(Urls.serverPort, () => {
  logger.info("dataBase Up");
  console.log( `YahalomTests server is running at ${Urls.serverDomain}:${Urls.serverPort}`
  )
});
