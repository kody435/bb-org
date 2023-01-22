import SDK from "weavedb-node-client";
// import WeaveDB from "weavedb-client";
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

export async function getServerSideProps({ query }) {
  const db = new SDK({
    contractTxId: contractTxId,
    rpc: "lb.weavedb-node.xyz:443",
  });

  // db = new WeaveDB({
  //   contractTxId: contractTxId,
  //   rpc: "https://lb.weavedb-node.xyz:443",
  // });

  const questions = await db.get(
    "Questions",
    ["slug"],
    ["slug", "=", query.slug]
  );
  // console.log("query.slug= ", query.slug)
  return {
    props: {
      jsondata: JSON.stringify(questions),
      question: questions[0]["data"],
    },
  };
}

export default function Question({ jsondata, question }) {
  return (
    <div className="flex flex-col ml-10 text-black">
      {/* {jsondata} */}
      <div className="text-5xl font-bold my-10">
        title:
        {question && question.title != undefined ? (
          <>{question.title}</>
        ) : (
          <></>
        )}
      </div>

      <div className="text-2xl mb-10">
        question:
        {question && question.question != undefined ? (
          <>{question.question}</>
        ) : (
          <></>
        )}
      </div>

      <div className="">
        Vote :
        {question && question.vote != undefined ? <>{question.vote}</> : <></>}
      </div>
    </div>
  );
}
