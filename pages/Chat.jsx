import React, { useState } from "react";
import WeaveDB from "weavedb-client";
import { useEffect } from "react";

let db;
const contractTxId = "sPyXyPDKw9uKFs43y7HFvsnKUE7bht3DkBNKA5UcV_o";

const Chat = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    (async () => {
      const db = new WeaveDB({
        contractTxId: contractTxId,
        rpc: "http://localhost:8080",
      });
      setQuestions(await db.get("Questions", 10));;
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div>Chat</div>
      <div>
        {loading ? (
          <>loading...</>
        ) : (
          <>
            {Object.keys(questions).map((k) => {
              const q = questions[k];
              return <><div>{q.title}</div></>;
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
