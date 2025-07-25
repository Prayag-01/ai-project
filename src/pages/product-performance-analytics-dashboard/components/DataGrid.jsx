import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DataGrid = ({ selectedProducts, filters }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'timestamp', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCell, setEditingCell] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock data for the grid
  const generateGridData = () => {
    const data = [];
    const products = selectedProducts.length > 0 ? selectedProducts : ['wrapportal', 'kinetic', 'asureify'];
    
    for (let i = 0; i < 150; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const timestamp = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      
      data.push({
        id: `req_${i + 1}`,
        timestamp: timestamp.toISOString(),
        product: product,
        accuracy: (Math.random() * 20 + 80).toFixed(2),
        responseTime: Math.floor(Math.random() * 200 + 50),
        volume: Math.floor(Math.random() * 1000 + 100),
        successRate: (Math.random() * 15 + 85).toFixed(2),
        errorRate: (Math.random() * 5).toFixed(2),
        threshold: (Math.random() * 10 + 90).toFixed(1),
        status: Math.random() > 0.8 ? 'warning' : Math.random() > 0.9 ? 'error' : 'success'
      });
    }
    return data;
  };

  const rawData = useMemo(() => generateGridData(), [selectedProducts]);

  // Filter and search data
  const filteredData = useMemo(() => {
    return rawData.filter(item => {
      const matchesSearch = searchTerm === '' || 
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesSearch;
    });
  }, [rawData, searchTerm]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleCellEdit = (rowId, column, value) => {
    // In a real app, this would update the backend
    console.log(`Updating ${rowId}.${column} to ${value}`);
    setEditingCell(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'error': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return 'CheckCircle2';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Circle';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const columns = [
    { key: 'timestamp', label: 'Timestamp', sortable: true, width: '140px' },
    { key: 'product', label: 'Product', sortable: true, width: '120px' },
    { key: 'accuracy', label: 'Accuracy (%)', sortable: true, width: '110px', editable: false },
    { key: 'responseTime', label: 'Response (ms)', sortable: true, width: '120px' },
    { key: 'volume', label: 'Volume', sortable: true, width: '100px' },
    { key: 'successRate', label: 'Success (%)', sortable: true, width: '110px' },
    { key: 'threshold', label: 'Threshold', sortable: true, width: '100px', editable: true },
    { key: 'status', label: 'Status', sortable: true, width: '100px' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Icon name="Table" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Detailed Data Grid</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export CSV
            </Button>
            <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
              Export PDF
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 max-w-md">
            <Input
              type="search"
              placeholder="Search data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {sortedData.length} of {rawData.length} records
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20 border-b border-border">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                  style={{ width: column.width }}
                >
                  {column.sortable ? (
                    <button
                      onClick={() => handleSort(column.key)}
                      className="flex items-center space-x-1 hover:text-foreground transition-colors"
                    >
                      <span>{column.label}</span>
                      <div className="flex flex-col">
                        <Icon
                          name="ChevronUp"
                          size={12}
                          className={`${
                            sortConfig.key === column.key && sortConfig.direction === 'asc' ?'text-primary' :'text-muted-foreground/50'
                          }`}
                        />
                        <Icon
                          name="ChevronDown"
                          size={12}
                          className={`${
                            sortConfig.key === column.key && sortConfig.direction === 'desc' ?'text-primary' :'text-muted-foreground/50'
                          }`}
                        />
                      </div>
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedData.map((row, index) => (
              <tr
                key={row.id}
                className="hover:bg-muted/20 transition-colors"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm">
                    {column.key === 'timestamp' ? (
                      <span className="text-foreground font-mono">
                        {formatTimestamp(row[column.key])}
                      </span>
                    ) : column.key === 'product' ? (
                      <span className="text-foreground font-medium capitalize">
                        {row[column.key]}
                      </span>
                    ) : column.key === 'status' ? (
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(row[column.key])}`}>
                        <Icon name={getStatusIcon(row[column.key])} size={12} />
                        <span className="capitalize">{row[column.key]}</span>
                      </div>
                    ) : column.editable && editingCell === `${row.id}-${column.key}` ? (
                      <input
                        type="text"
                        defaultValue={row[column.key]}
                        className="w-full px-2 py-1 text-sm bg-input border border-border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                        onBlur={(e) => handleCellEdit(row.id, column.key, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleCellEdit(row.id, column.key, e.target.value);
                          } else if (e.key === 'Escape') {
                            setEditingCell(null);
                          }
                        }}
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`text-foreground ${column.editable ? 'cursor-pointer hover:bg-muted/30 px-2 py-1 rounded' : ''}`}
                        onClick={() => column.editable && setEditingCell(`${row.id}-${column.key}`)}
                      >
                        {column.key === 'accuracy' || column.key === 'successRate' || column.key === 'errorRate' || column.key === 'threshold'
                          ? `${row[column.key]}${column.key === 'responseTime' ? 'ms' : '%'}`
                          : column.key === 'responseTime'
                          ? `${row[column.key]}ms`
                          : column.key === 'volume'
                          ? row[column.key].toLocaleString()
                          : row[column.key]
                        }
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      currentPage === page
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-muted-foreground">...</span>
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      currentPage === totalPages
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;