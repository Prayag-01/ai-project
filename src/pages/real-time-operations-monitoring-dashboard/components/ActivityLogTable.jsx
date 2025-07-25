import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ActivityLogTable = ({ activities = [], isLoading = false }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterProduct, setFilterProduct] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const productOptions = [
    { value: 'all', label: 'All Products' },
    { value: 'wrapportal', label: 'Wrapportal' },
    { value: 'kinetic', label: 'Kinetic' },
    { value: 'asureify', label: 'Asureify' },
    { value: 'riskguru', label: 'Riskguru' },
    { value: 'anzenn', label: 'Anzenn' },
    { value: 'prequaligy', label: 'Prequaligy' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'success', label: 'Success' },
    { value: 'error', label: 'Error' },
    { value: 'pending', label: 'Pending' },
    { value: 'timeout', label: 'Timeout' }
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case 'success':
        return { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' };
      case 'error':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'XCircle' };
      case 'pending':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' };
      case 'timeout':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'Timer' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', icon: 'Circle' };
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedActivities = activities
    .filter(activity => {
      const matchesProduct = filterProduct === 'all' || activity.product === filterProduct;
      const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
      const matchesSearch = searchTerm === '' || 
        activity.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.requestId.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesProduct && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'timestamp') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const totalPages = Math.ceil(filteredAndSortedActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredAndSortedActivities.slice(startIndex, startIndex + itemsPerPage);

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (duration) => {
    if (duration < 1000) return `${duration}ms`;
    return `${(duration / 1000).toFixed(2)}s`;
  };

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted/30 rounded w-48 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-muted/20 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <h3 className="text-lg font-semibold">Activity Log</h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Input
            type="search"
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64"
          />
          
          <Select
            options={productOptions}
            value={filterProduct}
            onChange={setFilterProduct}
            className="w-full sm:w-40"
          />
          
          <Select
            options={statusOptions}
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-full sm:w-36"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('timestamp')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Time</span>
                  <Icon 
                    name={sortField === 'timestamp' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('product')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Product</span>
                  <Icon 
                    name={sortField === 'product' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Endpoint</span>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <button
                  onClick={() => handleSort('duration')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Duration</span>
                  <Icon 
                    name={sortField === 'duration' && sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Request ID</span>
              </th>
              <th className="text-right py-3 px-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedActivities.map((activity) => {
              const statusConfig = getStatusConfig(activity.status);
              return (
                <tr key={activity.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="py-3 px-4">
                    <span className="text-sm font-data">{formatTimestamp(activity.timestamp)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium capitalize">{activity.product}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-mono text-muted-foreground">{activity.endpoint}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full ${statusConfig.bg}`}>
                      <Icon name={statusConfig.icon} size={12} className={statusConfig.color} />
                      <span className={`text-xs font-medium capitalize ${statusConfig.color}`}>
                        {activity.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-data">{formatDuration(activity.duration)}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-mono text-muted-foreground">{activity.requestId}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="ghost" size="xs" iconName="ExternalLink">
                      Details
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedActivities.length)} of {filteredAndSortedActivities.length} results
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
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 text-sm rounded transition-colors ${
                      currentPage === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
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
      )}
    </div>
  );
};

export default ActivityLogTable;