interface Question {
    questionCategory: string;
}

export function getCategoryDisplayString(question: Question): String {
    switch (question.questionCategory) {
        case "SC":
        case "turnover":
        case "capex":
        case "opex":
            return "Substantial Contribution Criteria";
        case "Adaptation":
            return "Do No Significant Harm Criteria – Climate Adaptation";
        case "Water":
            return "Do No Significant Harm Criteria – Water";
        case "CE":
            return "Do No Significant Harm Criteria – Circular Economy";        
        case "Pollution":
            return "Do No Significant Harm Criteria – Pollution Prevention";        
        case "Biodiversity":
            return "Do No Significant Harm Criteria – Biodiversity";
        default:
            return "";
    }
}