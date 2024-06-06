interface Question {
    question: string;
    answer: string;
    category: string;
}

interface Activity {
    questions: Question[];
}

// Substantial Contribution Criteria
export function doesActivityMeetSC(activity: Activity): boolean {
    const scQuestions = activity.questions.filter((question: Question) => question.category === "SC");
    if (scQuestions.length === 0) {
    return false; // Default to true if there are no SC questions
    }
    const allSCQuestionsWereAnsweredYes = scQuestions.every((question: Question) => question.answer === "Yes");
    return allSCQuestionsWereAnsweredYes;
}

// DNSH - True if all categorized text boxes are filled out, or no questions of that category exist
export function doesActivityMeetCritera(activity: Activity, critera: string): boolean {
    const relevantQuestions = activity.questions.filter((question: Question) => question.category === critera);
    if (relevantQuestions.length === 0) {
        return true; // Default to true if there are no relevant questions of that criteria
    }
    const allRelevantQuestionsWereAnsweredYes = relevantQuestions.every((question: Question) => question.answer !== "result");
    return allRelevantQuestionsWereAnsweredYes;
}

export const doesActivityMeetAdaptation = (activity: Activity): boolean => doesActivityMeetCritera(activity, "Adaptation");
export const doesActivityMeetWater = (activity: Activity): boolean => doesActivityMeetCritera(activity, "Water");
export const doesActivityMeetCE = (activity: Activity): boolean => doesActivityMeetCritera(activity, "CE");
export const doesActivityMeetPollution = (activity: Activity): boolean => doesActivityMeetCritera(activity, "Pollution");

export const doesActivityMeetBio = (activity: Activity): boolean =>
    doesActivityMeetSC(activity) && activity.questions.some(question => !question.question.includes("This Data Tool Can Only Assess Activities That Take Place In The EU"));

export const doesActivityMeetAll = (activity: Activity): boolean =>
    doesActivityMeetSC(activity) &&
    doesActivityMeetAdaptation(activity) &&
    doesActivityMeetWater(activity) &&
    doesActivityMeetCE(activity) &&
    doesActivityMeetPollution(activity) &&
    doesActivityMeetBio(activity);

const isActivityNotAligned = (activity: Activity): boolean =>
    doesActivityMeetSC(activity) &&
    !(doesActivityMeetAdaptation(activity) &&
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

export const getNotAlignedTurnoverSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => isActivityNotAligned(activity), 'turnover');
export const getAlignedTurnoverSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => doesActivityMeetAll(activity), 'turnover');

export const getNotAlignedCapExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => isActivityNotAligned(activity), 'capex');
export const getAlignedCapExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => doesActivityMeetAll(activity), 'capex');

export const getNotAlignedOpExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => isActivityNotAligned(activity), 'opex');
export const getAlignedOpExSum = (activityList: any): number => getFinancialMetricSum(activityList, activity => doesActivityMeetAll(activity), 'opex');
