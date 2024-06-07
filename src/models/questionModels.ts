const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    required: true,
  },
  questionCategory: {
    type: String,
  },
  questionID: {
    type: Number,
    required: true
  },
  nextQuestion: {
    type: [Number],
    required: true
  },
  shortText: {
    type: String,
  },
  longText: {
    type: String,
  },
  correctOption: {
    type: String,
  },
  options: {
    type: Object,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "exams",
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
  },
}, {
    timestamps: true,
});

const Question = mongoose.models.questions || mongoose.model("questions", questionSchema);
export default Question;