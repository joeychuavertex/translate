"use client";

import { useState } from 'react';

interface BaseItem {
  id: number;
  name: string;
  description: string;
  downloads: number;
  rating: number;
  price: string;
  tags: string[];
  contributors: string[];
  license: string;
  blockchain: string;
  smartContract: string;
}

interface Dataset extends BaseItem {
  type: 'dataset';
  size: string;
}

interface DigitalTwin extends BaseItem {
  type: 'digital-twin';
  components: string[];
  accuracy: string;
}

interface AIModel extends BaseItem {
  type: 'model';
  performance: string;
}

type MarketplaceItem = Dataset | DigitalTwin | AIModel;

const isDigitalTwin = (item: MarketplaceItem): item is DigitalTwin => {
  return item.type === 'digital-twin';
};

const ItemComponents = ({ item }: { item: DigitalTwin }) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm font-semibold mb-2">Components:</h4>
      <div className="flex flex-wrap gap-2">
        {item.components.map((component) => (
          <span
            key={component}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
          >
            {component}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'digital-twins' | 'models'>('datasets');
  const [searchQuery, setSearchQuery] = useState('');

  const mockDatasets: Dataset[] = [
    {
      type: 'dataset',
      id: 1,
      name: "Patient Genomic Dataset",
      description: "Comprehensive genomic data from 10,000 patients with detailed clinical annotations",
      size: "2.5TB",
      downloads: 1243,
      rating: 4.8,
      price: "1000 DAI",
      tags: ["genomics", "clinical", "SNOMED-CT"],
      contributors: ["Johns Hopkins Medical", "Mayo Clinic"],
      license: "CC-BY-NC",
      blockchain: "Ethereum",
      smartContract: "0x1234...5678"
    },
    {
      type: 'dataset',
      id: 2,
      name: "Population Health Records",
      description: "Longitudinal health records from 50,000 individuals with lifestyle and environmental data",
      size: "15TB",
      downloads: 856,
      rating: 4.5,
      price: "500 DAI",
      tags: ["population", "longitudinal", "ICD-10"],
      contributors: ["WHO", "CDC"],
      license: "CC-BY-SA",
      blockchain: "Polygon",
      smartContract: "0x8765...4321"
    }
  ];

  const mockDigitalTwins: DigitalTwin[] = [
    {
      type: 'digital-twin',
      id: 1,
      name: "Cardiovascular Digital Twin",
      description: "AI-powered digital twin for cardiovascular disease prediction and treatment simulation",
      components: ["ECG data", "Blood pressure", "Lifestyle factors"],
      accuracy: "98.5%",
      downloads: 2100,
      rating: 4.9,
      price: "2000 DAI",
      tags: ["cardiology", "simulation", "predictive"],
      contributors: ["Stanford Medicine", "MIT"],
      license: "Commercial",
      blockchain: "Ethereum",
      smartContract: "0xabcd...efgh"
    }
  ];

  const mockModels: AIModel[] = [
    {
      type: 'model',
      id: 1,
      name: "Drug Interaction Predictor",
      description: "Deep learning model for predicting drug-drug interactions and side effects",
      performance: "AUC: 0.95",
      downloads: 1500,
      rating: 4.7,
      price: "5000 DAI",
      tags: ["pharmacology", "deep-learning", "drug-discovery"],
      contributors: ["Pfizer AI Lab"],
      license: "Commercial",
      blockchain: "Ethereum",
      smartContract: "0xijkl...mnop"
    }
  ];

  const items: MarketplaceItem[] = activeTab === 'datasets' ? mockDatasets : 
                                  activeTab === 'digital-twins' ? mockDigitalTwins : 
                                  mockModels;

  return (
    <main className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Research Data Marketplace</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Contribute, access, and utilize medical research data, digital twins, and AI models on the blockchain
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('datasets')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'datasets'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Datasets
            </button>
            <button
              onClick={() => setActiveTab('digital-twins')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'digital-twins'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Digital Twins
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'models'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              AI Models
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder={`Search ${activeTab.replace('-', ' ')}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {item.description}
                </p>
                
                {isDigitalTwin(item) && <ItemComponents item={item} />}

                <div className="flex items-center mb-4">
                  <div className="flex items-center text-yellow-400 mr-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(item.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.downloads} downloads
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-2">Contributors:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.contributors.map((contributor) => (
                      <span
                        key={contributor}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
                      >
                        {contributor}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    License: {item.license}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">
                    Blockchain: {item.blockchain}
                  </span>
                </div>

                <div className="space-y-2">
                  <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Purchase Access
                  </button>
                  <button className="w-full py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors">
                    View Smart Contract
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
