import React from "react";

type Props = {
  duration: number;
};

const Instructions = ({ duration }: Props) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <ul className="flex flex-col gap-1 list-disc text-start my-2">
        <h1 className="text-2xl underline m-2">Instructions</h1>
        <li>Evaluation must be completed in {duration} seconds.</li>
        <li>
          Evaluation will be submitted automatically after {duration} seconds.
        </li>
        <li>Once submitted, you cannot change your selections.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use the{" "}
          <span className="font-bold">&quot;Previous&quot;</span> and{" "}
          <span className="font-bold">&quot;Next&quot;</span> buttons to
          navigate between questions.
        </li>
      </ul>
    </div>
  );
};

export default Instructions;
