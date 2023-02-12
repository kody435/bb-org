import SDK from "weavedb-node-client";
// import WeaveDB from "weavedb-client";
const contractTxId = "ALgvvJ7aq7JnGFzamDkBhHnd1NzoXWOcmdrOMHCC3sA";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

export async function getServerSideProps({ query }) {
  let db = new SDK({
    contractTxId: "-x039YqlLK8LBcqORfWRLU4rvQHVW_X6PL4J-jWVuzs",
    rpc: "weavedb-node.xyz:443",
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
      <div>
        <Popup
          trigger={
            <div className="px-7 text-black py-4 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-500 hover:to-blue-500 w-fit rounded-full mb-16 cursor-pointer">
              have better Answer?
            </div>
          }
          modal
          nested
        >
          {(close) => (
            <div className="w-full flex justify-center flex-col mt-10">
              <h2 className="mb-5 flex justify-center font-semibold text-2xl">
                Enter your answer here
              </h2>
              <div className="w-full flex justify-center mb-5">
                <textarea
                  type="text"
                  className="w-full mx-14 rounded-2xl px-4 py-2 bg-white border-2 border-gray-400 h-48"
                  placeholder="Enter your answer here"
                />
              </div>
              <div className="flex justify-center mt-5">
                <div className="flex justify-center mb-10 w-fit px-7 py-3 rounded-3xl bg-gradient-to-l from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"

                >
                  Submit
                </div>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}
