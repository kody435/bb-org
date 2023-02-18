import Head from "next/head";
import _app from 'next/app';
import LandingPage from '../components/LandingPage';

const Main = () => {
  
  return (
    <div className="">
      <Head>
        <title>Brain Boost</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LandingPage />
      </main>
    </div>
  );
};



export default Main;