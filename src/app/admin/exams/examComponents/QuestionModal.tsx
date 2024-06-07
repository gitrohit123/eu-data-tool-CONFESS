import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  SelectItem,
  Select,
} from "@nextui-org/react";
import { MCQ, MultipleSelect } from "./questionType";
import toast from "react-hot-toast";
import axios from "axios";

type Props = {
  questionData: any;
  isOpen: any;
  onOpen: any;
  onOpenChange: any;
  setSelectedQuestion: any;
  fetchQuestions: any;
  examID: any;
};

export default function QuestionModal({
  questionData,
  onOpen,
  isOpen,
  onOpenChange,
  setSelectedQuestion,
  fetchQuestions,
  examID,
}: Props) {
  const [question, setQuestion] = useState<any>({
    questionID: questionData?.questionID || "",
    name: questionData?.name || "",
    questionType: questionData?.questionType || "",
    questionCategory: questionData?.questionCategory || "",
    nextQuestion: questionData?.nextQuestion || "",
    exam: examID,
  });
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setQuestion({ ...question, ...questionData });
  }, [questionData]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedQuestion(undefined);
      setQuestion({
        questionID: "",
        name: "",
        questionType: "",
        questionCategory: "",
        nextQuestion: "",
        exam: examID,
      });
    }
  }, [isOpen]);

  const saveQuestion = async (onClose: any) => {
    setDisabled(true);
    try {
      let response: any;
      if (typeof question.nextQuestion === "string")
        question.nextQuestion = question.nextQuestion.split(",");
      if (questionData) {
        response = await axios.put(
          `/api/admin/questions/${questionData._id}`,
          question
        );
      } else {
        response = await axios.post(`/api/admin/questions`, question);
      }
      if (response.status === 200) {
        toast.success("Question saved successfully");
        fetchQuestions();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setDisabled(false);
      setSelectedQuestion(undefined);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  isRequired
                  label="Question ID"
                  variant="bordered"
                  className="p-2 m-2  max-w-md"
                  id="questionID"
                  value={question.questionID || ""}
                  onClear={() => setQuestion({ ...question, questionID: "" })}
                  onChange={(e: any) =>
                    setQuestion({ ...question, questionID: e.target.value })
                  }
                />
                <Input
                  isClearable
                  isRequired
                  label="Question"
                  variant="bordered"
                  className="p-2 m-2  max-w-md"
                  id="name"
                  value={question.name || ""}
                  onClear={() => setQuestion({ ...question, name: "" })}
                  onChange={(e: any) =>
                    setQuestion({ ...question, name: e.target.value })
                  }
                />
                <Select
                  isRequired
                  label="Question Type"
                  variant="bordered"
                  className="p-2 m-2  max-w-md"
                  id="questionType"
                  selectedKeys={[question.questionType]}
                  onChange={(e: any) =>
                    setQuestion({ ...question, questionType: e.target.value })
                  }
                >
                  <SelectItem key={"MCQ"} value={"MCQ"}>
                    MCQ
                  </SelectItem>
                  <SelectItem key={"ShortText"} value={"ShortText"}>
                    Short Text
                  </SelectItem>
                  <SelectItem key={"LongText"} value={"LongText"}>
                    Long Text
                  </SelectItem>
                  <SelectItem key={"NumericalValue"} value={"NumericalValue"}>
                    Numerical Value
                  </SelectItem>
                  <SelectItem key={"MultipleSelect"} value={"MultipleSelect"}>
                    Multiple Select
                  </SelectItem>
                  <SelectItem key={"Blank"} value={"Blank"}>
                    Blank
                  </SelectItem>
                </Select>
                <Select
                  label="Question Category"
                  variant="bordered"
                  className="p-2 m-2  max-w-md"
                  id="questionCategory"
                  selectedKeys={[question.questionCategory]}
                  onChange={(e: any) =>
                    setQuestion({ ...question, questionCategory: e.target.value })
                  }
                >
                <SelectItem key={"SC"} value={"SC"}>
                  Substential Contribution
                </SelectItem>
                <SelectItem key={"Adaption"} value={"Adaption"}>
                  DNSH - Adaptation
                </SelectItem>
                <SelectItem key={"Water"} value={"Water"}>
                  DNSH - Water
                </SelectItem>
                <SelectItem key={"CE"} value={"CE"}>
                  DNSH - CE
                </SelectItem>
                <SelectItem key={"Pollution"} value={"Pollution"}>
                  DNSH - Pollution
                </SelectItem>
                <SelectItem key={"Biodiversity"} value={"Biodiversity"}>
                  DNSH - Biodiversity
                </SelectItem>
                <SelectItem key={"turnover"} value={"turnover"}>
                  Turnover
                </SelectItem>
                <SelectItem key={"capex"} value={"capex"}>
                  CapEx
                </SelectItem>
                <SelectItem key={"opex"} value={"opex"}>
                  OpEx
                </SelectItem>
                <SelectItem key={"Blank"} value={"Blank"}>
                  Blank
                </SelectItem>
                </Select>
                <Input
                  isClearable
                  label="Next Questions"
                  variant="bordered"
                  className="p-2 m-2  max-w-md"
                  id="nextQuestion"
                  value={question.nextQuestion || ""}
                  onClear={() => setQuestion({ ...question, nextQuestion: "" })}
                  onChange={(e: any) =>
                    setQuestion({ ...question, nextQuestion: e.target.value })
                  }
                />
                {question.questionType === "MCQ" && (
                  <MCQ question={question} setQuestion={setQuestion} />
                )}
                {question.questionType === "MultipleSelect" && (
                  <MultipleSelect question={question} setQuestion={setQuestion} />
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="ghost" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="success"
                  variant="ghost"
                  onPress={() => saveQuestion(onClose)}
                  isDisabled={disabled}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}