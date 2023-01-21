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
        <h2 className="text-3xl flex justify-center mb-5 text-pink-500">
          Questions
        </h2>
      <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {map((v) => (
        <Link href={`/question/${v.data.slug}`}>
        <div
        class="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-purple-500/10 hover:shadow-purple-500/10"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-10 w-10 text-pink-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 14l9-5-9-5-9 5 9 5z" />
          <path
            d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
          />
        </svg>
        <h2 class="mt-4 text-xl font-bold text-white">{v.data.title}</h2>
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
