import React from 'react';

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          className: 'status-badge status-pending',
          text: 'Pending',
          icon: '⏳'
        };
      case 'approved':
        return {
          className: 'status-badge status-approved',
          text: 'Approved',
          icon: '✅'
        };
      case 'rejected':
        return {
          className: 'status-badge status-rejected',
          text: 'Rejected',
          icon: '❌'
        };
      default:
        return {
          className: 'status-badge status-pending',
          text: 'Unknown',
          icon: '❓'
        };
    }
  };

  const config = getStatusConfig();
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  };

  return (
    <span className={`${config.className} ${sizeClasses[size]} flex items-center space-x-1`}>
      <span>{config.icon}</span>
      <span>{config.text}</span>
    </span>
  );
};

export default StatusBadge;
