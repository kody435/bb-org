import React, { useState, useEffect } from "react";

const LandingPage = () => {
  const [user, setUser] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask -> https://metamask.io/");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setUser(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setUser(account);
    } else {
      console.log("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="h-screen bg-black pt-36">
      {/* Outline & Description */}
      <div className="flex justify-center items-center bg-transparent h-96 flex-col mr-4 ml-4">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-4xl md:text-5xl lg:6xl xl:text-8xl 2xl:text-9xl text-center p-3 mb-5">
          Making the world's knowledge accessible to all
        </h1>
        <h3 className="bg-transparent text-slate-300 text-center mt-5 text-md md:text-xl md:mr-3 md:ml-3 lg:2xl xl:text-4xl 2xl:text-5xl ">
          A decentralized website where people can give answers to questions and
          get rewards
        </h3>
        <button
          className="text-white mt-24 bg-gradient-to-r from-blue-500 to-green-600 px-8 py-6 rounded-2xl text-3xl"
          onClick={connectWallet}
        >
          Share your knowledge
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default LandingPage;
