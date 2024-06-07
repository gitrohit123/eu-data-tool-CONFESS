import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, className }: Props) => {
  return (
    <div
      className={
        "flex flex-col pt-[70px] min-h-screen w-full px-24 sm:pb-[30px] md:pb-[100px] " +
        className
      }
    >
      {children}
    </div>
  );
};

export default Section;