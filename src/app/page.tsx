import Exam from "@/models/examModels";
import { connect } from "@/dbConfig/dbConfig";
import { Button, Card, CardBody, Spinner } from "@nextui-org/react";
import Link from "next/link";
import CenterSection from "@/components/CenterSection";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

connect();

export default async function Home() {
  const exams = await Exam.find({});

  return (
    <CenterSection>
      <div className="m-[20px] mb-[50px] p-[20px] text-xl">
        <h1 className="text-2xl"> Selection of Activities</h1>
        <p className="text-lg m-2 p-2">
          <InformationCircleIcon className="size-6 inline-block mr-2 " />
          From this list of activity types, please select the activity type to
          which the activity you like to check for taxonomy alignment matches.
          Once you have finished performing an activity assessment, you will be
          taken back to this page so that you can subsequently complete other
          activities of the same or a different type. The evaluation of the
          taxonomy alignment of your activities can be found in the Dashboard
          section. As soon as you complete the assessment for a new activity,
          the dashboard is automatically updated.
        </p>
      </div>
      <div className="flex-wrap grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10 auto-rows-max auto-cols-max">
        {exams.length === 0 ? (
          <h1>No Assessments are available</h1>
        ) : (
          <>
            {exams.map((exam: any) => (
              <Card
                key={exam._id}
                className="flex  flex-col items-center text-center justify-center h-full w-full  p-4 m-4 "
              >
                <h2 className="m-1 text-xl">{exam.name}</h2>
                <p className="m-1">Category: {" " + exam.category}</p>
                <Link href={`/exams/${exam._id}`}>
                  <Button className="m-1 p-2" variant="ghost">
                    {" "}
                    Start Evaluation
                  </Button>
                </Link>
              </Card>
            ))}
          </>
        )}
      </div>
    </CenterSection>
  );
}

export const dynamic = "force-dynamic";
