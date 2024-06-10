const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
    },
    passingMarks: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.models.exams || mongoose.model("exams", examSchema);
export default Exam;
