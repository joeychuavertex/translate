import { useState, useEffect, useCallback } from 'react';
import { useWeb3 } from '../context/Web3Context';

interface DigitalTwin {
  id: number;
  name: string;
  description: string;
  components: string[];
  owner: string;
  price: number;
}

export const DigitalTwinList = () => {
  const { isConnected, account, provider } = useWeb3();
  const [digitalTwins, setDigitalTwins] = useState<DigitalTwin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadDigitalTwins = useCallback(async () => {
    if (!isConnected || !account || !provider) {
      setError('Please connect your wallet first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Mock data for now - replace with actual contract calls
      const mockTwins: DigitalTwin[] = [
        {
          id: 1,
          name: 'Patient Digital Twin',
          description: 'A digital representation of patient health data',
          components: ['Vital Signs', 'Medical History', 'Genomic Data'],
          owner: account,
          price: 0.1
        },
        {
          id: 2,
          name: 'Disease Model',
          description: 'Digital model of disease progression',
          components: ['Pathology', 'Treatment Response', 'Prognosis'],
          owner: account,
          price: 0.2
        }
      ];
      
      setDigitalTwins(mockTwins);
    } catch (err: unknown) {
      console.error('Error loading digital twins:', err);
      setError('Failed to load digital twins. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [isConnected, account, provider]);

  useEffect(() => {
    loadDigitalTwins();
  }, [loadDigitalTwins]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Digital Twins</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {loading ? (
        <p>Loading digital twins...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {digitalTwins.map((twin) => (
            <div key={twin.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{twin.name}</h3>
              <p className="text-gray-600 mb-4">{twin.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Components:</h4>
                <ul className="list-disc list-inside">
                  {twin.components.map((component, index) => (
                    <li key={index} className="text-gray-700">{component}</li>
                  ))}
                </ul>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Owner: {twin.owner.slice(0, 6)}...{twin.owner.slice(-4)}</span>
                <span className="font-semibold">{twin.price} ETH</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 