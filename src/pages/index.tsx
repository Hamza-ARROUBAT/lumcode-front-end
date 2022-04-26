import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TextBubble from '../components/TextBubble';
import { useReward } from 'react-rewards';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isExplaining, setIsExplaining] = useState(false);
  const [background, setBackground] = useState('hsl(0deg 0% 0% / 0.075)');
  const [bubbleText, setBubbleText] = useState([
    'Try to display the word "1" in the console !',
    '🎉',
    'Good Job ! look u printed a word in the console !',
  ]);
  const [step, setStep] = useState(0);
  const [isTextSkipped, setIsTextSkipped] = useState(false);

  const [isQuestioning, setIsQuestioning] = useState(false);

  const [answerStep, setAnswerStep] = useState(0);
  const [goodAnswers, setGoodAnswers] = useState(['1', '5']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const { reward, isAnimating } = useReward('rewardId', 'confetti');
  const wokege = () => {
    setBackground('greenyellow');
    reward();
    setStep(step + 1);
  };
  const sadge = () => {
    setBackground('red');
  };

  const Editor = dynamic(
    async () => {
      const imported = await import('../components/Editor');
      setIsLoading(false);
      return imported;
    },
    {
      ssr: false,
    }
  );

  useEffect(() => {
    if (isTextSkipped) {
      setCorrectAnswer(goodAnswers[answerStep]);
      setIsExplaining(false);
      setIsQuestioning(true);
    }
  }, [isTextSkipped]);

  useEffect(() => {
    if (isCorrect) {
      wokege();
      setIsCorrect(false);
      setIsQuestioning(false);
    } else if (isWrong) {
      sadge();
    }
  }, [isCorrect, isWrong]);

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
          text={bubbleText[step]}
          isTextSkipped={isTextSkipped}
          setIsTextSkipped={setIsTextSkipped}
        />
      )}
      <Editor
        isExplaining={isExplaining}
        isQuestioning={isQuestioning}
        setIsQuestioning={setIsQuestioning}
        correctAnswer={correctAnswer}
        setIsCorrect={setIsCorrect}
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
