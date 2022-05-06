import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useReward } from 'react-rewards';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import TextBubble from '../components/TextBubble';
import { result } from '../store';

const Ide = dynamic(import('../components/Ide'), {
  ssr: false,
});

const Home: NextPage = () => {
  const [isExplaining, setIsExplaining] = useState(false);
  const [background, setBackground] = useState('hsl(0deg 0% 0% / 0.075)');
  const [bubbleText, setBubbleText] = useState([
    'Try to display the word "1" in the console !',
    '🎉',
    'Good Job ! look u printed a word in the console !',
  ]);
  const [step, setStep] = useState(0);
  // const [isTextSkipped, setIsTextSkipped] = useState(false);

  // const [isQuestioning, setIsQuestioning] = useState(false);
  const [answerStep, setAnswerStep] = useState(0);
  const [goodAnswers, setGoodAnswers] = useState(['1', '5']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const resultSelector = useRecoilValue(result);
  const [isLoading, setIsLoading] = useState(true);

  const { reward, isAnimating } = useReward('rewardId', 'confetti');
  const wokege = () => {
    setBackground('greenyellow');
    reward();
    setStep(step + 1);
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
      // sadge();
    }
  }, [resultSelector]);

  return (
    <Container>
      <Head>
        <title>LumCode</title>
        <meta name="description" content="LumCode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && (
        <TextBubble
          background={background}
          word={bubbleText[step]}
          setStep={setStep}
        />
      )}
      <Ide
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        correctAnswer={correctAnswer}
        setIsWrong={setIsWrong}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 0 10em;
`;

export default Home;
