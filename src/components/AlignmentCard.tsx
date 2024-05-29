import React from "react";

import MultiColorCircularProgress from '@/components/MultiColorCircularProgress'; 
import {AlignmentColors} from '@/components/MultiColorCircularProgress'; 
import {
  CardBody,
  Card,
} from "@nextui-org/react";import Link from "next/link";

type Props = {
    title: String;
    alignedActivitiesTotal: number;
    notAlignedActivitiesTotal: number;
    notEligibleActivitiesTotal: number;
    total: number;
  };

const AlignmentCard = ({title, alignedActivitiesTotal, notAlignedActivitiesTotal, notEligibleActivitiesTotal, total}: Props) => {

  return (
        <Card className={"mt-[30px] w-[290px] h-[300px]"}>
            <CardBody>
              <p className={"text-large"}>{title}</p>
              <p className={"text-small text-default-500"}>EU Taxonomy alignment for Clean Energy Activities</p>
              <br/>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <MultiColorCircularProgress 
                aligned={alignedActivitiesTotal/total*100} 
                notAligned={notAlignedActivitiesTotal/total*100} 
                notEligible={notEligibleActivitiesTotal/total*100} 
              />
              </div>
              
              <br/>

              <div className={"text-xs"} style={{display:'flex', margin: '5px', justifyContent:'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%', // to make it a circle
                    backgroundColor: AlignmentColors.ALIGNED,
                    marginRight: '10px'
                  }}></div>
                  Aligned
                </div>
                <div>{alignedActivitiesTotal} € ({Math.round(alignedActivitiesTotal/total*100)}%)</div>
              </div>
              <div className={"text-xs"} style={{display:'flex', margin: '5px', justifyContent:'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: AlignmentColors.NOT_ALIGNED,
                    marginRight: '10px'
                  }}></div>
                  Not aligned but eligible
                </div>
                <div>{notAlignedActivitiesTotal} € ({Math.round(notAlignedActivitiesTotal/total*100)}%)</div>
              </div>
              <div className={"text-xs"} style={{display:'flex', margin: '5px', justifyContent:'space-between'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: AlignmentColors.NOT_ELIGIBLE,
                    marginRight: '10px'
                  }}></div>
                  Not eligible
                </div>
                <div>{notEligibleActivitiesTotal} € ({Math.round(notEligibleActivitiesTotal/total*100)}%)</div>
              </div>
              </CardBody>
          </Card>
  );
};

export default AlignmentCard;