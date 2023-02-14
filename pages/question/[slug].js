import SDK from "weavedb-node-client";
const contractTxId = "ALgvvJ7aq7JnGFzamDkBhHnd1NzoXWOcmdrOMHCC3sA";
import { useEffect } from "react";

export async function getServerSideProps({ query }) {
  let db = new SDK({
    contractTxId: "ALgvvJ7aq7JnGFzamDkBhHnd1NzoXWOcmdrOMHCC3sA",
    rpc: "lb.weavedb-node.xyz:443",
  });

  const questions = await db.get(
    "Questions",
    ["slug"],
    ["slug", "=", query.slug]
  );
  // console.log("query.slug= ", query.slug)
  return {
    props: {
        question: (
          await db.get("Questions", ["slug"], ["slug", "=", query.slug])
        )[0],
    }
  };
}

export default function Question({ question }) {

  const answers = [
    {
      answer: "This is the answer",
      vote: 4,
    },
    {
      answer: "This is the answer",
      vote: 10,
    },
    {
      answer: "This is the answer",
      vote: 6,
    },
  ]

  const setupWeaveDB = async () => {
    window.Buffer = Buffer;
    db = new SDK({
      contractTxId: contractTxId,
    });
    await db.initializeWithoutWallet();
    setInitDB(true);
  };

  useEffect(() => {
    setupWeaveDB();
  }, []);

  

  return (
    <div className="flex flex-col ml-10 text-black">
      <div className="text-4xl font-bold mt-10 mb-4">{question.title}</div>
      <div className="text-2xl font-medium mb-10">{question.question}</div>
      <div>
        <h2 className="font-bold text-3xl mt-16 mb-12">Answers</h2>
        <div className="ml-10">
          {answers.map((answer) => (
            <div className="flex flex-col text-black mb-12">
              <div className="text-2xl font-medium mb-3">{answer.answer}</div>
              <div className="px-7 py-3 font-light text-lg rounded-full text-white bg-gradient-to-r from-indigo-500 to-red-500 max-w-fit ">
                Upvote : {answer.vote}
              </div>
              <br></br>
            </div>
          ))}
        </div>
      </div>

      {/* ANSWER */}
      <div className="mb-36 mt-20">
        <h2 className="text-3xl font-bold">Have better answer?</h2>
        <div className="flex flex-col ">
          <div className="flex flex-col mb-10 mt-10 ">
            <textarea
              placeholder="here you go"
              className="rounded-2xl border-2 h-56 w-100 mr-96 border-gray-500 text-xl p-2"
            />
          </div>
          <div className="w-fit flex items-center justify-center font-bold py-4 text-center px-12 rounded-full border-2 border-black duration-700 hover:bg-black hover:text-white ">
            SUBMIT
          </div>
        </div>
      </div>
    </div>
  );
}
