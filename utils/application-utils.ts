import { ApplicationQuestionData } from 'bookem-shared/src/types/database';

/**
 * Convert survey questions to application questions
 * @param surveyQuestions - survey questions that fit surveyJS model
 * @returns application questions that fit our database model
 */
export const convertSurveyToApplicationQuestions = (
  surveyQuestions: any
): ApplicationQuestionData[] => {
  let applicationQuestions: ApplicationQuestionData[] = [];
  surveyQuestions.pages.forEach(page => {
    page.elements.forEach(element => {
      const question = {
        type: element.type,
        title: element.title ?? element.name,
        choices: [] as string[],
        isRequired: element.isRequired ?? false,
      };

      if (element.choices) {
        question.choices = element.choices.map(choice => choice.text ?? choice);

        if (element.showNoneItem) question.choices.push('None');
        if (element.showOtherItem) question.choices.push('Other');
        if (element.showSelectAllItem) question.choices.push('Select All');
      }

      applicationQuestions.push(question);
    });
  });
  return applicationQuestions;
};

/**
 * Convert application questions to survey questions
 * @param applicationQuestion - application questions that fit our database model
 * @returns survey questions that fit surveyJS model
 */
export const convertApplicationToSurveyQuestions = (
  applicationQuestion: ApplicationQuestionData[]
) => {
  return {
    pages: [
      {
        name: 'Page 1',
        elements: applicationQuestion.map(question => {
          return {
            name: question.title,
            title: question.title,
            type: question.type,
            choices: question.choices
              ?.filter(choice => {
                return !['None', 'Other', 'Select All'].includes(
                  choice as string
                );
              })
              .map(choice => {
                return { text: choice };
              }),
            isRequired: question.isRequired,
            showNoneItem: question.choices?.includes('None'),
            showOtherItem: question.choices?.includes('Other'),
            showSelectAllItem: question.choices?.includes('Select All'),
          };
        }),
      },
    ],
  };
};
