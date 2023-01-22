import SDK from "weavedb-node-client";

export async function getServerSideProps({ query }) {
  const db = new SDK({
    contractTxId: "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o",
    rpc: "grpc.octulus.tk:8080",
  });
  return {
    props: {
      question: (
        await db.get("Questions", ["slug"], ["slug", "=", query.slug])
      )[0],
    },
  };
}

let db;
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

export default function Question({ question }) {

  {/*
  const addVote = async () => {
    await db.update(
      { "vote" : db.inc(1) },
      "Questions",
      "JiBhSWTiGkdELzJ8vGWF"
    );
  }
  */}

  return (
    <div className="flex flex-col ml-10 text-white">
      <div className="text-5xl font-bold my-10">{question.title}</div>
      <div className="text-2xl mb-10">{question.question}</div>
      <div className="" >Vote : {question.vote}</div>
    </div>
  );
}
