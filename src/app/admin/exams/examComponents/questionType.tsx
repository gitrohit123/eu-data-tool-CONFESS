import { Input } from "@nextui-org/react";
import React from "react";

type Props = {
  question: any;
  setQuestion: any;
};

const MCQ = ({ question, setQuestion }: Props) => {
  return (
    <>
      <div className="flex gap-3">
        <Input
          isClearable
          label="A"
          variant="bordered"
          className="p-2 m-2  max-w-md"
          id="A"
          value={question?.options?.A || ""}
          onClear={() =>
            setQuestion({
              ...question,
              options: { ...question.options, A: "" },
            })
          }
          onChange={(e: any) =>
            setQuestion({
              ...question,
              options: { ...question.options, A: e.target.value },
            })
          }
        />
        <Input
          isClearable
          label="B"
          variant="bordered"
          className="p-2 m-2  max-w-md"
          id="B"
          value={question?.options?.B || ""}
          onClear={() =>
            setQuestion({
              ...question,
              options: { ...question.options, B: "" },
            })
          }
          onChange={(e: any) =>
            setQuestion({
              ...question,
              options: { ...question.options, B: e.target.value },
            })
          }
        />
      </div>
      <div className="flex gap-3">
        <Input
          isClearable
          label="C"
          variant="bordered"
          className="p-2 m-2  max-w-md"
          id="C"
          value={question?.options?.C || ""}
          onClear={() =>
            setQuestion({
              ...question,
              options: { ...question.options, C: "" },
            })
          }
          onChange={(e: any) =>
            setQuestion({
              ...question,
              options: { ...question.options, C: e.target.value },
            })
          }
        />
        <Input
          isClearable
          label="D"
          variant="bordered"
          className="p-2 m-2  max-w-md"
          id="D"
          value={question?.options?.D || ""}
          onClear={() =>
            setQuestion({
              ...question,
              options: { ...question.options, D: "" },
            })
          }
          onChange={(e: any) =>
            setQuestion({
              ...question,
              options: { ...question.options, D: e.target.value },
            })
          }
        />
      </div>
    </>
  );
};

const ShortText = () => {
  return <> </>;
};

const LongText = () => {
  return <> </>;
};

const FileUpload = () => {
  return <></>;
};

export { MCQ, ShortText, LongText, FileUpload };
