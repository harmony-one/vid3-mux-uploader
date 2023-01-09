import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { Helmet } from "react-helmet";

import { config } from "./util/web3/config";

import VideoReels from "./routes/video-reels/VideoReels";
import VideoHome from "./routes/video-home/VideoHome";
import Navigation from "./routes/navigation/Navigation";
import VideoUpload from "./routes/video-upload/VideoUpload";
import Subscribe from "./routes/subscribe/Subscribe";

import "./App.css";
import CheckoutSuccess from "./routes/checkout/CheckoutSuccess";
import CheckoutFailure from "./routes/checkout/CheckoutFailure";


const projectId = process.env.REACT_APP_WALLETCONNECT_PROJECTID!;

const chains = [config.chainParameters];
console.log(projectId)

const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId }),
]);
console.log('provider', { provider } );

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

console.log('client', { wagmiClient })
export const ethereumClient = new EthereumClient(wagmiClient, chains);

function App() {
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>.s.country videos | Harmony</title>
          <meta name="description" content="Description" />
        </Helmet>
        <Routes>
          <Route path="/" element={<Navigation />} >
            <Route path="/" element={<VideoHome />} />
            <Route path="upload/" element={<VideoUpload />} />
            <Route path="subscribe/" element={<Subscribe />} />
          </Route>
          <Route path="/:vanityUrl" element={<VideoReels />} />
          <Route path="success/" element={<CheckoutSuccess />}/>
          <Route path="cancel/" element={<CheckoutFailure />} />
        </Routes>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </WagmiConfig>
    </div>
  );
}

export default App;
