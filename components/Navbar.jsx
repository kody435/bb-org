import { useTheme } from "next-themes";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar(props) {
  
  const [navbar, setNavbar] = useState(false);
  const [user, setUser] = useState("");
  
  // I am using NextJS built in themes to change the theme
  // The useTheme hook is used to get the current theme and set the theme
  // const { theme, setTheme } = useTheme("light")

  

  

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
      props.setUsers(accounts[0]);
    } catch (error) {
      alert(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      props.setUsers(account);
    } else {
      alert("No authorized account found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);


  const renderNotConnectedContainer = () => (
    <div className="connect-container">
      <button
        onClick={connectWallet}
        className="font-bold bg-black p-4 text-white rounded-2xl"
      >
        Connect Wallet
      </button>
    </div>
  );

  return (
    <nav className="w-full border-b-2 border-slate-300">
      <div className="justify-between px-4 md:grid-cols-3 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center  justify-between py-3 md:py-5 md:block">
            <Link href="/">
              <h2 className="bg-clip-text text-transparent text-3xl font-bold bg-gradient-to-r from-red-400 to-violet-400 ">
                Brain Boost
              </h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black hover:text-blue-500 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black hover:text-blue-500 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <ul className="items-center justify-center text-center space-y-4 md:flex md:space-x-8 md:space-y-0 text-lg font-bold ">
              <li className="hover:text-blue-600 text-black">
                <Link href="/">Home</Link>
              </li>
              <li className="hover:text-blue-600 text-black">
                <Link href="/Ask-Question">Ask Question</Link>
              </li>
              
              <li className="hover:text-blue-600 text-black">
                <Link href="/">Private Notes</Link>
              </li>
              
            </ul>
          </div>
        </div>
        <div
          className="hidden space-x-2 md:flex "
          onClick={connectWallet}
        >
          {props.users ? (
            <div className="font-bold bg-black p-4 text-white rounded-2xl">
              {props.users.slice(0, 5)}...{props.users.slice(-5)}{" "}
            </div>
          ) : (
            <p></p>
          )}

          {!props.users && renderNotConnectedContainer()}
            {/*
          <li className="flex space-x-2">
            <button onClick={() => setTheme('light')}>🌞</button>
            <button onClick={() => setTheme('dark')}>🌑</button>
          </li>
          */}
        </div>
      </div>
    </nav>
  );
}
