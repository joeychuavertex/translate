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

interface DatasetMetadata {
  name: string;
  description: string;
  size: string;
  records: number;
  format: string;
  collectionPeriod: string;
  demographics: {
    ageRange: string;
    genderDistribution: string;
    ethnicity: string;
  };
  annotations: string[];
  qualityMetrics: {
    signalQuality: string;
    noiseLevel: string;
    samplingRate: string;
  };
  accessRequirements: string[];
  citation: string;
}

interface Dataset extends BaseItem {
  type: 'dataset';
  size: string;
  components?: never;
  accuracy?: never;
  performance?: never;
  metadata?: DatasetMetadata;
}

interface DigitalTwinMetadata {
  name: string;
  description: string;
  version: string;
  lastUpdated: string;
  components: {
    name: string;
    description: string;
    dataSources: string[];
    updateFrequency: string;
  }[];
  accuracyMetrics: {
    overall: string;
    sensitivity: string;
    specificity: string;
    auc: string;
  };
  validation: {
    method: string;
    dataset: string;
    results: string;
  };
  integration: {
    platforms: string[];
    apis: string[];
    dataFormats: string[];
  };
  maintenance: {
    schedule: string;
    support: string;
    documentation: string;
  };
}

interface DigitalTwin extends BaseItem {
  type: 'digital-twin';
  components: string[];
  accuracy: string;
  size?: never;
  performance?: never;
  metadata?: DigitalTwinMetadata;
}

interface AIModel extends BaseItem {
  type: 'model';
  performance: string;
  size?: never;
  components?: never;
  accuracy?: never;
}

type MarketplaceItem = Dataset | DigitalTwin | AIModel;

