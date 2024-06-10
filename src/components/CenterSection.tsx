import React from "react";
import Section from "./Section";

type Props = {
    children: React.ReactNode;
    className?: string;
};

const CenterSection = ({ children, className }: Props) => {
    return (
        <Section className={"place-content-center place-items-center text-center  " + className}>
            {children}
        </Section>
    )
}

export default CenterSection;