import Head from "next/head";
import Home from "../components/Home";
import LandingPage from "../components/LandingPage";
import MyApp from "./_app";
import _app from 'next/app';

const Main = (props) => {
  
  return (
    <div className="">
      <Head>
        <title>Brain Boost</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <LandingPage setUsers={props.setUsers} users={props.users} myProp={props.myProp}/>
      </main>
    </div>
  );
};



export default Main;
