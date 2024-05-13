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
import { Modal, message } from 'antd';
import {
  convertApplicationToSurveyQuestions,
  convertSurveyToApplicationQuestions,
} from '@/utils/application-utils';
import { ExclamationCircleOutlined } from '@ant-design/icons';

//remove a property to the page object. You can't set it in JSON as well
Serializer.removeProperty('panelbase', 'visibleIf');
//remove a property from the base question class and as result from all questions
Serializer.removeProperty('question', 'visibleIf');

const creatorOptions = {
  showLogicTab: true,
  isAutoSave: false,
  questionTypes: ['text', 'checkbox', 'radiogroup'],
};

export default function SurveyCreatorWidget() {
  const router = useRouter();
  const { pid } = router.query;

  const [messageApi, messageContextHolder] = message.useMessage();
  const [modal, modalContextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: 'Confirm',
      icon: <ExclamationCircleOutlined />,
      content: 'Make sure you have saved the application',
      okText: 'Yes',
      onOk() {
        router.back();
      },
      cancelText: 'Cancel',
    });
  };

  useEffect(() => {
    const creator = new SurveyCreator(creatorOptions);

    // Load the event data
    const fetchEventPromise = fetch('/api/event/' + pid)
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
        creator.survey.title = 'Volunteer Application for ' + data.name;
      })
      .catch(err => {
        console.error(err);
        messageApi.open({
          content: "Failed to load the event's data",
          type: 'error',
        });
      });

    // Load the application questions
    const fetchQuestionPromise = fetch(
      '/api/event/' + pid + '/application-questions'
    )
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
        // Display survey qeustions after state is set
        const fetchedSurveyQuestions =
          convertApplicationToSurveyQuestions(data);
        creator.text = JSON.stringify(fetchedSurveyQuestions);
      })
      .catch(err => {
        console.log(err);
        messageApi.open({
          content: "You haven't created an application yet",
          type: 'info',
        });
      });

    creator.toolbox.forceCompact = true;
    creator.showSaveButton = true;
    creator.saveSurveyFunc = (saveNo, callback) => {
      const surveyQuestions = JSON.parse(creator.text);

      const newApplication: VolunteerApplicationData = {
        questions: convertSurveyToApplicationQuestions(surveyQuestions),
        responses: [] as ApplicationResponseData[],
        event: new mongoose.Types.ObjectId(pid as string),
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

    creator.onShowingProperty.add(function (sender, options) {
      if (options.obj.getType() == 'survey') {
        options.canShow = options.property.name == 'title';
      }
    });

    Promise.all([fetchEventPromise, fetchQuestionPromise]).then(() => {
      // console.log('Setting creator:', creator.text);
      setCreator(creator);
    });
    // setCreator(creator);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid]);

  const [creator, setCreator] = useState<SurveyCreator | null>(null);

  if (!creator) return <>Loading...</>;

  return (
    <>
      {messageContextHolder}
      {modalContextHolder}
      <Image
        onClick={confirm}
        src="/event/arrow-left.svg"
        alt=""
        width={48}
        height={48}
        style={{
          margin: '0 0 0 20px',
          cursor: 'pointer',
        }}
      />
      <SurveyCreatorComponent creator={creator} />
    </>
  );
}

export { getServerSideProps } from '@/lib/getServerSideProps';
