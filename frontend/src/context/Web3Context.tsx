import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 1337] // Mainnet, Ropsten, Rinkeby, Goerli, Kovan, Local
});

interface Web3ContextType {
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  account: string | null;
  chainId: number | null;
  provider: ethers.providers.Web3Provider | null;
}

const Web3Context = createContext<Web3ContextType>({
  connect: async () => {},
  disconnect: () => {},
  isConnected: false,
  account: null,
  chainId: null,
  provider: null,
});

export const Web3ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const web3React = useWeb3React() as unknown as {
    activate: (connector: InjectedConnector) => Promise<void>;
    deactivate: () => void;
    active: boolean;
    account: string | null;
    chainId: number | null;
    library: ethers.providers.Web3Provider | null;
  };
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    if (web3React.library) {
      setProvider(web3React.library as ethers.providers.Web3Provider);
    }
  }, [web3React.library]);

  const connect = async () => {
    try {
      await web3React.activate(injected);
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const disconnect = () => {
    try {
      web3React.deactivate();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        connect,
        disconnect,
        isConnected: web3React.active,
        account: web3React.account || null,
        chainId: web3React.chainId || null,
        provider,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context); 