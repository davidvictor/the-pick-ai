"use client";

import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Moon, CloudSun, CloudMoon, Wind } from "lucide-react";

export type WeatherType = 
  | 'clear-day' 
  | 'clear-night' 
  | 'partly-cloudy-day' 
  | 'partly-cloudy-night' 
  | 'cloudy' 
  | 'rain' 
  | 'sleet' 
  | 'snow' 
  | 'wind' 
  | 'fog';

interface WeatherIconProps {
  type: WeatherType;
  size?: number;
  className?: string;
}

/**
 * WeatherIcon component for displaying weather icons
 * Uses Lucide React icons
 */
export function WeatherIcon({ type, size = 24, className = '' }: WeatherIconProps) {
  const iconProps = {
    size,
    className,
    strokeWidth: 1.5, // Thinner lines for a more elegant look
  };

  // Return the appropriate icon based on the weather type
  switch (type) {
    case 'clear-day':
      return <Sun {...iconProps} />;
    case 'clear-night':
      return <Moon {...iconProps} />;
    case 'partly-cloudy-day':
      return <CloudSun {...iconProps} />;
    case 'partly-cloudy-night':
      return <CloudMoon {...iconProps} />;
    case 'cloudy':
      return <Cloud {...iconProps} />;
    case 'rain':
      return <CloudRain {...iconProps} />;
    case 'sleet':
      return <CloudDrizzle {...iconProps} />;
    case 'snow':
      return <CloudSnow {...iconProps} />;
    case 'wind':
      return <Wind {...iconProps} />;
    case 'fog':
      return <CloudFog {...iconProps} />;
    default:
      return <Cloud {...iconProps} />;
  }
}
