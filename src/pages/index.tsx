import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

const Editor = dynamic(() => import('../components/Editor'), { ssr: false });

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>LumCode</title>
        <meta name="description" content="LumCode" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Editor />
    </div>
  );
};

export default Home;
