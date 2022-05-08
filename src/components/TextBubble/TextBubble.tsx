import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useWindupString } from 'windups';
import { TextBubbleStyle } from './TextBubble.style';

interface ITextBubble {
  background: string;
  bubbleText: string[];
  word: string;
  bubbleQuestions: number[];
  isQuestioning: boolean;
  setIsQuestioning: Dispatch<SetStateAction<boolean>>;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function TextBubble(props: ITextBubble) {
  useEffect(() => {
    if (props.bubbleQuestions.includes(props.step)) {
      props.setIsQuestioning(true);
    }
  }, [props.step]);

  const [isFinished, setIsFinished] = useState(false);

  const proceed = () => {
    if (isFinished && !props.isQuestioning) {
      props.setStep(props.step + 1);
      setIsFinished(false);
    } else {
      skip();
    }
  };
  const [text, { skip }] = useWindupString(props.word, {
    pace: () => 100,
    onFinished: () => setIsFinished(true),
  });

  return (
    <TextBubbleStyle.Container background={props.background} onClick={proceed}>
      <div>{text}</div>
      {isFinished && <TextBubbleStyle.arrow>{'>'}</TextBubbleStyle.arrow>}
    </TextBubbleStyle.Container>
  );
}
