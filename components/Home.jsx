import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { map } from "ramda";
import SDK from 'weavedb-sdk'
import WeaveDB from "weavedb-client";

import Link from "next/link";
import styles from "./common.module.css";
// import { key } from "localforage";
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

//const WeaveDB = require("weavedb-client")
let db;

const Home = () => {
  const [Questions, setQuestions] = useState([]);
  const [initDB, setInitDB] = useState(false)

  const setupWeaveDB = async () => {
    window.Buffer = Buffer;
    // db = new SDK({
    //     contractTxId:"sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o"
    // })
    // await db.initializeWithoutWallet()
    const db = new WeaveDB({
      contractTxId: contractTxId,
      rpc: "https://grpc.octulus.tk",
    });
    setInitDB(true);
  };
  useEffect(() => {
    setupWeaveDB();
  }, []);

  useEffect(() => {
    if (initDB) {
      getQuestions();
    }
  }, [initDB]);
  
  const getQuestions = async () => {
    setQuestions(await db.cget("Questions", ["title"]));
  };

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
          <h1 className="text-5xl font-extrabold flex mb-10">Have Questions ?</h1>
          <Link href="/Ask-Question" className="bg-black border-2 border-black text-white rounded-full py-4 px-8 font-bold hover:bg-white hover:text-black">ASK NOW!</Link>
          </div>
          
        <div className="border-2 border-y-0 border-gray-200 mr-10 ">
            {map((v) => (
              <div className="flex flex-col p-4 border-b items-start">
                <div className="flex items-start">
                  {v.data.title}
                </div>

                <Link href={`/question/${v.data.slug}`} className="flex items-end">  
                  <div className="font-bold mt-2 px-3 py-1 border-2 border-black hover:bg-black hover:text-white rounded-full  ">
                    Answer
                  </div>
                </Link>
              </div>
            ))(Questions)}
        </div>
        </div>
        </div>
    </div>
  );
};
  


export default Home;
