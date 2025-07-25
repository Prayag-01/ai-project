import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookmarkSystem = ({ filters, onLoadBookmark }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarkName, setBookmarkName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  // Mock bookmarks data
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      name: 'Weekly Performance Review',
      description: 'All products, last 7 days, accuracy threshold 95%',
      filters: {
        selectedProducts: ['wrapportal', 'kinetic', 'asureify', 'riskguru', 'anzenn', 'prequaligy'],
        dateRange: 'last7days',
        accuracyThreshold: 95,
        aggregation: 'daily'
      },
      createdAt: '2025-01-20T10:30:00Z',
      lastUsed: '2025-01-24T14:22:00Z',
      useCount: 12
    },
    {
      id: 2,
      name: 'High-Performance Products',
      description: 'Asureify & Riskguru, last 30 days, accuracy threshold 98%',
      filters: {
        selectedProducts: ['asureify', 'riskguru'],
        dateRange: 'last30days',
        accuracyThreshold: 98,
        aggregation: 'weekly'
      },
      createdAt: '2025-01-18T09:15:00Z',
      lastUsed: '2025-01-23T16:45:00Z',
      useCount: 8
    },
    {
      id: 3,
      name: 'Troubleshooting Analysis',
      description: 'Kinetic & Anzenn, custom range, accuracy threshold 90%',
      filters: {
        selectedProducts: ['kinetic', 'anzenn'],
        dateRange: 'custom',
        customStartDate: '2025-01-15',
        customEndDate: '2025-01-22',
        accuracyThreshold: 90,
        aggregation: 'hourly'
      },
      createdAt: '2025-01-22T11:20:00Z',
      lastUsed: '2025-01-24T13:10:00Z',
      useCount: 5
    }
  ]);

  const handleSaveBookmark = () => {
    if (!bookmarkName.trim()) return;

    const newBookmark = {
      id: Date.now(),
      name: bookmarkName,
      description: generateDescription(filters),
      filters: { ...filters },
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      useCount: 1
    };

    setBookmarks(prev => [newBookmark, ...prev]);
    setBookmarkName('');
    setIsCreating(false);
  };

  const handleLoadBookmark = (bookmark) => {
    onLoadBookmark(bookmark.filters);
    
    // Update last used and use count
    setBookmarks(prev => prev.map(b => 
      b.id === bookmark.id 
        ? { ...b, lastUsed: new Date().toISOString(), useCount: b.useCount + 1 }
        : b
    ));
    
    setIsOpen(false);
  };

  const handleDeleteBookmark = (bookmarkId) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  };

  const generateDescription = (filters) => {
    const products = filters.selectedProducts?.length > 0 
      ? filters.selectedProducts.join(', ') 
      : 'All products';
    const dateRange = filters.dateRange === 'custom' 
      ? `${filters.customStartDate} to ${filters.customEndDate}`
      : filters.dateRange.replace(/([a-z])([0-9])/g, '$1 $2');
    const threshold = `accuracy threshold ${filters.accuracyThreshold}%`;
    
    return `${products}, ${dateRange}, ${threshold}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        iconName="Bookmark"
        iconPosition="left"
        onClick={() => setIsOpen(!isOpen)}
      >
        Bookmarks
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-card border border-border rounded-lg shadow-elevation-3 z-50">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Bookmark" size={18} className="text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Saved Filters</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md hover:bg-muted/50 transition-colors"
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Save Current Filters */}
            {isCreating ? (
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter bookmark name..."
                  value={bookmarkName}
                  onChange={(e) => setBookmarkName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveBookmark();
                    if (e.key === 'Escape') setIsCreating(false);
                  }}
                  autoFocus
                />
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleSaveBookmark}
                    disabled={!bookmarkName.trim()}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                onClick={() => setIsCreating(true)}
                fullWidth
              >
                Save Current Filters
              </Button>
            )}
          </div>

          {/* Bookmarks List */}
          <div className="max-h-80 overflow-y-auto">
            {bookmarks.length === 0 ? (
              <div className="p-6 text-center">
                <Icon name="BookmarkX" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No saved bookmarks yet</p>
              </div>
            ) : (
              <div className="p-2">
                {bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="p-3 rounded-lg hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground truncate">
                          {bookmark.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {bookmark.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleLoadBookmark(bookmark)}
                          className="p-1 rounded-md hover:bg-muted/50 transition-colors"
                          title="Load bookmark"
                        >
                          <Icon name="Play" size={14} className="text-primary" />
                        </button>
                        <button
                          onClick={() => handleDeleteBookmark(bookmark.id)}
                          className="p-1 rounded-md hover:bg-muted/50 transition-colors"
                          title="Delete bookmark"
                        >
                          <Icon name="Trash2" size={14} className="text-error" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>Used {formatDate(bookmark.lastUsed)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="BarChart3" size={12} />
                          <span>{bookmark.useCount} times</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleLoadBookmark(bookmark)}
                        className="text-primary hover:text-primary/80 transition-colors"
                      >
                        Load
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-border bg-muted/10">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{bookmarks.length} saved bookmarks</span>
              <div className="flex items-center space-x-1">
                <Icon name="Info" size={12} />
                <span>Click to load filters</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkSystem;