"use client";
import Section from "@/components/Section";
import {
  Button,
  Input,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import QuestionModal from "./QuestionModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

type Props = {
  exam?: any;
  questionData?: any;
};

const EditExamLayout = ({ exam, questionData }: Props) => {
  const router = useRouter();
  const [examData, setExamData] = React.useState({
    name: exam?.name || "",
    category: exam?.category || "",
    duration: exam?.duration || 3600,
  });
  const [questions, setQuestions] = React.useState<any[]>(questionData || []);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedQuestion, setSelectedQuestion] = React.useState<any>();
  const columns = [
    {
      name: "Question ID",
      uid: "questionID",
    },
    {
      name: "Question",
      uid: "name",
    },
    {
      name: "Question Type",
      uid: "questionType",
    },
    {
      name: "Next Questions",
      uid: "nextQuestion",
    },
    {
      name: "Actions",
      uid: "actions",
    },
  ];

  const fetchQuestions = async () => {
    try {
      const questionData = await axios.get(`/api/questions/${exam?._id}`);
      setQuestions(questionData.data.data);
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to fetch questions");
    }
  };

  const handleCancel = () => {
    router.push("/exams");
  };

  const handleSaveExam = async () => {
    try {
      let response;
      if (exam) {
        response = await axios.put(`/api/exams/${exam?._id}`, examData);
      } else {
        response = await axios.post("/api/exams", examData);
      }
      if (response.status === 200) {
        toast.success("Exam saved successfully");
        router.push("/exams");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/questions/${id}`);
      toast.success("Question deleted successfully");
      fetchQuestions();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleEdit = async (question: any) => {
    try {
      setSelectedQuestion(question);
      onOpen();
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const renderCell = (question: any, columnKey: any) => {
    const cellValue = question[columnKey];
    switch (columnKey) {
      case "nextQuestion":
        return (
          <p className="text-bold text-sm capitalize">{cellValue.join(", ")}</p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2 place-items-center place-content-center">
            <Tooltip content="Edit exam">
              <Button onClick={() => handleEdit(question)}>
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <PencilSquareIcon className="size-7" />
                </span>
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete exam">
              <Button onClick={() => handleDelete(question._id)}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <TrashIcon className="size-7" />
                </span>
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
          </div>
        );
    }
  };
  return (
    <Section className="flex-col">
      <h1 className="text-3xl"> {exam ? "Edit Exam" : "Create Exam"}</h1>
      <hr />
      <Tabs
        aria-label="Options"
        className="mt-[30px] w-full"
        size="lg"
        variant="bordered"
        disabledKeys={!exam ? ["questions"] : []}
      >
        <Tab
          key="details"
          title=" Exam Details"
          className="place-content-center place-items-center flex flex-col w-full"
        >
          <div className="flex flex-col w-[450px]">
            <Input
              isClearable
              label="Exam Name"
              variant="bordered"
              className="p-2 m-2  max-w-md"
              type="text"
              id="name"
              value={examData.name}
              onClear={() => setExamData({ ...examData, name: "" })}
              onChange={(e: any) =>
                setExamData({ ...examData, name: e.target.value })
              }
            />
            <Input
              isClearable
              label="Exam Duration"
              variant="bordered"
              className="p-2 m-2  max-w-md"
              id="duration"
              value={examData.duration.toString()}
              onClear={() => setExamData({ ...examData, duration: 0 })}
              onChange={(e: any) =>
                setExamData({ ...examData, duration: parseInt(e.target.value) })
              }
            />
            <Input
              isClearable
              label="Exam Category"
              variant="bordered"
              className="p-2 m-2  max-w-md"
              id="category"
              value={examData.category}
              onClear={() => setExamData({ ...examData, category: "" })}
              onChange={(e: any) =>
                setExamData({ ...examData, category: e.target.value })
              }
            />
            <div className="flex justify-between w-full p-2 m-2">
              <Button variant="ghost" onClick={() => handleCancel()}>
                Cancel
              </Button>
              <Button
                color="success"
                variant="ghost"
                onClick={() => handleSaveExam()}
              >
                Save
              </Button>
            </div>
          </div>
        </Tab>

        <Tab key="questions" title="Questions">
          <QuestionModal
            isOpen={isOpen}
            examID={exam?._id}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
            questionData={selectedQuestion}
            setSelectedQuestion={setSelectedQuestion}
            fetchQuestions={fetchQuestions}
          />
          <div className="flex flex-col">
            <Button
              color="success"
              variant="ghost"
              className="place-self-end"
              onClick={onOpen}
            >
              Add Question
            </Button>
            <>
              <Table aria-label="Exams Table" className="mt-[30px]">
                <TableHeader>
                  {columns.map((column: any) => (
                    <TableColumn
                      key={column.uid}
                      align={column.uid === "actions" ? "center" : "start"}
                      className={column.uid === "actions" ? "text-center" : ""}
                    >
                      {column.name}
                    </TableColumn>
                  ))}
                </TableHeader>
                <TableBody>
                  {questions.map((question: any) => (
                    <TableRow key={question._id}>
                      {columns.map((column: any) => (
                        <TableCell key={question._id + column.uid}>
                          {renderCell(question, column.uid)}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          </div>
        </Tab>
      </Tabs>
    </Section>
  );
};

export default EditExamLayout;
