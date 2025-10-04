import React, { useState } from 'react';
import Card from '../ui/Card';

interface ExportPanelProps {
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  dateRange: {
    start: string;
    end: string;
  };
  selectedVariables: string[];
}

const ExportPanel: React.FC<ExportPanelProps> = ({
  location,
  dateRange,
  selectedVariables
}) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeMap, setIncludeMap] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const exportFormats = [
    { key: 'pdf', label: 'PDF Report', icon: '📄', description: 'Professional formatted report' },
    { key: 'csv', label: 'CSV Data', icon: '📊', description: 'Raw data for analysis' },
    { key: 'json', label: 'JSON Data', icon: '🔧', description: 'Structured data format' },
    { key: 'excel', label: 'Excel Spreadsheet', icon: '📈', description: 'Data with charts' }
  ];

  const handleExport = async (format: string) => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock download
    const filename = `weather-data-${location.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.${format}`;
    
    // Create mock file content
    let content = '';
    let mimeType = '';
    
    switch (format) {
      case 'pdf':
        content = 'PDF content would be generated here';
        mimeType = 'application/pdf';
        break;
      case 'csv':
        content = 'Date,Temperature,Humidity,Precipitation\n2024-01-15,22,65,5\n2024-01-16,24,62,3';
        mimeType = 'text/csv';
        break;
      case 'json':
        content = JSON.stringify({
          location: location.name,
          dateRange,
          variables: selectedVariables,
          data: [
            { date: '2024-01-15', temperature: 22, humidity: 65, precipitation: 5 },
            { date: '2024-01-16', temperature: 24, humidity: 62, precipitation: 3 }
          ]
        }, null, 2);
        mimeType = 'application/json';
        break;
      case 'excel':
        content = 'Excel content would be generated here';
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
    }
    
    // Create download link
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setIsExporting(false);
  };

  const generateCustomReport = () => {
    // This would open a modal or navigate to a custom report builder
    console.log('Opening custom report builder...');
  };

  return (
    <Card title="📤 Export Data & Reports" subtitle="Download weather data in various formats">
      <div className="space-y-6">
        {/* Export Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            Export Summary
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-1">Location</div>
              <div className="font-medium text-gray-800 dark:text-white">{location.name}</div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-1">Date Range</div>
              <div className="font-medium text-gray-800 dark:text-white">
                {new Date(dateRange.start).toLocaleDateString()} - {new Date(dateRange.end).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-gray-600 dark:text-gray-400 mb-1">Variables</div>
              <div className="font-medium text-gray-800 dark:text-white">
                {selectedVariables.length} selected
              </div>
            </div>
          </div>
        </div>

        {/* Export Format Selection */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Choose Export Format
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {exportFormats.map((format) => (
              <button
                key={format.key}
                onClick={() => setExportFormat(format.key)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  exportFormat === format.key
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{format.icon}</div>
                  <div className="font-medium text-gray-800 dark:text-white mb-1">
                    {format.label}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {format.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Export Options */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Export Options
          </h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div>
                <div className="font-medium text-gray-800 dark:text-white">Include Charts & Graphs</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Add visual representations of the data
                </div>
              </div>
            </label>

            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={includeMap}
                onChange={(e) => setIncludeMap(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <div>
                <div className="font-medium text-gray-800 dark:text-white">Include Map Visualization</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Add location map with weather overlays
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleExport(exportFormat)}
            disabled={isExporting}
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <span>📥</span>
                <span>Download {exportFormats.find(f => f.key === exportFormat)?.label}</span>
              </>
            )}
          </button>

          <button
            onClick={generateCustomReport}
            className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <span>📋</span>
            <span>Generate Custom Report</span>
          </button>
        </div>

        {/* Export History */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Recent Exports
          </h4>
          <div className="space-y-2">
            {[
              { name: 'weather-report-nyc-2024-01-15.pdf', date: '2 hours ago', size: '2.3 MB' },
              { name: 'temperature-data-2024-01-14.csv', date: '1 day ago', size: '156 KB' },
              { name: 'complete-weather-analysis.json', date: '3 days ago', size: '1.8 MB' }
            ].map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📄</span>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white text-sm">
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {file.date} • {file.size}
                    </div>
                  </div>
                </div>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExportPanel;
