import React from "react";

import {
  CardBody,
  Card,
  Divider,
  CardHeader
} from "@nextui-org/react"; import Link from "next/link";

export enum EvaluationResult {
  MET = '#34a474',
  DOC_MISSING = '#ffcc67',
  NOT_MET = '#fc7c54',
  NOT_ASSESSABLE = '#7f7f7f'
}

type Props = {
  activityName: String;
  substentialContribution: EvaluationResult;
  adaption: EvaluationResult;
  water: EvaluationResult;
  circularEconomy: EvaluationResult;
  pollution: EvaluationResult;
  biodiversity: EvaluationResult;
};

const ActivityDashboardCard = ({ activityName, substentialContribution, adaption, water, circularEconomy, pollution, biodiversity }: Props) => {

  return (
    <div className="flex items-center justify-center">
      <Card className="w-[600px]">
        <CardHeader>
          <div className="flex flex-col">
            <p className="text-m">{activityName}</p>
          </div>
        </CardHeader>

        <Divider />

        <CardBody>
          <div style={{ display: 'flex', margin: '5px', justifyContent: 'space-between' }}>
            <div>
              <p className={"text-medium"}>Substential Contribution</p>
              <p className="text-small text-default-500">(Climate Change Mitigation)</p>
            </div>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%', // to make it a circle
              backgroundColor: substentialContribution,
              marginRight: '10px'
            }}></div>
          </div>

          <br />

          <p className={"text-medium"} style={{ margin: '5px' }}>Do Not Significant Harm</p>

          <div>
            <div style={{ display: 'flex', margin: '5px 5px 10px 5px', justifyContent: 'space-between' }}>
              <div>
                <p className={"text-small"}>Climate Change Adaptation</p>
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: adaption,
                marginRight: '10px'
              }}></div>
            </div>

            <div style={{ display: 'flex', margin: '5px 5px 10px 5px', justifyContent: 'space-between' }}>
              <div>
                <p className={"text-small"}>Water and Marine Protection</p>
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: water,
                marginRight: '10px'
              }}></div>
            </div>

            <div style={{ display: 'flex', margin: '5px 5px 10px 5px', justifyContent: 'space-between' }}>
              <div>
                <p className={"text-small"}>Circular Economy</p>
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: circularEconomy,
                marginRight: '10px'
              }}></div>
            </div>

            <div style={{ display: 'flex', margin: '5px 5px 10px 5px', justifyContent: 'space-between' }}>
              <div>
                <p className={"text-small"}>Pollution Prevention</p>
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: pollution,
                marginRight: '10px'
              }}></div>
            </div>

            <div style={{ display: 'flex', margin: '5px 5px 10px 5px', justifyContent: 'space-between' }}>
              <div>
                <p className={"text-small"}>Biodiversity</p>
              </div>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: biodiversity,
                marginRight: '10px'
              }}></div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ActivityDashboardCard;