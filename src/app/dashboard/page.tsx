"use client";
import React, { useState, useEffect } from "react";
import Section from "@/components/Section";
import {
  Spacer,
  CardBody,
  Card,
  CardHeader,
  Divider,
  Modal,
  Button,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalContent,
  Input
} from "@nextui-org/react";
import AlignmentCard from "@/components/AlignmentCard";
import ActivityDashboardCard from "@/components/ActivityDashboardCard";
import { EvaluationResult } from "@/components/ActivityDashboardCard";
import useAuth from "@/context/auth";

type Props = {};

const turnoverAlignedActivitiesTotal= 50000;
const turnoverNotAlignedActivitiesTotal= 19500;
const turnoverNotEligibleActivitiesTotal= 20000;

const capExAlignedActivitiesTotal = 40000;
const capExNotAlignedActivitiesTotal = 1000;
const capExNotEligibleActivitiesTotal = 5000;

const opExAlignedActivitiesTotal = 8000;
const opExNotAlignedActivitiesTotal = 5000;
const opExNotEligibleActivitiesTotal = 15000;

const totalAlignedActivitiesTotal = 2;
const totalNotAlignedActivitiesTotal = 1;
const totalNotEligibleActivitiesTotal = 1;

const totalActivities = totalAlignedActivitiesTotal + totalNotAlignedActivitiesTotal + totalNotEligibleActivitiesTotal;

