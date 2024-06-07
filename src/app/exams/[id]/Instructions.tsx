import React from "react";

type Props = {};

const Instructions = ({}: Props) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-1 list-disc text-start my-2">
        <h1 className="text-2xl underline m-2">
          Instructions for the assessment
        </h1>
        <li>Do not refresh the page.</li>
        <li>
          You can use the{" "}
          <span className="font-bold">&quot;Previous&quot;</span> and{" "}
          <span className="font-bold">&quot;Next&quot;</span> buttons to
          navigate between questions.
        </li>
        <li>
          While doing the assessment you can go back and forth to the different
          questions at any time
        </li>

        <li>
          Evaluation dashboard will be created after you actively finish the
          assessment by clicking the respective button
        </li>
      </ul>
    </div>
  );
};

export default Instructions;