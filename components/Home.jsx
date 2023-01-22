import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { map } from "ramda";
// import SDK from 'weavedb-sdk'
import WeaveDB from "weavedb-client";

import Link from "next/link";
import styles from "./common.module.css";
// import { key } from "localforage";
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

// const WeaveDB = require("weavedb-client")
  let db;

const Home = () => {
  const [Questions, setQuestions] = useState([]);
  const [initDB, setInitDB] = useState(false)
  
  const getQuestions = async () => {
    // const questions = await db.cget("Questions", ["title"]);
    const questions = await db.cget("Questions", 10);
    console.log("questions: ", questions)
    setQuestions(questions);
  };
  

  const setupWeaveDB = async () => {
    window.Buffer = Buffer;
    // db = new SDK({
    //     contractTxId:"sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o"
    // })
    // await db.initializeWithoutWallet()
    db = new WeaveDB({
      contractTxId: contractTxId,
      rpc: "https://lb.weavedb-node.xyz:443",
    });
    setInitDB(true);
  };
  useEffect(() => {
    setupWeaveDB();
  }, []);

  useEffect(() => {
      getQuestions();
  }, []);

  const subjects = [{ id: 1, name: "Math" }, { id: 2, name: "Science" }, { id: 3, name: "English" }, { id: 4, name: "History" }, { id: 5, name: "Geography" }, { id: 6, name: "Computer Science" }, { id: 7, name: "Physics" }, { id: 8, name: "Chemistry" }, { id: 9, name: "Biology" }, { id: 10, name: "Economics" }, { id: 11, name: "Accounting" }, { id: 12, name: "Business" }, { id: 13, name: "Psychology" }]
  
  return (
    <div className="lg:grid flex flex-col lg:grid-cols-10 mt-10 ">

      {/* Subjects */}
      <div className={styles.grid2}>
        <h2 className="font-bold pl-4 mb-5 ">
          Subjects
        </h2>
        <div className="pl-7">
          {subjects.map((subjects, index) => (
              <div key={index} className="mb-3 font-semibold">
              <div className=''>{subjects.name}</div>
              </div>
          ))}
        </div>
      </div>
      
      {/* Question */}
      <div className={styles.grid1}>
        <div className="">
        <div className="border-2 border-gray-200 rounded-t-3xl py-10 mr-10 pl-5" >
          <h1 className="text-5xl font-extrabold flex mb-10">Get Answers for FREE</h1>
          <Link href="/Ask-Question" className="bg-black text-white rounded-full py-3 px-8 ">ASK NOW!</Link>
          </div>
          
        <div className="mb-5 border-2 border-t-0 border-gray-200 mr-10 ">
            {map((v) => (
              <div className="flex flex-row p-4 border-b">
                <div className="">
                  {v.data.title}
                  {v && v.data && v.data.title?(<>{v.data.title}</>):(<> ( NO TITLE ) </>)}
                  

                </div>
                {(v && v.data && v.data.slug)? (<>
                &nbsp; 
                <Link href={`/question/${v.data.slug}`} className="flex justify-end">  
                  <div className="">
                    Answer
                  </div>
                </Link>
                </>):(<>
                  (NO SLUG)
                </>)}
              </div>
            ))(Questions)}
        </div>
        </div>
        </div>
    </div>
  );
};
  


export default Home;
