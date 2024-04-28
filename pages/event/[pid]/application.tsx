import { SurveyCreatorComponent, SurveyCreator } from 'survey-creator-react';
import 'survey-core/defaultV2.min.css';
import 'survey-creator-core/survey-creator-core.min.css';
import { useEffect, useState } from 'react';
import { Serializer } from 'survey-core';
import Link from 'next/link';
import Image from 'next/image';
import {
  ApplicationQuestionData,
  ApplicationResponseData,
  QueriedVolunteerEventDTO,
  VolunteerApplicationData,
} from 'bookem-shared/src/types/database';
import { useRouter } from 'next/router';
import mongoose from 'mongoose';
import { message } from 'antd';
import {
  convertApplicationToSurveyQuestions,
  convertSurveyToApplicationQuestions,
} from '@/utils/application-utils';

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
  const router = useRouter();
  const { pid } = router.query;
  const [event, setEvent] = useState<QueriedVolunteerEventDTO>();
  const [surveyQuestions, setSurveyQuestions] = useState<any>();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const creator = new SurveyCreator(creatorOptions);

    // Load the event data
    fetch('/api/event/' + pid)
      .then(res => {
        if (!res.ok) {
          throw new Error(
            'An error has occurred while fetching: ' + res.statusText
          );
        }
        return res.json();
      })
      .then(data => {
        setEvent(data);
      })
      .then(() => {
        creator.survey.title = 'Volunteer Application for ' + event?.name;
      })
      .catch(err => console.error(err));

    // Load the application questions
    fetch('/api/event/' + pid + '/application-questions')
      .then(res => {
        if (!res.ok) {
          throw new Error(
            'An error has occurred while fetching: ' + res.statusText
          );
        }
        return res.json();
      })
      .then(data => {
        // console.log(data);
        // console.log(convertApplicationToSurveyQuestions(data));

        // Set the survey questions after converting the application questions
        setSurveyQuestions(convertApplicationToSurveyQuestions(data));
      })
      .then(() => {
        // Display survey qeustions after state is set
        creator.text = JSON.stringify(surveyQuestions);
      })
      .catch(err => console.error(err));

    creator.toolbox.forceCompact = true;
    creator.showSaveButton = true;
    creator.saveSurveyFunc = (saveNo, callback) => {
      const surveyQuestions = JSON.parse(creator.text);

      const newApplication: VolunteerApplicationData = {
        questions: convertSurveyToApplicationQuestions(surveyQuestions),
        responses: [] as ApplicationResponseData[],
        event: new mongoose.Types.ObjectId(pid as string),
        published: false,
      };
      // console.log(surveyQuestions);
      // console.log(newApplication);

      fetch(`/api/event/${pid}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newApplication),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 'error') {
            messageApi.open({
              content: data.message,
              type: 'error',
            });
          } else {
            messageApi.open({
              content: data.message,
              type: 'success',
            });
          }
        })
        .catch(err => {
          console.error(err);
          messageApi.open({
            content: 'Sorry an internal error occurred',
            type: 'error',
          });
        });

      callback(saveNo, true);
    };

    // creator.onShowingProperty.add(function (sender, options) {
    //   if (options.obj.getType() == 'survey') {
    //     options.canShow = options.property.name == 'title';
    //   }
    // });

    setCreator(creator);
  }, [event?.name, pid, messageApi]);

  const [creator, setCreator] = useState<SurveyCreator | null>(null);

  if (!creator) return <>Loading...</>;

  return (
    <>
      {contextHolder}
      <Link
        href="#"
        onClick={() => window.history.back()}
        style={{
          margin: '0 0 0 20px',
        }}>
        <Image src="/event/arrow-left.svg" alt="" width={48} height={48} />
      </Link>
      <SurveyCreatorComponent creator={creator} />
    </>
  );
}

export { getServerSideProps } from '@/lib/getServerSideProps';
