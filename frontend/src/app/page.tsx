'use client';

import { Web3Provider } from '../context/Web3Context';
import { DataContribution } from '../components/DataContribution';
import { DigitalTwinManager } from '../components/DigitalTwin';
import { useWeb3 } from '../context/Web3Context';

export default function Home() {
  return (
    <Web3Provider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Research Data Exchange Platform</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="space-y-8">
              <WalletConnect />
              <DataContribution />
              <DigitalTwinManager />
            </div>
          </div>
        </main>
      </div>
    </Web3Provider>
  );
}

function WalletConnect() {
  const { connect, disconnect, isConnected, account } = useWeb3();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Wallet Connection</h2>
      {!isConnected ? (
        <button
          onClick={connect}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Connected Account:</p>
          <p className="font-mono text-sm break-all">{account}</p>
          <button
            onClick={disconnect}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
} 