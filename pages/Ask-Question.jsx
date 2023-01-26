import React, { useState, useEffect, useRef } from "react";
import styles from "../components/common.module.css";
import SDK from "weavedb-sdk";
import Link from "next/link";
import WeaveDB from "weavedb-sdk";


let db;
const contractTxId= "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o" 

export default function Ask_Ques(props) {
  
  const [titles, setTitles] = useState("");
  const [questions, setQuestions] = useState("");
  const [initDB, setInitDB] = useState(false)


  const setupWeaveDB = async () => {
    window.Buffer = Buffer;
    db = new SDK({
      contractTxId: contractTxId,
    })
    await db.initializeWithoutWallet()
    setInitDB(true);
  };

  useEffect(() => {
    setupWeaveDB();
  }, []);

 
  const addQuestion = async () => {
       await db.add({ title: titles, question: questions,vote:0, user_address: props.users, slug: titles.split(" ").join("-").toLowerCase()}, "Questions")
  };

  return (
    props.users === "" ? <div className="p-10 flex flex-col h-screen w-screen justify-center items-center bg-gradient-to-r from-indigo-400 via-blue-400 to-white text-center"><h1 className="bg-transparent text-black font-semibold text-3xl lg:text-5xl mb-10">Pls go to Home page and Login to Metamask</h1><Link href="/" className="bg-white rounded-xl font-bold text-xl mt-10 px-14 py-2 hover:bg-black hover:text-white">Home ↗️</Link></div>:
    <div className={styles.quest}>
      <title>Brain Boost</title>
      <div className=" from-sky-500 to-indigo-600 w-screen h-screen">
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-center items-center text-3xl  bg-clip-text text-transparent bg-gradient-to-l from-green-600 to-blue-500 ">
            Submit question here
          </h1>
          <div className="h-96 w-96 items-center justify-center rounded-3xl ">
            <div className="flex flex-col justify-center items-center ">
              <div className="flex flex-col items-center justify-center h-72">
                <tr className="flex flex-row w-full items-center justify-center text-center ">
                  <td className="text-xl mr-6 text-black ">Title</td>
                  <td className="rounded-2xl">
                    <input
                      type="text"
                      className="text-xl w-56 lg:w-80 rounded-3xl px-4 py-2 bg-white"
                      placeholder="Write the shortest title as per question"
                      value={titles}
                      onChange={(e) => {
                        setTitles(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <br></br>
                <tr className="flex flex-row w-full items-center justify-center">
                  <td className="text-xl mr-3 text-black ">Question</td>
                  <td className="rounded-3xl text-xl">
                    <textarea
                      type="text"
                      className="w-full lg:w-80 rounded-2xl px-4 py-2 bg-white"
                      placeholder="Explain the whole question in detail here"
                      value={questions}
                      onChange={(e) => {
                        setQuestions(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </div>
              <div
                className="w-fit flex items-center justify-center font-bold py-5 text-center px-12 rounded-full border-2 border-black duration-700 hover:bg-black hover:text-white "
                onClick={addQuestion}
              >
                SUBMIT
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


