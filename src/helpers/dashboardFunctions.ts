interface Question {
    question: string;
    answer: string;
}

interface Activity {
    questions: Question[];
}

export function doesActivityMeetSC(activity: Activity): boolean {
    return activity.questions.some((question: Question) => question.question.includes("meets the Do No"));
}

export const doesActivityMeetAdaption = (activity: Activity): boolean => doesActivityMeetSC(activity) && false;
export const doesActivityMeetWater = (activity: Activity): boolean => doesActivityMeetSC(activity) && false;
export const doesActivityMeetCE = (activity: Activity): boolean => doesActivityMeetSC(activity) && true;
export const doesActivityMeetPollution = (activity: Activity): boolean => doesActivityMeetSC(activity) && true;

export const doesActivityMeetBio = (activity: Activity): boolean =>
    doesActivityMeetSC(activity) && activity.questions.some(question => !question.question.includes("This Data Tool Can Only Assess Activities That Take Place In The EU"));

export const doesActivityMeetAll = (activity: Activity): boolean =>
    doesActivityMeetSC(activity) &&
    doesActivityMeetAdaption(activity) &&
    doesActivityMeetWater(activity) &&
    doesActivityMeetCE(activity) &&
    doesActivityMeetPollution(activity) &&
    doesActivityMeetBio(activity);

const isActivityNotAligned = (activity: Activity): boolean =>
    doesActivityMeetSC(activity) &&
    !(doesActivityMeetAdaption(activity) &&
        doesActivityMeetWater(activity) &&
        doesActivityMeetCE(activity) &&
        doesActivityMeetPollution(activity) &&
        doesActivityMeetBio(activity));

const getFinancialMetricSum = (activityList: any, condition: (activity: Activity) => boolean, metricName: string): number => {
    let sum = 0;
    activityList.forEach((activity: Activity) => {
        if (condition(activity)) {
            const metricQuestion = activity.questions.find(q => q.question.includes(`Query the ${metricName} of the economic activity`));
            if (metricQuestion) {
                sum += parseInt(metricQuestion.answer, 10);
            }
        }
    });
    return sum;
};

export const getNotEligbleTurnoverSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => !doesActivityMeetSC(activity), 'turnover');
export const getNotAlignedTurnoverSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => isActivityNotAligned(activity), 'turnover');
export const getAlignedTurnoverSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => doesActivityMeetAll(activity), 'turnover');

export const getNotEligbleCapExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => !doesActivityMeetSC(activity), 'capex');
export const getNotAlignedCapExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => isActivityNotAligned(activity), 'capex');
export const getAlignedCapExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => doesActivityMeetAll(activity), 'capex');

export const getNotEligbleOpExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => !doesActivityMeetSC(activity), 'opex');
export const getNotAlignedOpExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => isActivityNotAligned(activity), 'opex');
export const getAlignedOpExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => doesActivityMeetAll(activity), 'opex');
