import SDK from "weavedb-node-client";
// import WeaveDB from "weavedb-client";
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

export async function getServerSideProps({ query }) {
  let db = new SDK({
    contractTxId: "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o",
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
  return (
    <div className="flex flex-col ml-10 text-black">
      <div className="text-4xl font-bold mt-10 mb-4">{question.title}</div>
      <div className="text-2xl font-medium mb-20">{question.question}</div>
      <div className="px-7 py-3 font-extrabold text-lg rounded-full text-white bg-gradient-to-r from-indigo-500 to-red-500 max-w-fit ">
        Vote : {question.vote}
      </div>
    </div>
  );
}
