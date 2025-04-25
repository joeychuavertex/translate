import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useConnect, useDisconnect, useProvider } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

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
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  const provider = useProvider();

  const [ethersProvider, setEthersProvider] = useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    if (provider) {
      setEthersProvider(provider as ethers.providers.Web3Provider);
    }
  }, [provider]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  const handleDisconnect = () => {
    try {
      disconnect();
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        connect: handleConnect,
        disconnect: handleDisconnect,
        isConnected,
        account: address || null,
        chainId: null, // You can get this from wagmi if needed
        provider: ethersProvider,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context); 