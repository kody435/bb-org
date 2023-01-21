import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { map } from "ramda";
import SDK from 'weavedb-sdk'
import WeaveDB from "weavedb-client";

import Link from "next/link";

let db;
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

const Home = () => {
  const [Questions, setQuestions] = useState([]);
  const [Users, setUsers] = useState([]);
  const [initDB, setInitDB] = useState(false);

  const getQuestions = async () => {
    setQuestions(await db.cget("Questions", ["title"]));
  };

  const setupWeaveDB = async () => {
    window.Buffer = Buffer;
    db = new SDK({
        contractTxId
    })
    await db.initializeWithoutWallet()

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

  return (
    <div className="flex flex-col h-screen w-screen mt-10 ">
      <div>
        <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-violet-600 text-3xl flex justify-center mb-5">
          Questions
        </h2>
        <div className="text-white mb-5 ">
          {map((v) => (
            <Link href={`/question/${v.data.slug}`}>
              <div className="text-white mx-8 my-2 space-y-4 flex flex-row justify-start items-center space-x-4 p-5 text-xl font-medium bg-gradient-to-l from-sky-600 to-indigo-600 rounded-3xl drop-shadow-xl">
                <div className="bg-transparent">{v.data.title}</div>
              </div>
            </Link>
          ))(Questions)}
        </div>
      </div>
    </div>
  );
};

export default Home;
