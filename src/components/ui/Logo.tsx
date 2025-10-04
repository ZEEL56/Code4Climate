import React from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  animated?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = false, 
  animated = false,
  className = '' 
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'logo-small';
      case 'large':
        return 'logo-large';
      default:
        return '';
    }
  };

  const logoClasses = `logo ${getSizeClass()} ${animated ? 'logo-animated' : ''} ${className}`;

  if (showText) {
    return (
      <div className="logo-with-text">
        <div className={logoClasses}>
          <span className="logo-icon">🌍</span>
        </div>
        <div className="logo-text">
          <div className="logo-title">ClimateTrack</div>
          <div className="logo-subtitle">Environmental Data Platform</div>
        </div>
      </div>
    );
  }

  return (
    <div className={logoClasses}>
      <span className="logo-icon">🌍</span>
    </div>
  );
};

export default Logo;
