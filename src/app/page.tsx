import Exam from "@/models/examModels";
import { connect } from "@/dbConfig/dbConfig";
import { Button, Spinner } from "@nextui-org/react";
import Section from "@/components/Section";
import Link from "next/link";
import CenterSection from "@/components/CenterSection";

connect();

export default async function Home() {
  const exams = await Exam.find({});

  return (
    <CenterSection>
      {exams.length === 0 ? (
        <h1>No Exams are available</h1>
      ) : (
        <>
          {exams.map((exam: any) => (
            <div
              key={exam._id}
              className="flex basis-1/3 flex-col items-center text-center justify-center h-[400px] p-4 m-4 border border-gray-200 rounded-lg"
            >
              <h2 className="m-1 text-xl">{exam.name}</h2>
              <p className="m-1">Category: {" " + exam.category}</p>
              <Link href={`/exams/${exam._id}`}>
                <Button className="m-1 p-2" variant="ghost">
                  {" "}
                  Start Evaluation
                </Button>
              </Link>
            </div>
          ))}
        </>
      )}
    </CenterSection>
  );
}
