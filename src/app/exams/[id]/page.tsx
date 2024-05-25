"use client";
export const maxDuration = 50;
import axios from "axios";
import React, { useEffect, useState } from "react";
import Instructions from "../../admin/exams/examComponents/Instructions";
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Spinner,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ClockIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import CenterSection from "@/components/CenterSection";

type Props = {
  params: {
    id: string;
  };
};

const WriteExam = ({ params }: Props) => {
  const router = useRouter();
  const [exam, setExam] = React.useState({
    name: "",
    questions: [],
    duration: 0,
  });
  const [startScreen, setStartScreen] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState<any>();
  const [questions, setQuestions] = useState<any>([]);
  const [questionStack, setQuestionStack] = useState<any[]>([]);
  const [timer, setTimer] = useState(0);
  const [onLoading, setOnLoading] = useState(true);

  useEffect(() => {
    setTimer(exam.duration);
  }, [exam]);

  useEffect(() => {
    questions.forEach((question: any) => {
      if (question.questionID === 1) {
        setCurrentQuestion(question);
        setOnLoading(false);
      }
    });
  }, [questions]);

  useEffect(() => {
    const getExam = async () => {
      console.log("a");
      try {
        const examData = await axios(`/api/exams/${params.id}`);
        setExam(examData.data.data);
        const questionData = await axios(`/api/questions/${params.id}`);
        setQuestions(questionData.data.data);
      } catch (error: any) {
        console.log(error);
      }
    };
    getExam();
  }, [params.id]);

  const startExam = () => {
    setStartScreen(false);
  };

  const handleQuestionNavigation = (previous: number) => {
    if (previous) {
      const prevQuestion = questionStack.pop();
      setCurrentQuestion(prevQuestion);
    } else {
      questionStack.push(currentQuestion);
      const nextQuestionID =
        currentQuestion.nextQuestion[
          currentQuestion.selectedOption?.index || 0
        ];
      const nextQuestion = questions.find(
        (question: any) => question.questionID === nextQuestionID
      );
      setCurrentQuestion(nextQuestion);
    }
  };

  const submitExam = async () => {
    try {
      questionStack.push(currentQuestion);
      const response = await axios.post(`/api/exams/${params.id}`, {
        answers: questionStack,
      });
      toast.success("Exam Submitted Successfully");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <CenterSection className="flex-col min-h-[70vh]">
      {onLoading ? (
        <Spinner size="lg" />
      ) : (
        <>
          {startScreen ? (
            <div className="w-fit">
              <h1 className="text-3xl">Welcome to the Exam</h1>
              <h1 className="text-4xl">{exam.name}</h1>
              <Instructions duration={exam.duration} />
              <div className="flex flex-row w-full justify-between">
                <Button
                  variant="ghost"
                  color="success"
                  onClick={() => startExam()}
                >
                  Start Exam
                </Button>
                <Button variant="ghost" onClick={() => router.push("/")}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className=" w-full min-h-[60vh] mt-10 h-full justify-between self-start flex flex-col ">
              <div className="flex flex-row justify-between place-content-center place-items-center">
                <h1 className="text-4xl">{exam.name}</h1>
              </div>
              <div className="flex flex-col text-justify">
                <h1 className="text-xl my-3">
                  {
                    <div
                      className="mt-5"
                      dangerouslySetInnerHTML={{
                        __html: `${currentQuestion.name}`,
                      }}
                    />
                  }
                </h1>
                {currentQuestion.questionType === "MCQ" ? (
                  <>
                    <RadioGroup
                      className="mt-5"
                      defaultValue={
                        currentQuestion.options[
                          currentQuestion.selectedOption?.value
                        ]
                      }
                    >
                      {Object.keys(currentQuestion.options).map(
                        (option, index) => {
                          return (
                            <Radio
                              key={index}
                              onClick={() => {
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  selectedOption: { index, value: option },
                                  answer: currentQuestion.options[option],
                                });
                              }}
                              value={currentQuestion.options[option]}
                            >
                              <h1 className="text-xl">
                                {currentQuestion.options[option]}
                              </h1>
                            </Radio>
                          );
                        }
                      )}
                    </RadioGroup>
                  </>
                ) : (
                  <> </>
                )}
                {currentQuestion.questionType === "ShortText" ? (
                  <>
                    <Input
                      type="text"
                      value={currentQuestion.answer || ""}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          answer: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <></>
                )}
                {currentQuestion.questionType === "LongText" ? (
                  <>
                    <Textarea
                      className="mt-5"
                      value={currentQuestion.answer}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          answer: e.target.value,
                        })
                      }
                    />
                  </>
                ) : (
                  <></>
                )}
                {currentQuestion.questionType === "Blank" ? <></> : <></>}
              </div>
              <div className="flex flex-row justify-between w-full mt-10">
                <Button
                  variant="ghost"
                  onClick={() => handleQuestionNavigation(1)}
                  isDisabled={questionStack.length === 0}
                >
                  Previous
                </Button>
                {currentQuestion.nextQuestion[0] ? (
                  <Button
                    variant="ghost"
                    onClick={() => handleQuestionNavigation(0)}
                  >
                    Next
                  </Button>
                ) : (
                  <Button variant="ghost" onClick={() => submitExam()}>
                    Submit
                  </Button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </CenterSection>
  );
};

export default WriteExam;
