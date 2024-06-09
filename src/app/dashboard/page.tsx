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
  Spinner
} from "@nextui-org/react";
import AlignmentCard from "@/app/dashboard/dashboardComponents/AlignmentCard";
import ActivityDashboardCard from "@/app/dashboard/dashboardComponents/ActivityDashboardCard";
import { EvaluationResult } from "@/app/dashboard/dashboardComponents/ActivityDashboardCard";
import useAuth from "@/context/auth";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  doesActivityMeetSC,
  doesActivityMeetAdaptation,
  doesActivityMeetWater,
  doesActivityMeetCE,
  doesActivityMeetPollution,
  doesActivityMeetBio,
  doesActivityMeetAll,
  getNotAlignedTurnoverSum,
  getAlignedTurnoverSum,
  getNotAlignedCapExSum,
  getAlignedCapExSum,
  getNotAlignedOpExSum,
  getAlignedOpExSum
} from "@/helpers/dashboardFunctions";
import toast from "react-hot-toast";

type Props = {};


const TURNOVER_DEFAULT = 10000;
const CAPEX_DEFAULT = 3000;
const OPEX_DEFAULT = 3000;

const Dashboard = (props: Props) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const [activityList, setActivities] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [totalTurnover, setTotalTurnover] = useState<number>(TURNOVER_DEFAULT);
  const [totalCapEx, setTotalCapEx] = useState<number>(CAPEX_DEFAULT);
  const [totalOpEx, setTotalOpEx] = useState<number>(OPEX_DEFAULT);
  const [totalActivities, setTotalActivities] = useState<number>(0);

  const turnoverAlignedActivitiesTotal = Number(getAlignedTurnoverSum(activityList)) || 0;
  const turnoverNotAlignedActivitiesTotal = Number(getNotAlignedTurnoverSum(activityList)) || 0;
  const turnoverNotEligibleActivitiesTotal = Math.max(0, totalTurnover - turnoverAlignedActivitiesTotal - turnoverNotAlignedActivitiesTotal);

  const capExAlignedActivitiesTotal = Number(getAlignedCapExSum(activityList)) || 0;
  const capExNotAlignedActivitiesTotal = Number(getNotAlignedCapExSum(activityList)) || 0;
  const capExNotEligibleActivitiesTotal = Math.max(0, totalCapEx - capExAlignedActivitiesTotal - capExNotAlignedActivitiesTotal);

  const opExAlignedActivitiesTotal = Number(getAlignedOpExSum(activityList)) || 0;
  const opExNotAlignedActivitiesTotal = Number(getNotAlignedOpExSum(activityList)) || 0;
  const opExNotEligibleActivitiesTotal = Math.max(0, totalOpEx - opExAlignedActivitiesTotal - opExNotAlignedActivitiesTotal);

  const totalAlignedActivitiesTotal = activityList.filter(doesActivityMeetAll).length;
  const totalNotAlignedActivitiesTotal = activityList.filter(activity => !doesActivityMeetSC(activity)).length;
  const totalNotEligibleActivitiesTotal = Math.max(0, totalActivities - totalAlignedActivitiesTotal - totalNotAlignedActivitiesTotal);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/api/users/user");
        const user = response.data.data;
        console.log(user);
        setTotalActivities(user.totalActivities ?? 0);
        setTotalTurnover(user.totalTurnover ?? TURNOVER_DEFAULT);
        setTotalCapEx(user.totalCapEx ?? CAPEX_DEFAULT);
        setTotalOpEx(user.totalOpEx ?? OPEX_DEFAULT);

        const dashboardResponse = await axios.get("/api/dashboard/" + user._id);
        const activities = dashboardResponse.data.data;
        setActivities(activities);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Set loading to false whether success or failure
      }
    };
    getData();
    setModalOpen(true);
  }, []);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const totalActivitiesCorrect = totalActivities >= activityList.length;
    const totalTurnoverTool = Math.max(0, turnoverAlignedActivitiesTotal + turnoverNotAlignedActivitiesTotal);
    const totalTurnoverCorrect = totalTurnover >= totalTurnoverTool;
    const totalCapExTool = Math.max(0, capExAlignedActivitiesTotal + capExNotAlignedActivitiesTotal);
    const totalCapExCorrect = totalCapEx >= totalCapExTool;
    const totalOpExTool = Math.max(0, opExAlignedActivitiesTotal + opExNotAlignedActivitiesTotal);
    const totalOpExCorrect = totalOpEx >= totalOpExTool;

    if (loading) {
      toast.error('Still loading data...');
    } else if (!totalActivitiesCorrect) {
      toast.error('You have submitted more activitites than you entered in the total count: ' + activityList.length);
    } else if (!totalTurnoverCorrect) {
      toast.error('You have submitted a smaller turnover than you entered in the tool for your activities: ' + totalTurnoverTool);
    } else if (!totalCapExCorrect) {
      toast.error('You have submitted a smaller CapEx than you entered in the tool for your activities: ' + totalCapExTool);
    } else if (!totalOpExCorrect) {
      toast.error('You have submitted a smaller OpEx than you entered in the tool for your activities: ' + totalOpExTool);
    } else {

      // Save new total financial metrics for user 
        try {
          setLoading(true);
          toast("Saving...");
          const newUserData = user; // TODO: Add new numbers
          newUserData.totalActivities = totalActivities;
          newUserData.totalTurnover = totalTurnover;
          newUserData.totalCapEx = totalCapEx;
          newUserData.totalOpEx = totalOpEx;

          await axios.put(`/api/users/user/${user?._id}`, newUserData);

        } catch (error: any) {
          toast.error(error.message);
        } finally {
          setModalOpen(false);
          setLoading(false);        }    

    }
  };

  return (
    <Section className="flex-col justify-center items-center">
      <Modal size={'xl'} isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-xl text-default-600" style={{ fontWeight: 'normal' }}>
                Update Total Turnover, CapEx, OpEx
              </ModalHeader>
              <ModalBody className="text-medium text-default-600" style={{ fontWeight: 'normal' }}>
                <p>
                  Reporting in accordance with the EU taxonomy indicates the proportion of taxonomy eligible and taxonomy aligned economic activities.
                </p>
                <p>
                  In order to determine their monetary value, the share of taxonomy eligible and taxonomy-aligned activities in turnover, CapEx and OpEx is calculated and reported.
                  To calculate this, we need to know your total turnover, CapEx and OpEx of the last fiscal year. We also need to know the total number of economic activities your company performs.
                </p>
                <p style={{ marginBottom: '10px' }}>
                  If you do not know and cannot collect the exact total financials of the last year, please estimate:
                </p>
                <div className="w-[200px]">
                  <Input
                    type="number"
                    label="Total Turnover"
                    value={String(totalTurnover)}
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) {
                        value = 0;
                      }
                      setTotalTurnover(value);
                    }}
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
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) {
                        value = 0;
                      }
                      setTotalCapEx(value);
                    }}
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
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) {
                        value = 0;
                      }
                      setTotalOpEx(value);
                    }}
                    isRequired={true}
                    endContent={
                      <span className="text-default-400 text-small">€</span>
                    }
                  />
                </div>
                <div className="w-[200px]">
                  <Input
                    type="number"
                    label="Total Activities"
                    value={String(totalActivities)}
                    onChange={(e) => {
                      let value = Number(e.target.value);
                      if (value < 0) {
                        value = 0;
                      }
                      setTotalActivities(value);
                    }}
                    isRequired={true}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onClick={() => { setModalOpen(false); router.push('/'); }}>
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

      {loading ? (<Spinner size="lg" />) : (
        <div id="loading-section">
          <br />
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
          <div className="flex" style={{ justifyContent: 'center' }}>
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

          {activityList.map((activity: any, index: number) => {
            return (
              <div key={activity.id || index}>
                <ActivityDashboardCard
                  activityName={"Activity " + (index + 1) + " - " + activity.name}
                  substentialContribution={doesActivityMeetSC(activity) ? EvaluationResult.MET : EvaluationResult.NOT_MET}
                  adaption={EvaluationResult.NOT_ASSESSABLE}
                  water={doesActivityMeetWater(activity) ? EvaluationResult.MET : EvaluationResult.NOT_MET}
                  circularEconomy={doesActivityMeetCE(activity) ? EvaluationResult.MET : EvaluationResult.NOT_MET}
                  pollution={doesActivityMeetPollution(activity) ? EvaluationResult.MET : EvaluationResult.NOT_MET}
                  biodiversity={doesActivityMeetBio(activity) ? EvaluationResult.MET : EvaluationResult.NOT_MET}
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
