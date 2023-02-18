import Head from "next/head";
import _app from 'next/app';
import Home from '../components/Home';

const Main = () => {
  
  return (
    <div className="">
      <Head>
        <title>Brain Boost</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Home />
      </main>
    </div>
  );
};



export default Main;