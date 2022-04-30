import { Dispatch, SetStateAction, useState } from 'react';
import { useWindupString } from 'windups';
import { TextBubbleStyle } from './TextBubble.style';

interface ITextBubble {
  background: string;
  word: string;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function TextBubble(props: ITextBubble) {
  const proceed = () => {
    skip();
  };
  const [text, { skip }] = useWindupString(props.word, {
    pace: () => 100,
  });

  return (
    <TextBubbleStyle.Container background={props.background} onClick={proceed}>
      <div>{text}</div>
    </TextBubbleStyle.Container>
  );
}
