import SDK from "weavedb-node-client";

export async function getServerSideProps({ query }) {
  const db = new SDK({
    contractTxId: "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o",
    rpc: "localhost:9090",
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
    <div className="flex flex-col ">
      <div className="text-5xl font-bold ml-10 my-10">{question.title}</div>
      <div className="text-2xl ml-10 mb-10">{question.question}</div>
      <div className="ml-10">Vote : {question.vote}</div>
    </div>
  );
}
