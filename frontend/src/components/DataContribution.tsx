import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { create } from 'ipfs-http-client';

const ipfs = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

export const DataContribution = () => {
  const { isConnected, account, provider } = useWeb3();
  const [file, setFile] = useState<File | null>(null);
  const [dataType, setDataType] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || !account || !provider || !file) {
      setError('Please connect your wallet and select a file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Upload file to IPFS
      const added = await ipfs.add(file);
      const ipfsHash = added.path;

      // Get contract instance
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      const contractABI = require('../../contracts/artifacts/contracts/ResearchDataExchange.sol/ResearchDataExchange.json').abi;
      const contract = new ethers.Contract(contractAddress, contractABI, provider.getSigner());

      // Call contributeData function
      const tx = await contract.contributeData(
        ipfsHash,
        dataType,
        isPublic,
        tags.split(',').map(tag => tag.trim())
      );

      await tx.wait();
      alert('Data contributed successfully!');
      
      // Reset form
      setFile(null);
      setDataType('');
      setIsPublic(false);
      setTags('');
    } catch (err) {
      console.error('Error contributing data:', err);
      setError('Failed to contribute data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Contribute Research Data</h2>
      
      {!isConnected ? (
        <p className="text-red-500">Please connect your wallet first</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Data Type</label>
            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select data type</option>
              <option value="patient_record">Patient Record</option>
              <option value="molecular_data">Molecular Data</option>
              <option value="population_data">Population Data</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., cancer, genomics, clinical"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-900">Make data public</label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Contributing...' : 'Contribute Data'}
          </button>
        </form>
      )}
    </div>
  );
}; 