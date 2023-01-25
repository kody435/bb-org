import SDK from "weavedb-node-client";
// import WeaveDB from "weavedb-client";
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

export async function getServerSideProps({ query }) {
  let db = new SDK({
    contractTxId: "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o",
    rpc: "grpc.asteroid.ac:443",
  });

  const questions = await db.get(
    "Questions",
    ["slug"],
    ["slug", "=", query.slug]
  );
  // console.log("query.slug= ", query.slug)
  return {
    props: {
      jsondata: JSON.stringify(questions),
      question: questions[0],
    },
  };
}

export default function Question({ question }) {
  return (
    <div className="flex flex-col ml-10 text-black">
      <div className="text-5xl font-bold my-10">{question.title}</div>
      <div className="text-2xl mb-20">{question.question}</div>
      <div className="px-7 py-3 font-bold text-xl rounded-full text-white bg-gradient-to-r from-indigo-500 to-red-500 max-w-fit ">
        Vote : {question.vote}
      </div>
    </div>
  );
}
