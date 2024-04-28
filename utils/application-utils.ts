import { ApplicationQuestionData } from 'bookem-shared/src/types/database';

export const convertSurveyToApplicationQuestions = (
  surveyQuestions: any
): ApplicationQuestionData[] => {
  let applicationQuestions: ApplicationQuestionData[] = [];
  surveyQuestions.pages.forEach(page => {
    page.elements.forEach(element => {
      const question = {
        type: element.type,
        title: element.title,
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

export const convertApplicationToSurveyQuestions = applicationQuestion => {
  return {
    pages: [
      {
        name: 'Page 1',
        elements: applicationQuestion.map(question => {
          return {
            name: question.title,
            title: question.title,
            type: question.type,
            choices: question.choices?.map(choice => {
              return { text: choice };
            }),
          };
        }),
      },
    ],
  };
};
