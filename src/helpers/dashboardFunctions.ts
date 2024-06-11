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
    const atLeastOneSCQuestionAnsweredYes = scQuestions.some((question: Question) => question.answer.trim().toLowerCase() === "yes");
    return atLeastOneSCQuestionAnsweredYes;
}

// DNSH - True if all categorized text boxes are filled out, or no questions of that category exist
export function doesActivityMeetCritera(activity: Activity, critera: string): boolean {
    const relevantQuestions = activity.questions.filter((question: Question) => question.category === critera);
    if (relevantQuestions.length === 0) {
        return true; // Default to true if there are no relevant questions of that criteria
    }
    const allRelevantQuestionsWereAnsweredYes = relevantQuestions.every((question: Question) => question.answer !== "result");

    // TODO: Remove this temporary workaround for Water
    if (critera === "Water") {
        const offshoreQuestion = relevantQuestions.find(
            (question) => question.question.toLowerCase().includes("is your plant offshore?")
        );
        const isOffshore = offshoreQuestion?.answer.trim().toLowerCase() === "yes";
        const allWaterQuestionsAnsweredYes = relevantQuestions
            .every((question) => question.answer.trim().toLowerCase() === "yes");

        return !isOffshore || (isOffshore && allWaterQuestionsAnsweredYes);
    }

    // TODO: Remove this temporary workaround for Adaptation
    if (critera === "Adaptation") {
        const relevantAdaptationQuestions = relevantQuestions.filter(question =>
            question.question.toLowerCase().includes("describe how the risks mentioned above may impact your activity") ||
            question.question.toLowerCase().includes("describe what adaptations you could consider for your activity")
          );

        const allRelevantAdapationQuestionsAnswered = relevantAdaptationQuestions
            .every((question) => question.answer !== "result");

        return allRelevantAdapationQuestionsAnswered;
    }

    return allRelevantQuestionsWereAnsweredYes;
}

// Actvity is not eligible
export function isActivityEligible(activity: Activity): boolean {
    return !activity.questions.some((question) => question.question === "Economic activity is not eligible!");
}

export const doesActivityMeetAdaptation = (activity: Activity): boolean => isActivityEligible(activity) && doesActivityMeetCritera(activity, "Adaptation");
export const doesActivityMeetWater = (activity: Activity): boolean => isActivityEligible(activity) && doesActivityMeetCritera(activity, "Water");
export const doesActivityMeetCE = (activity: Activity): boolean => isActivityEligible(activity) && doesActivityMeetCritera(activity, "CE");
export const doesActivityMeetPollution = (activity: Activity): boolean => isActivityEligible(activity) && doesActivityMeetCritera(activity, "Pollution");

export const doesActivityMeetBio = (activity: Activity): boolean => {
    const isEligible = isActivityEligible(activity);
    const meetsCriteria = doesActivityMeetCritera(activity, "Biodiversity");
    const isNotInEU = activity.questions.some(question => question.question.includes("This Data Tool Can Only Assess Activities That Take Place In The EU"));
    return isEligible && meetsCriteria && !isNotInEU;
};

export const doesActivityMeetAll = (activity: Activity): boolean =>
    doesActivityMeetSC(activity) &&
    doesActivityMeetWater(activity) &&
    doesActivityMeetCE(activity) &&
    doesActivityMeetPollution(activity) &&
    doesActivityMeetBio(activity);

export const isActivityNotAligned = (activity: Activity): boolean =>
    doesActivityMeetSC(activity) &&
    !(doesActivityMeetWater(activity) &&
        doesActivityMeetCE(activity) &&
        doesActivityMeetPollution(activity) &&
        doesActivityMeetBio(activity));

const getFinancialMetricSum = (activityList: any, condition: (activity: Activity) => boolean, metricName: string): number => {
    let sum = 0;
    activityList.forEach((activity: Activity) => {
        if (condition(activity)) {
            const metricQuestions = activity.questions.filter((question: Question) => question.category === metricName);
            metricQuestions.forEach((metricQuestion) => {
                const value = parseInt(metricQuestion.answer, 10);
                if (!isNaN(value)) {
                    sum += value;
                }
            });
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