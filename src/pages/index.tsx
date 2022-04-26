import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import styled from 'styled-components';
import TextBubble from '../components/TextBubble';

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

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
  return (
    <Container>
      <Head>
        <title>LumCode</title>
        <meta name="description" content="LumCode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!isLoading && (
        <TextBubble text={'Try to display the word "1" in the console !'} />
      )}
      <Editor />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding: 0 5em;
`;

export default Home;
