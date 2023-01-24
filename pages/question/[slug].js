import SDK from "weavedb-node-client";
// import WeaveDB from "weavedb-client";
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";
let db

export async function getServerSideProps({ query }) {
  db = new SDK({
    contractTxId: "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o",
    rpc: "grpc.asteroid.ac:443",
  });
  return {
    props: {
      question: (
        await db.get("Questions", ["slug"], ["slug", "=", query.slug],true)
      )[0],
    },
  };
}


export default function Question({ question }) {
  return (
    <div className="flex flex-col ml-10 text-black">
      {/* {jsondata} */}
      <div className="text-5xl font-bold my-10">
      {question.title}
      </div>
      
      <div className="text-2xl mb-10">
      {question.question}
      </div>
      
      <div className="" >Vote : 
      {question.vote}
      </div>
    </div>
  );
}
