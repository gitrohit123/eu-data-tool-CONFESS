import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Section = ({ children, className }: Props) => {
  return (
    <div
      className={
        "flex pt-[70px] min-h-screen w-full px-24 " +
        className
      }
    >
      {children}
    </div>
  );
};


export default Section;
