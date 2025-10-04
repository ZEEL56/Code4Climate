import React from 'react';
import Card from '../ui/Card';

const NasaDataPanel: React.FC = () => {
  const nasaDatasets = [
    {
      name: 'NASA POWER',
      description: 'Prediction of Worldwide Energy Resources',
      updateFrequency: 'Daily',
      resolution: '0.5° x 0.625°',
      variables: ['Temperature', 'Humidity', 'Wind Speed', 'Solar Radiation'],
      lastUpdate: '2 hours ago',
      status: 'Active',
      link: 'https://power.larc.nasa.gov/'
    },
    {
      name: 'GPM (Global Precipitation Measurement)',
      description: 'Global precipitation data from satellite observations',
      updateFrequency: 'Every 3 hours',
      resolution: '0.1° x 0.1°',
      variables: ['Precipitation Rate', 'Rainfall Accumulation', 'Snow Depth'],
      lastUpdate: '1 hour ago',
      status: 'Active',
      link: 'https://gpm.nasa.gov/'
    },
    {
      name: 'EarthData',
      description: 'Comprehensive Earth observation data portal',
      updateFrequency: 'Real-time',
      resolution: 'Variable',
      variables: ['Air Quality', 'Land Surface', 'Ocean Data', 'Atmosphere'],
      lastUpdate: '30 minutes ago',
      status: 'Active',
      link: 'https://earthdata.nasa.gov/'
    }
  ];

  const dataQuality = [
    { metric: 'Data Accuracy', value: 98.5, unit: '%', color: 'green' },
    { metric: 'Update Frequency', value: 95.2, unit: '%', color: 'blue' },
    { metric: 'Coverage Area', value: 99.8, unit: '%', color: 'purple' },
    { metric: 'API Reliability', value: 99.1, unit: '%', color: 'orange' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Offline': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getQualityColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-600 dark:text-green-400';
      case 'blue': return 'text-blue-600 dark:text-blue-400';
      case 'purple': return 'text-purple-600 dark:text-purple-400';
      case 'orange': return 'text-orange-600 dark:text-orange-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <Card title="🛰️ NASA Data Sources" subtitle="Real-time Earth observation data from NASA's satellite network">
      <div className="space-y-6">
        {/* Data Quality Overview */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Data Quality Metrics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dataQuality.map((metric, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center">
                <div className={`text-2xl font-bold ${getQualityColor(metric.color)}`}>
                  {metric.value}{metric.unit}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {metric.metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NASA Datasets */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Active Data Sources
          </h4>
          <div className="space-y-4">
            {nasaDatasets.map((dataset, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {dataset.name}
                      </h5>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(dataset.status)}`}>
                        {dataset.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {dataset.description}
                    </p>
                  </div>
                  <a
                    href={dataset.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium"
                  >
                    View Source →
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Update Frequency</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {dataset.updateFrequency}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Resolution</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {dataset.resolution}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Last Update</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white">
                      {dataset.lastUpdate}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Available Variables</div>
                  <div className="flex flex-wrap gap-2">
                    {dataset.variables.map((variable, varIndex) => (
                      <span
                        key={varIndex}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded"
                      >
                        {variable}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NASA Credits */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-blue-600 dark:text-blue-400">🚀</span>
            <span className="font-medium text-blue-800 dark:text-blue-200">
              NASA Open Data Initiative
            </span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
            This application utilizes NASA's open data resources to provide accurate, 
            real-time weather and climate information. All data is freely available 
            through NASA's Earth observation programs.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://www.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              NASA.gov
            </a>
            <span className="text-blue-400">•</span>
            <a
              href="https://earthdata.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              EarthData
            </a>
            <span className="text-blue-400">•</span>
            <a
              href="https://power.larc.nasa.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              POWER API
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NasaDataPanel;
