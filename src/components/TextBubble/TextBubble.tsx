import { TextBubbleStyle } from './TextBubble.style';
import AnimatedText from 'react-animated-text-content';
import { useState } from 'react';

interface ITextBubble {
  text: string;
}

export default function TextBubble({ text }: ITextBubble) {
  const [isTextSkipped, setIsTextSkipped] = useState(false);

  return (
    <TextBubbleStyle.Container onClick={() => setIsTextSkipped(true)}>
      {isTextSkipped ? (
        <>{text}</>
      ) : (
        <AnimatedText
          type="chars"
          interval={0.05}
          duration={0.1}
          animation={{
            y: '-5px',
            ease: 'ease',
          }}
        >
          {text}
        </AnimatedText>
      )}
    </TextBubbleStyle.Container>
  );
}
