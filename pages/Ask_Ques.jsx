import React, { useState, useEffect, useRef } from "react";
import styles from "../components/common.module.css";
import SDK from "weavedb-sdk";
// import WeaveDB from "weavedb-client";

let db;
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

const Ask_Ques = () => {
  const [user, setUser] = useState([]);
  const [titles, setTitles] = useState("");
  const [questions, setQuestions] = useState("");
  const [initDB, setInitDB] = useState(false);
  const [loading, setLoading] = useState(true);

  const setupWeaveDB = async () => {
    window.Buffer = Buffer;
    db = new SDK({
      contractTxId,
    });
    await db.initializeWithoutWallet();
    // db = new WeaveDB({
    //   contractTxId: contractTxId,
    //   rpc: "http://localhost:8080",
    // });

    setInitDB(true);
  };
  useEffect(() => {
    setupWeaveDB();
  }, []);

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    const accounts = await ethereum.request({ method: "eth_accounts" });
    setUser(accounts);

    if (!ethereum) {
      alert("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setUser(account);
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const addQuestion = async (e) => {
    const { ethereum } = window;
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      console.log("addQuestion");
      setLoading(true)

         const query = await db.add(
        {
            title: titles,
            question: questions,
            user_address: user,
            slug: titles.split(" ").join("-").toLowerCase(),
        },
        "Questions"
      );
      console.log("query: ", query);
      setLoading(false)
    } else {
      alert("Make sure you have metamask or you haven't connected it!");
      return;
    }
  };

  return (
    <div className={styles.quest}>
      <title>Brain Boost</title>
      <div className="bg-gradient-to-bl from-sky-500 to-indigo-600 w-screen h-screen">
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
                className="w-fit flex items-center justify-center font-bold py-5 text-center px-12 rounded-full border-2 border-white hover:bg-black hover:border-blue-700 bg-white text-black hover:text-white duration-700"
                onClick={addQuestion}
                disabled={loading}
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

export default Ask_Ques;
