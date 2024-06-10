import React from "react";
import {
  Button,
  Image,
  Card,
  CardFooter,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

type Props = {
  onSelectPlan: () => void;
};

const options = [
  {
    title: "Self-Assessment",
    description:
      "Use the self-assessment to familiarize yourself with the requirements of the EU taxonomy for your economic activities and to get an initial overview of the potential taxonomy alignment of your activities. ",
    available: true,
  },
  {
    title: "Expert Check",
    description:
      "Our experts check your statements in the self-assessment and verify the taxonomy alignment of your activities based on additional documents you upload as proof of your statements.",
    available: false,
  },
  {
    title: "3rd Party Verification",
    description:
      "An independent third party checks your statements in the self-assessment and verifies the taxonomy alignment of your activities based on additional documents you upload as proof of your statements. ",
    available: false,
  },
];

const LandingPage: React.FC<Props> = ({ onSelectPlan }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Image width={300} alt="Logo" src="/logo.png" />
      <br />

      <div className="w-[800px]">
        <h1
          className="flex justify-center"
          style={{ fontSize: "40px", marginBottom: "20px" }}
        >
          Welcome to the EU Data Tool
        </h1>
        <p>
          Our aim is to support (in particular smaller) companies in their
          sustainability reporting based on the EU Taxonomy.
          <br />
          <br />
          The EU Taxonomy provides a standardized framework for classifying
          environmentally sustainable economic activities and is intended to
          help direct capital flows into such sustainable economic activities.
          <br />
          <br />
          Our tool offers you the opportunity to get an initial overview of the
          taxonomy conformity of your activities, while at the same time
          familiarizing you with the requirements of the EU taxonomy. In
          addition, the tool offers a detailed evaluation of your data and, if
          desired, a review by our experts or independent third parties.
          <br />
          <br />
          If you are new to taxonomy reporting, we recommend starting with the
          self-assessment. You can upgrade to the other options at any time.
        </p>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {options.map((option) => (
            <div
              key={option.title}
              style={{ flexBasis: "200px", flexGrow: 1, margin: "10px" }}
            >
              <Card>
                <CardHeader>
                  <h2 className="text-large">{option.title}</h2>
                </CardHeader>
                <CardBody>{option.description}</CardBody>
                <CardFooter
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    onClick={option.available ? onSelectPlan : () => {}}
                    style={{
                      backgroundColor: option.available ? "#34a474" : "dark",
                      color: option.available ? "white" : "dark",
                    }}
                  >
                    Choose Option
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default LandingPage;