export default function Home() {
  const [activeTab, setActiveTab] = useState<'datasets' | 'digital-twins' | 'models'>('datasets');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [selectedDigitalTwin, setSelectedDigitalTwin] = useState<DigitalTwin | null>(null);

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
    },
    {
      type: 'dataset',
      id: 3,
      name: "ECG Heart Attack Prediction Dataset",
      description: "Comprehensive ECG dataset for predicting various forms of heart attacks, collected from multiple healthcare institutions",
      size: "8.2TB",
      downloads: 2100,
      rating: 4.9,
      price: "3000 DAI",
      tags: ["ECG", "cardiology", "heart-attack", "prediction"],
      contributors: ["NUHS", "NHCS", "HEEDB", "MIMIC-IV", "CODE-15", "PTB-XL", "Shaoxing", "SaMi-Trop", "PhysioNet-2017", "UK Biobank"],
      license: "CC-BY-NC-ND",
      blockchain: "Ethereum",
      smartContract: "0xecg1...2345",
      metadata: {
        name: "ECG Heart Attack Prediction Dataset",
        description: "A comprehensive collection of ECG data from multiple healthcare institutions for heart attack prediction research",
        size: "8.2TB",
        records: 150000,
        format: "WFDB, DICOM, CSV",
        collectionPeriod: "2010-2023",
        demographics: {
          ageRange: "18-90 years",
          genderDistribution: "45% Female, 55% Male",
          ethnicity: "Diverse (Asian, Caucasian, African, Hispanic)"
        },
        annotations: [
          "ST-segment elevation",
          "T-wave inversion",
          "Q-wave presence",
          "Heart rate variability",
          "Arrhythmia classification"
        ],
        qualityMetrics: {
          signalQuality: "High (SNR > 20dB)",
          noiseLevel: "Low (< 5% noise contamination)",
          samplingRate: "500Hz"
        },
        accessRequirements: [
          "Institutional Review Board approval",
          "Data Use Agreement",
          "Research purpose statement"
        ],
        citation: "ECG Heart Attack Prediction Dataset Consortium (2023). Comprehensive ECG dataset for heart attack prediction. DOI: 10.1234/ecg-dataset"
      }
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
      smartContract: "0xabcd...efgh",
      metadata: {
        name: "Cardiovascular Digital Twin",
        description: "A comprehensive digital twin system for cardiovascular health monitoring and disease prediction",
        version: "2.1.0",
        lastUpdated: "2024-03-15",
        components: [
          {
            name: "ECG Analysis Module",
            description: "Real-time ECG signal processing and anomaly detection",
            dataSources: ["12-lead ECG", "Wearable ECG", "Hospital ECG systems"],
            updateFrequency: "Real-time"
          },
          {
            name: "Blood Pressure Monitor",
            description: "Continuous blood pressure tracking and trend analysis",
            dataSources: ["Smart BP monitors", "Hospital records", "Wearable devices"],
            updateFrequency: "Hourly"
          },
          {
            name: "Lifestyle Tracker",
            description: "Activity, diet, and stress level monitoring",
            dataSources: ["Fitness trackers", "Mobile apps", "Smart scales"],
            updateFrequency: "Daily"
          }
        ],
        accuracyMetrics: {
          overall: "98.5%",
          sensitivity: "99.2%",
          specificity: "97.8%",
          auc: "0.987"
        },
        validation: {
          method: "Cross-validation with multiple datasets",
          dataset: "Combined data from 5 major hospitals (n=50,000)",
          results: "Consistent performance across all validation sets"
        },
        integration: {
          platforms: ["Web", "Mobile", "Hospital EHR systems"],
          apis: ["REST API", "WebSocket", "HL7 FHIR"],
          dataFormats: ["JSON", "XML", "DICOM"]
        },
        maintenance: {
          schedule: "Weekly updates, monthly major releases",
          support: "24/7 technical support, dedicated account manager",
          documentation: "Comprehensive API docs, user guides, and tutorials"
        }
      }
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

  const DatasetMetadataView = ({ dataset }: { dataset: Dataset }) => {
    if (!dataset.metadata) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">{dataset.metadata.name}</h2>
            <button
              onClick={() => setSelectedDataset(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300">{dataset.metadata.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Technical Details</h3>
                <ul className="space-y-2">
                  <li><span className="font-medium">Size:</span> {dataset.metadata.size}</li>
                  <li><span className="font-medium">Records:</span> {dataset.metadata.records.toLocaleString()}</li>
                  <li><span className="font-medium">Format:</span> {dataset.metadata.format}</li>
                  <li><span className="font-medium">Collection Period:</span> {dataset.metadata.collectionPeriod}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Demographics</h3>
                <ul className="space-y-2">
                  <li><span className="font-medium">Age Range:</span> {dataset.metadata.demographics.ageRange}</li>
                  <li><span className="font-medium">Gender Distribution:</span> {dataset.metadata.demographics.genderDistribution}</li>
                  <li><span className="font-medium">Ethnicity:</span> {dataset.metadata.demographics.ethnicity}</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Annotations</h3>
              <div className="flex flex-wrap gap-2">
                {dataset.metadata.annotations.map((annotation) => (
                  <span
                    key={annotation}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {annotation}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Quality Metrics</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Signal Quality:</span> {dataset.metadata.qualityMetrics.signalQuality}</li>
                <li><span className="font-medium">Noise Level:</span> {dataset.metadata.qualityMetrics.noiseLevel}</li>
                <li><span className="font-medium">Sampling Rate:</span> {dataset.metadata.qualityMetrics.samplingRate}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Access Requirements</h3>
              <ul className="list-disc list-inside space-y-1">
                {dataset.metadata.accessRequirements.map((req) => (
                  <li key={req} className="text-gray-600 dark:text-gray-300">{req}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Citation</h3>
              <p className="text-gray-600 dark:text-gray-300">{dataset.metadata.citation}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DigitalTwinMetadataView = ({ digitalTwin }: { digitalTwin: DigitalTwin }) => {
    if (!digitalTwin.metadata) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{digitalTwin.metadata.name}</h2>
              <p className="text-gray-500 dark:text-gray-400">Version {digitalTwin.metadata.version}</p>
            </div>
            <button
              onClick={() => setSelectedDigitalTwin(null)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300">{digitalTwin.metadata.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Components</h3>
              <div className="space-y-4">
                {digitalTwin.metadata.components.map((component, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">{component.name}</h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">{component.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-1">Data Sources</h5>
                        <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                          {component.dataSources.map((source, i) => (
                            <li key={i}>{source}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-1">Update Frequency</h5>
                        <p className="text-gray-600 dark:text-gray-300">{component.updateFrequency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Accuracy Metrics</h3>
                <ul className="space-y-2">
                  <li><span className="font-medium">Overall Accuracy:</span> {digitalTwin.metadata.accuracyMetrics.overall}</li>
                  <li><span className="font-medium">Sensitivity:</span> {digitalTwin.metadata.accuracyMetrics.sensitivity}</li>
                  <li><span className="font-medium">Specificity:</span> {digitalTwin.metadata.accuracyMetrics.specificity}</li>
                  <li><span className="font-medium">AUC:</span> {digitalTwin.metadata.accuracyMetrics.auc}</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Validation</h3>
                <ul className="space-y-2">
                  <li><span className="font-medium">Method:</span> {digitalTwin.metadata.validation.method}</li>
                  <li><span className="font-medium">Dataset:</span> {digitalTwin.metadata.validation.dataset}</li>
                  <li><span className="font-medium">Results:</span> {digitalTwin.metadata.validation.results}</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Integration</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Platforms</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {digitalTwin.metadata.integration.platforms.map((platform, i) => (
                      <li key={i}>{platform}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">APIs</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {digitalTwin.metadata.integration.apis.map((api, i) => (
                      <li key={i}>{api}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Data Formats</h4>
                  <ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
                    {digitalTwin.metadata.integration.dataFormats.map((format, i) => (
                      <li key={i}>{format}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Maintenance</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Update Schedule:</span> {digitalTwin.metadata.maintenance.schedule}</li>
                <li><span className="font-medium">Support:</span> {digitalTwin.metadata.maintenance.support}</li>
                <li><span className="font-medium">Documentation:</span> {digitalTwin.metadata.maintenance.documentation}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
                
                {item.type === 'digital-twin' && (
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
                )}

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
                  <button 
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      if (item.type === 'dataset') {
                        setSelectedDataset(item);
                      } else if (item.type === 'digital-twin') {
                        setSelectedDigitalTwin(item);
                      }
                    }}
                  >
                    View Details
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

      {selectedDataset && <DatasetMetadataView dataset={selectedDataset} />}
      {selectedDigitalTwin && <DigitalTwinMetadataView digitalTwin={selectedDigitalTwin} />}
    </main>
  );
}
