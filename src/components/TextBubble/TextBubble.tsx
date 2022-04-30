import { TextBubbleStyle } from './TextBubble.style';
import AnimatedText from 'react-animated-text-content';
import { Dispatch, SetStateAction } from 'react';

interface ITextBubble {
  background: string;
  text: string;
  // isTextSkipped: boolean;
  // setIsTextSkipped: Dispatch<SetStateAction<boolean>>;
}

export default function TextBubble(props: ITextBubble) {
  return (
    <TextBubbleStyle.Container
      background={props.background}
      // onClick={() => props.setIsTextSkipped(true)}
    >
      {/* {props.isTextSkipped ? (
        <>{props.text}</>
      ) : ( */}
      {/* <AnimatedText
        type="chars"
        interval={0.05}
        duration={0.1}
        animation={{
          y: '-5px',
          ease: 'ease',
        }}
      >
        {props.text}
      </AnimatedText> */}
      {/* )} */}
      <p>lol</p>
    </TextBubbleStyle.Container>
  );
}
