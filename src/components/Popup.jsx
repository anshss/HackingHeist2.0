import React, { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import "./popup.scss";



function Popup() {
  const handelSubmit = () => {};

  const [walletConnected, setWalletConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const web3ModalRef = useRef();


  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };


  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);


  const renderButton = () => {
    if (walletConnected) {
      return(
        <div>
        <button className="btnconnect">WalletConnected</button>
      </div>
      )
      }
      else {
      return (
        <button onClick={connectWallet} className="btnconnect">
          Connect your wallet
        </button>
      );
    }
  };


  return (
    <div className="bg-gray-500 w-1/2 h-72 p-8 absolute z-50 bg-opacity-90 flex justify-center flex-col rounded-md">
      <h3 className="mb-12 text-2xl font-medium text-white">
        ENTER YOUR EMAIL
      </h3>
      {/* <p className="mb-8 font-medium text-gray-300"> */}
        {/* We will be sending you warm greetings on this email each year. </p> */}

      <div class="relative mb-12">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg
            class="w-5 h-5 text-gray-500 "
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
          </svg>
        </div>
        <div className="flex gap-2 justify-center items-center">
          <input
            type="text"
            id="input-group-1"
            class="bg-gray-300 border text-gray-700 border-gray-500  text-sm rounded-lg  block w-full pl-10 p-2.5  "
            placeholder="name@flowbite.com"
          />
          <button
            onClick={handelSubmit}
            type="submit"
            class=" text-white bg-black hover:bg-[#fff] hover:text-black border-none  font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </div>
      </div>
        <div className="btnconnect">{renderButton} Connect Your Wallet</div>
    </div>
  );
}

export default Popup;
