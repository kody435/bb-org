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

export default function Question({ question }) {
  return (
    <div className="flex flex-col ml-10">
      <div className="text-5xl font-bold my-10">{question.title}</div>
      <div className="text-2xl mb-10">{question.question}</div>
      <div className="">Vote : {question.vote}</div>
    </div>
  );
}
