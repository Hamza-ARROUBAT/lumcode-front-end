import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReward } from 'react-rewards';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import TextBubble from '../components/TextBubble';
import { result, themeState } from '../store';

const Ide = dynamic(import('../components/Ide'), {
  ssr: false,
});

const Home: NextPage = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [background, setBackground] = useState('hsl(0deg 0% 0% / 0.075)');

  const [bubbleText, setBubbleText] = useState([
    'Try to display "Hello World" in the console !',
    '🎉',
    'Good Job ! look u printed "Hello World" in the console !',
    'The beginning of a developer journey! 🙌',
  ]);
  const [bubbleQuestions, setBubbleQuestions] = useState([0]);
  const [step, setStep] = useState(0);
  // const [isTextSkipped, setIsTextSkipped] = useState(false);

  const [isQuestioning, setIsQuestioning] = useState(false);
  const [answerStep, setAnswerStep] = useState(0);
  const [goodAnswers, setGoodAnswers] = useState(['Hello World']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const resultSelector = useRecoilValue(result);
  const [isLoading, setIsLoading] = useState(true);

  const { reward, isAnimating } = useReward('rewardId', 'confetti');
  const wokege = () => {
    setBackground('greenyellow');
    reward();
    setStep(step + 1);
    setIsQuestioning(false);
    setInterval(() => {
      setBackground('hsl(0deg 0% 0% / 0.075)');
    }, 1500);
  };
  const sadge = () => {
    setBackground('red');
  };

  useEffect(() => {
    setCorrectAnswer(goodAnswers[answerStep]);
  }, []);

  useEffect(() => {
    if (resultSelector.isCorrect) {
      wokege();
    } else if (resultSelector.isWrong) {
      sadge();
    }
  }, [resultSelector]);

  return (
    <Container theme={theme}>
      <Head>
        <title>LumCode</title>
        <meta name="description" content="LumCode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header theme={theme}>
        <div>
          <Image
            src={theme == 'light' ? '/light.svg' : '/dark.svg'}
            width={25}
            height={25}
            onClick={() => {
              if (theme == 'light') {
                setTheme('dark');
              } else {
                setTheme('light');
              }
            }}
          />
        </div>
      </Header>
      <Body>
        {!isLoading && (
          <TextBubble
            theme={theme}
            background={background}
            bubbleText={bubbleText}
            word={bubbleText[step]}
            bubbleQuestions={bubbleQuestions}
            isQuestioning={isQuestioning}
            setIsQuestioning={setIsQuestioning}
            step={step}
            setStep={setStep}
          />
        )}
        <Ide
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isQuestioning={isQuestioning}
          correctAnswer={correctAnswer}
          setIsWrong={setIsWrong}
        />
      </Body>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  ${(props) =>
    props.theme == 'light'
      ? css`
          background: hsl(0, 0%, 100%);
          color: hsl(0, 0%, 12.5%);
        `
      : css`
          background: hsl(0, 0%, 16.5%);
          color: hsl(0, 0%, 100%);
        `}
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1em 5em;
  margin-bottom: 25px;

  div {
    display: flex;

    cursor: pointer;
    padding: 0.5em;
    border-radius: 50%;
    box-shadow: 0 -1px 4px hsl(0deg 0% 0% / 0.075),
      0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075),
      0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075),
      0 16px 16px hsl(0deg 0% 0% / 0.075);

    transition: background 0.2s;
    :hover {
      background: hsl(0deg 0% 0% / 0.05);
    }
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10em;
`;

export default Home;
