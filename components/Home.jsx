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
    <section>
    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <h2 className="text-3xl flex justify-center mb-5 text-blue-500">
          Questions
        </h2>
      <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ">
        {map((v) => (
        <Link href={`/question/${v.data.slug}`}>
        <div
        class="flex border-4 border-white rounded-2xl p-8 justify-start items-center bg-white hover:bg-gradient-to-r from-cyan-500 to-blue-500">
          <h2 class=" text-xl font-bold bg-transparent text-black">{v.data.title.slice(0, 32)}</h2>
        </div>
        </Link>
        ))(Questions)}
      </div>
      </div>
    </div>
    </section>
  );
};
  


export default Home;
