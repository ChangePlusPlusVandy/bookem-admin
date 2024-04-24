import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react';
import 'survey-core/defaultV2.min.css';
import 'survey-creator-core/survey-creator-core.min.css';
import { useEffect, useState } from 'react';
import { Serializer } from 'survey-core';

//remove a property to the page object. You can't set it in JSON as well
Serializer.removeProperty('panelbase', 'visibleIf');
//remove a property from the base question class and as result from all questions
Serializer.removeProperty('question', 'visibleIf');

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  questionTypes: ['text', 'checkbox', 'radiogroup'],
};

const defaultJson = {
  pages: [
    {
      name: 'Name',
      elements: [
        {
          name: 'FirstName',
          title: 'Enter your first name:',
          type: 'text',
        },
        {
          name: 'LastName',
          title: 'Enter your last name:',
          type: 'text',
        },
      ],
    },
  ],
};

export default function SurveyCreatorWidget() {
  useEffect(() => {
    const creator = new SurveyCreator(creatorOptions);
    creator.text =
      window.localStorage.getItem('survey-json') || JSON.stringify(defaultJson);

    creator.toolbox.forceCompact = true;
    creator.showSaveButton = true;

    creator.saveSurveyFunc = (saveNo, callback) => {
      window.localStorage.setItem('survey-json', creator.text);
      callback(saveNo, true);
    };

    creator.onShowingProperty.add(function (sender, options) {
      if (options.obj.getType() == 'survey') {
        options.canShow = options.property.name == 'title';
      }
    });

    setCreator(creator);
  }, []);

  const [creator, setCreator] = useState<SurveyCreator | null>(null);

  if (!creator) return <>Loading...</>;

  return <SurveyCreatorComponent creator={creator} />;
}

export { getServerSideProps } from '@/lib/getServerSideProps';

// function saveSurveyJson(url, json, saveNo, callback) {
//   fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//     body: JSON.stringify(json)
//   })
//   .then(response => {
//     if (response.ok) {
//       callback(saveNo, true);
//     } else {
//       callback(saveNo, false);
//     }
//   })
//   .catch(error => {
//     callback(saveNo, false);
//   });
// }
