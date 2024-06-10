import React from "react";

type Props = {
  aligned: number;
  notAligned: number;
  notEligible: number;
};

export enum AlignmentColors {
  ALIGNED = '#6cc784',
  NOT_ALIGNED = '#2b522f',
  NOT_ELIGIBLE = '#a4a5a7',
}

const MultiColorCircularProgress = ({ aligned, notAligned, notEligible }: Props) => {
  const size = 70; // Diameter of the circle
  const strokeWidth = 10; // Width of the circle's stroke
  const radius = (size - strokeWidth) / 2; // Radius of the circle

  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Percentages for each segment (total should be 100)
  const segments = [
    { color: AlignmentColors.ALIGNED, percentage: aligned }, // Aligned is light green
    { color: AlignmentColors.NOT_ALIGNED, percentage: notAligned }, // Not aligned but eligible is dark green
    { color: AlignmentColors.NOT_ELIGIBLE, percentage: notEligible }  // Not eligible is grey
  ];

  let cumulativePercentage = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {segments.map((segment, index) => {
        const segmentLength = (segment.percentage / 100) * circumference;
        const dashArray = `${segmentLength} ${circumference - segmentLength}`;
        const dashOffset = circumference - (cumulativePercentage / 100) * circumference;
        cumulativePercentage += segment.percentage;
        return (
            <circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
        );
      })}
    </svg>
  );
};

export default MultiColorCircularProgress;