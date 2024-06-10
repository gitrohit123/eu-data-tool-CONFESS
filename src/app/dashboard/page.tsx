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
  Input,
  Spinner,
} from "@nextui-org/react";
import AlignmentCard from "@/app/dashboard/dashboardComponents/AlignmentCard";
import ActivityDashboardCard from "@/app/dashboard/dashboardComponents/ActivityDashboardCard";
import { EvaluationResult } from "@/app/dashboard/dashboardComponents/ActivityDashboardCard";
import useAuth from "@/context/auth";
import axios from "axios";
import {
  doesActivityMeetSC,
  doesActivityMeetAdaption,
  doesActivityMeetWater,
  doesActivityMeetCE,
  doesActivityMeetPollution,
  doesActivityMeetBio,
  doesActivityMeetAll,
  getNotEligbleTurnoverSum,
  getNotAlignedTurnoverSum,
  getAlignedTurnoverSum,
  getNotEligbleCapExSum,
  getNotAlignedCapExSum,
  getAlignedCapExSum,
  getNotEligbleOpExSum,
  getNotAlignedOpExSum,
  getAlignedOpExSum,
} from "@/helpers/dashboardFunctions";

type Props = {};

const Dashboard = (props: Props) => {
  const { isAuthenticated, user } = useAuth();

  const [activityList, setActivities] = React.useState([]);
  const totalActivities = activityList.length;
  const [loading, setLoading] = React.useState(true);

  const [isModalOpen, setModalOpen] = useState<boolean>(true);
  const [totalTurnover, setTotalTurnover] = useState<number>(10000);
  const [totalCapEx, setTotalCapEx] = useState<number>(3000);
  const [totalOpEx, setTotalOpEx] = useState<number>(3000);

  const turnoverAlignedActivitiesTotal = getAlignedTurnoverSum(activityList);
  const turnoverNotAlignedActivitiesTotal =
    getNotAlignedTurnoverSum(activityList);
  const turnoverNotEligibleActivitiesTotal =
    getNotEligbleTurnoverSum(activityList);

  const capExAlignedActivitiesTotal = getAlignedCapExSum(activityList);
  const capExNotAlignedActivitiesTotal = getNotAlignedCapExSum(activityList);
  const capExNotEligibleActivitiesTotal = getNotEligbleCapExSum(activityList);

  const opExAlignedActivitiesTotal = getAlignedOpExSum(activityList);
  const opExNotAlignedActivitiesTotal = getNotAlignedOpExSum(activityList);
  const opExNotEligibleActivitiesTotal = getNotEligbleOpExSum(activityList);

  const totalAlignedActivitiesTotal =
    activityList.filter(doesActivityMeetAll).length;
  const totalNotEligibleActivitiesTotal = activityList.filter(
    (activity) => !doesActivityMeetSC(activity)
  ).length;
  const totalNotAlignedActivitiesTotal =
    activityList.length -
    totalAlignedActivitiesTotal -
    totalNotEligibleActivitiesTotal;

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("/api/users/user");
      const user = response.data.data;

      const dashboardResponse = await axios.get("/api/dashboard/" + user._id);
      const activities = dashboardResponse.data.data;
      setActivities(activities);
    };
    getData();
    setModalOpen(true);
  }, []);

  const handleSubmit = () => {
    setModalOpen(false);
    setLoading(false);
  };

  return (
    <Section className="flex-col justify-center items-center">
      <Modal
        size={"xl"}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader
                className="text-xl text-default-600"
                style={{ fontWeight: "normal" }}
              >
                Update Total Turnover, CapEx, OpEx
              </ModalHeader>
              <ModalBody
                className="text-medium text-default-600"
                style={{ fontWeight: "normal" }}
              >
                <p>
                  Reporting in accordance with the EU taxonomy indicates the
                  proportion of taxonomy eligible and taxonomy aligned economic
                  activities.
                </p>
                <p>
                  In order to determine their monetary value, the share of
                  taxonomy eligible and taxonomy-aligned activities in turnover,
                  CapEx and OpEx is calculated and reported. To calculate this,
                  we need to know your total turnover, CapEx and OpEx of the
                  last fiscal year.
                </p>
                <p style={{ marginBottom: "10px" }}>
                  If you do not know and cannot collect the exact total
                  financials of the last year, please estimate:
                </p>
                <div className="w-[200px]">
                  <Input
                    type="number"
                    label="Total Turnover"
                    value={String(totalTurnover)}
                    onChange={(e) => setTotalTurnover(Number(e.target.value))}
                    isRequired={true}
                    endContent={
                      <span className="text-default-400 text-small">€</span>
                    }
                  />
                </div>
                <div className="w-[200px]">
                  <Input
                    type="number"
                    label="Total CapEx"
                    value={String(totalCapEx)}
                    onChange={(e) => setTotalCapEx(Number(e.target.value))}
                    isRequired={true}
                    endContent={
                      <span className="text-default-400 text-small">€</span>
                    }
                  />
                </div>
                <div className="w-[200px]">
                  <Input
                    type="number"
                    label="Total OpEx"
                    value={String(totalOpEx)}
                    onChange={(e) => setTotalOpEx(Number(e.target.value))}
                    isRequired={true}
                    endContent={
                      <span className="text-default-400 text-small">€</span>
                    }
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button color="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {loading ? (
        <Spinner size="lg" />
      ) : (
        <div id="loading-section">
          <br />
          <div className="flex items-center justify-center">
            <Card className="w-[600px]">
              <CardHeader>
                <div className="flex flex-col">
                  <p className="text-xl">Report: CONFESS</p>
                  <p className="text-small text-default-500">
                    For {isAuthenticated && user.name}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-xs italic">
                  Disclaimer: The evaluation is based on the information
                  provided in the tool. No verifications were conducted.
                </p>
                <br />
                <p className={"text-small"}>
                  Total Number of Activities: {totalActivities}
                </p>
                <br />
                <p className={"text-small"}>
                  Total Turnover: {totalTurnover.toLocaleString()} €
                </p>
                <p className={"text-small"}>
                  Total CapEx: {totalCapEx.toLocaleString()} €
                </p>
                <p className={"text-small"}>
                  Total OpEx: {totalOpEx.toLocaleString()} €
                </p>
              </CardBody>
            </Card>
          </div>

          <div className="flex" style={{ justifyContent: "center" }}>
            <AlignmentCard
              title={"Turnover"}
              alignedActivitiesTotal={turnoverAlignedActivitiesTotal}
              notAlignedActivitiesTotal={turnoverNotAlignedActivitiesTotal}
              notEligibleActivitiesTotal={turnoverNotEligibleActivitiesTotal}
              total={totalTurnover}
              showEuro={true}
            />
            <Spacer x={4} />
            <AlignmentCard
              title={"CapEx"}
              alignedActivitiesTotal={capExAlignedActivitiesTotal}
              notAlignedActivitiesTotal={capExNotAlignedActivitiesTotal}
              notEligibleActivitiesTotal={capExNotEligibleActivitiesTotal}
              total={totalCapEx}
              showEuro={true}
            />
          </div>
          <div className="flex" style={{ justifyContent: "center" }}>
            <AlignmentCard
              title={"OpEx"}
              alignedActivitiesTotal={opExAlignedActivitiesTotal}
              notAlignedActivitiesTotal={opExNotAlignedActivitiesTotal}
              notEligibleActivitiesTotal={opExNotEligibleActivitiesTotal}
              total={totalOpEx}
              showEuro={true}
            />
            <Spacer x={4} />
            <AlignmentCard
              title={"# of Activities"}
              alignedActivitiesTotal={totalAlignedActivitiesTotal}
              notAlignedActivitiesTotal={totalNotAlignedActivitiesTotal}
              notEligibleActivitiesTotal={totalNotEligibleActivitiesTotal}
              total={totalActivities}
              showEuro={false}
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
                  Disclaimer: The evaluation is based on the information
                  provided in the tool. No verifications were conducted.
                </p>
                <br />
                <p className="text-small" style={{ margin: "5px" }}>
                  Legend
                </p>
                <div style={{ justifyContent: "left", marginLeft: "10px" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%", // to make it a circle
                        backgroundColor: EvaluationResult.MET,
                      }}
                    ></div>
                    <div className={"text-xs"} style={{ margin: "10px" }}>
                      Criteria met
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%", // to make it a circle
                        backgroundColor: EvaluationResult.NOT_MET,
                      }}
                    ></div>
                    <div className={"text-xs"} style={{ margin: "10px" }}>
                      Criteria not met
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%", // to make it a circle
                        backgroundColor: EvaluationResult.NOT_ASSESSABLE,
                      }}
                    ></div>
                    <div className={"text-xs"} style={{ margin: "10px" }}>
                      Criteria not assessable
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          <br />

          {activityList.map((activity: any, index: number) => {
            return (
              <div key={activity.id || index}>
                <ActivityDashboardCard
                  activityName={
                    "Activity " + (index + 1) + " - " + activity.name
                  }
                  substentialContribution={
                    doesActivityMeetSC(activity)
                      ? EvaluationResult.MET
                      : EvaluationResult.NOT_MET
                  }
                  adaption={
                    doesActivityMeetAdaption(activity)
                      ? EvaluationResult.MET
                      : EvaluationResult.NOT_MET
                  }
                  water={
                    doesActivityMeetWater(activity)
                      ? EvaluationResult.MET
                      : EvaluationResult.NOT_MET
                  }
                  circularEconomy={
                    doesActivityMeetCE(activity)
                      ? EvaluationResult.MET
                      : EvaluationResult.NOT_MET
                  }
                  pollution={
                    doesActivityMeetPollution(activity)
                      ? EvaluationResult.MET
                      : EvaluationResult.NOT_MET
                  }
                  biodiversity={
                    doesActivityMeetBio(activity)
                      ? EvaluationResult.MET
                      : EvaluationResult.NOT_MET
                  }
                />
                <br />
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
};

export default Dashboard;
