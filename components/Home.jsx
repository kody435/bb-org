import Link from 'next/link'
import styles from "./common.module.css";
import { contractTxId, rpc } from "../config"
import SDK from "weavedb-client"
import { useEffect, useState } from "react"
import { Buffer } from "buffer"


const Home = () => {
    const [question, setQuestion] = useState([])
    const [loading, setLoading] = useState(true)

    // Subjects JSON
    const subjects = [{ id: 1, name: "Math" }, { id: 2, name: "Science" }, { id: 3, name: "English" }, { id: 4, name: "History" }, { id: 5, name: "Geography" }, { id: 6, name: "Computer Science" }, { id: 7, name: "Physics" }, { id: 8, name: "Chemistry" }, { id: 9, name: "Biology" }, { id: 10, name: "Economics" }, { id: 11, name: "Accounting" }, { id: 12, name: "Business" }, { id: 13, name: "Psychology" }]

    // WeaveDB Client's DB Config
    const db = new SDK({
        contractTxId: contractTxId,
        rpc: `https://${rpc}`,
    })

    useEffect(() => {
        window.Buffer = Buffer
        (async () => {
            setQuestion(await db.cget("Questions", true))
            setLoading(false)
        })()
    })
    
    return (
        <div className="lg:grid items-start flex flex-col lg:grid-cols-10 mt-10  ">

        {/* Subjects */}
        <div className={styles.grid2}>
            <h2 className="font-bold pl-7 mb-5 px-7 py-2 bg-black text-white w-fit rounded-xl">
            Subjects
            </h2>
            <div className="ml-7">
            {subjects.map((subjects, index) => (
                <div key={index} className="mb-3 font-semibold">
                <div className=''>{subjects.name}</div>
                </div>
            ))}
            </div>
        </div>
        
        {/* Question */}
            <div className={styles.grid1}>
                <div className="">
                    <div className="border-2 bg-gradient-to-l from-cyan-500 to-blue-500 border-gray-200 rounded-t-3xl py-10 lg:mr-10 pl-5" >
                        <h1 className="text-5xl bg-transparent text-white font-extrabold flex mb-10">Have Questions ?</h1>
                        <Link href="/Ask-Question" className="bg-black border-2 border-black hover:border-white text-white rounded-full py-3 px-8 font-bold hover:bg-white hover:text-black">ASK NOW!</Link>
                    </div>
                    
                    <div className="border-2 border-y-0 border-gray-200 lg:mr-10 ">
                                
                        {/* Questions Mapping */}
                                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home