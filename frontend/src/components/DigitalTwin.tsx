import { useState, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';

interface DigitalTwin {
  id: number;
  dataHashes: string[];
  creationTimestamp: number;
  isActive: boolean;
}

export const DigitalTwinManager = () => {
  const { isConnected, account, provider } = useWeb3();
  const [digitalTwins, setDigitalTwins] = useState<DigitalTwin[]>([]);
  const [selectedDataHashes, setSelectedDataHashes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isConnected && account && provider) {
      loadDigitalTwins();
    }
  }, [isConnected, account, provider]);

  const loadDigitalTwins = async () => {
    try {
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      const contractABI = require('../../contracts/artifacts/contracts/ResearchDataExchange.sol/ResearchDataExchange.json').abi;
      const contract = new ethers.Contract(contractAddress, contractABI, provider);

      const twinIds = await contract.getResearcherDigitalTwins(account);
      const twins: DigitalTwin[] = [];

      for (const id of twinIds) {
        const twin = await contract.digitalTwins(id);
        twins.push({
          id: id.toNumber(),
          dataHashes: twin.dataHashes,
          creationTimestamp: twin.creationTimestamp.toNumber(),
          isActive: twin.isActive,
        });
      }

      setDigitalTwins(twins);
    } catch (err) {
      console.error('Error loading digital twins:', err);
      setError('Failed to load digital twins');
    }
  };

  const createDigitalTwin = async () => {
    if (!isConnected || !account || !provider || selectedDataHashes.length === 0) {
      setError('Please connect your wallet and select data');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      const contractABI = require('../../contracts/artifacts/contracts/ResearchDataExchange.sol/ResearchDataExchange.json').abi;
      const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

      const tx = await contract.createDigitalTwin(selectedDataHashes);
      await tx.wait();
      
      await loadDigitalTwins();
      setSelectedDataHashes([]);
      alert('Digital twin created successfully!');
    } catch (err) {
      console.error('Error creating digital twin:', err);
      setError('Failed to create digital twin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Digital Twin Manager</h2>

      {!isConnected ? (
        <p className="text-red-500">Please connect your wallet first</p>
      ) : (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Create New Digital Twin</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Data Hashes (comma-separated)
                </label>
                <input
                  type="text"
                  value={selectedDataHashes.join(',')}
                  onChange={(e) => setSelectedDataHashes(e.target.value.split(',').map(hash => hash.trim()))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter IPFS hashes separated by commas"
                />
              </div>

              <button
                onClick={createDigitalTwin}
                disabled={loading || selectedDataHashes.length === 0}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Digital Twin'}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Your Digital Twins</h3>
            {digitalTwins.length === 0 ? (
              <p className="text-gray-500">No digital twins found</p>
            ) : (
              <div className="space-y-4">
                {digitalTwins.map((twin) => (
                  <div key={twin.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Twin #{twin.id}</p>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(twin.creationTimestamp * 1000).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        twin.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {twin.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Data Hashes:</p>
                      <ul className="mt-1 space-y-1">
                        {twin.dataHashes.map((hash, index) => (
                          <li key={index} className="text-sm text-gray-600 break-all">
                            {hash}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
}; 