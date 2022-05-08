import { Dispatch, SetStateAction, useState } from 'react';
import { useWindupString } from 'windups';
import { TextBubbleStyle } from './TextBubble.style';

interface ITextBubble {
  background: string;
  word: string;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function TextBubble(props: ITextBubble) {
  const [isFinished, setIsFinished] = useState(false);

  const proceed = () => {
    if (isFinished) {
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
