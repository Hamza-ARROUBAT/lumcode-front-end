import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useReward } from 'react-rewards';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import TextBubble from '../components/TextBubble';
import { result } from '../store';

// let isLoading = true;

// const Editor = dynamic(
//   async () => {
//     const imported = await import('../components/Editor');
//     isLoading = false;
//     return imported;
//   },
//   {
//     ssr: false,
//   }
// );

const Editor = dynamic(import('../components/Editor'), {
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
    <Container id="rewardId">
      <Head>
        <title>LumCode</title>
        <meta name="description" content="LumCode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && (
        <TextBubble
          background={background}
          text={bubbleText[step]}
          // isTextSkipped={isTextSkipped}
          // setIsTextSkipped={setIsTextSkipped}
        />
      )}
      <Editor
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