const Dashboard = (props: Props) => {

  const [isModalOpen, setModalOpen] = useState<boolean>(true);
  const [totalTurnover, setTotalTurnover] = useState<number>(100000);
  const [totalCapEx, setTotalCapEx] = useState<number>(50000);
  const [totalOpEx, setTotalOpEx] = useState<number>(30000);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setModalOpen(true);
  }, []);

  const handleSubmit = () => {
    setModalOpen(false);
  };

  return (
    <Section className="flex-col justify-center items-center">

      <Modal size={'xl'} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-xl" style={{ fontWeight: 'normal' }}>
                Update Total Turnover, CapEx, OpEx
              </ModalHeader>
              <ModalBody className="text-medium" style={{ fontWeight: 'normal' }}>
                <p>
                  Reporting in accordance with the EU taxonomy indicates the proportion of taxonomy eligible and taxonomy aligned economic activities.
                </p>
                <p>
                  In order to determine their monetary value, the share of taxonomy eligible and taxonomy-aligned activities in turnover, CapEx and OpEx is calculated and reported.
                  To calculate this, we need to know your total turnover, CapEx and OpEx of the last fiscal year.
                </p>
                <p style={{ marginBottom: '10px' }}>
                  If you do not know and cannot collect the exact total financials of the last year, please estimate:
                </p>
                <div className="w-[200px]">
                  <Input
                    type="number"
                    label="Total Turnover"
                    value={totalTurnover}
                    onChange={(e) => setTotalTurnover(Number(e.target.value))}
                    isRequired="true"
                    endContent={
                      <span className="text-default-400 text-small">€</span>
                    }
                  />
                </div>
                <div className="w-[200px]">
                  <Input
                    type="number"
                    label="Total CapEx"
                    value={totalCapEx}
                    onChange={(e) => setTotalCapEx(Number(e.target.value))}
                    isRequired="true"
                    endContent={
                      <span className="text-default-400 text-small">€</span>
                    }
                  />
                </div>
                <div className="w-[200px]">
                  <Input
                    type="number"
                    label="Total OpEx"
                    value={totalOpEx}
                    onChange={(e) => setTotalOpEx(Number(e.target.value))}
                    isRequired="true"
                    endContent={
                      <span className="text-default-400 text-small">€</span>
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>


      <div className="flex items-center justify-center">
        <Card className="w-[600px]">
          <CardHeader>
            <div className="flex flex-col">
              <p className="text-xl">Report: CONFESS</p>
              <p className="text-small text-default-500">For {isAuthenticated && user.name}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-xs italic">
              Disclaimer: The evaluation is based on the information provided in the tool.
              No verifications were conducted.
            </p>
            <br />
            <p className={"text-small"}>Total Number of Activities: {totalActivities}</p>
            <br />
            <p className={"text-small"}>Total Turnover: {totalTurnover.toLocaleString()} €</p>
            <p className={"text-small"}>Total CapEx: {totalCapEx.toLocaleString()} €</p>
            <p className={"text-small"}>Total OpEx: {totalOpEx.toLocaleString()} €</p>
          </CardBody>
        </Card>
      </div>


      <div className="flex" style={{ justifyContent: 'center' }}>

        <AlignmentCard
          title={"Turnover"}
          alignedActivitiesTotal={turnoverAlignedActivitiesTotal}
          notAlignedActivitiesTotal={turnoverNotAlignedActivitiesTotal}
          notEligibleActivitiesTotal={turnoverNotEligibleActivitiesTotal}
          total={totalTurnover}
        />

        <Spacer x={4} />
        <AlignmentCard
          title={"CapEx"}
          alignedActivitiesTotal={capExAlignedActivitiesTotal}
          notAlignedActivitiesTotal={capExNotAlignedActivitiesTotal}
          notEligibleActivitiesTotal={capExNotEligibleActivitiesTotal}
          total={totalCapEx}
        />

      </div>
      <div className="flex" style={{ justifyContent: 'center' }}>
        <AlignmentCard
          title={"OpEx"}
          alignedActivitiesTotal={opExAlignedActivitiesTotal}
          notAlignedActivitiesTotal={opExNotAlignedActivitiesTotal}
          notEligibleActivitiesTotal={opExNotEligibleActivitiesTotal}
          total={totalOpEx}
        />
        <Spacer x={4} />
        <AlignmentCard
          title={"# of Activities"}
          alignedActivitiesTotal={totalAlignedActivitiesTotal}
          notAlignedActivitiesTotal={totalNotAlignedActivitiesTotal}
          notEligibleActivitiesTotal={totalNotEligibleActivitiesTotal}
          total={totalActivities}
        />
      </div>

      <br />

      <div className="flex items-center justify-center">
        <Card className="w-[600px]">
          <CardHeader>
            <div className="flex flex-col">
              <p className="text-medium">Activities in Detail</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-xs italic">
              Disclaimer: The evaluation is based on the information provided in the tool.
              No verifications were conducted.
            </p>
            <br />
            <p className="text-small" style={{ margin: '5px' }}>Legend</p>
            <div style={{ justifyContent: 'left', marginLeft: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%', // to make it a circle
                  backgroundColor: EvaluationResult.MET,
                }}></div>
                <div className={"text-xs"} style={{ margin: '10px' }}>Criteria met</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%', // to make it a circle
                  backgroundColor: EvaluationResult.NOT_MET,
                }}></div>
                <div className={"text-xs"} style={{ margin: '10px' }}>Criteria not met</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%', // to make it a circle
                  backgroundColor: EvaluationResult.NOT_ASSESSABLE,
                }}></div>
                <div className={"text-xs"} style={{ margin: '10px' }}>Criteria not assessable</div>
              </div>
            </div>


          </CardBody>
        </Card>
      </div>

      <br />

      <ActivityDashboardCard
        activityName={"Activity 1 - Electricity Generation Using Solar Photovoltaic Technology"}
        substentialContribution={EvaluationResult.MET}
        adaption={EvaluationResult.NOT_MET}
        water={EvaluationResult.MET}
        circularEconomy={EvaluationResult.MET}
        pollution={EvaluationResult.MET}
      />
      <br />
      <ActivityDashboardCard
        activityName={"Activity 2 - Electricity generation from wind power"}
        substentialContribution={EvaluationResult.NOT_MET}
        adaption={EvaluationResult.NOT_MET}
        water={EvaluationResult.MET}
        circularEconomy={EvaluationResult.NOT_MET}
        pollution={EvaluationResult.MET}
      />
      <br />
      <ActivityDashboardCard
        activityName={"Activity 3 - Electricity generation from wind power"}
        substentialContribution={EvaluationResult.MET}
        adaption={EvaluationResult.NOT_MET}
        water={EvaluationResult.NOT_MET}
        circularEconomy={EvaluationResult.MET}
        pollution={EvaluationResult.NOT_MET}
      />

    </Section>
  );
};

export default Dashboard;
