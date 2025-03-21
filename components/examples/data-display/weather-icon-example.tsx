"use client"

import * as React from "react"
import { WeatherIcon, WeatherType } from "@/components/ui/weather-icon"

export function WeatherIconExample() {
  const weatherTypes: WeatherType[] = [
    'clear-day',
    'clear-night',
    'partly-cloudy-day',
    'partly-cloudy-night',
    'cloudy',
    'rain',
    'sleet',
    'snow',
    'wind',
    'fog'
  ]

  return (
    <div className="p-6 space-y-8">
      <div>
        <h3 className="text-2xl font-bold mb-4">Weather Icons</h3>
        <p className="text-muted-foreground mb-4">
          Weather icons for displaying different weather conditions.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-semibold mb-2">All Weather Types</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {weatherTypes.map((type) => (
              <div key={type} className="flex flex-col items-center justify-center p-4 border rounded-md">
                <WeatherIcon type={type} size={32} />
                <span className="mt-2 text-sm text-center">{type}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Different Sizes</h4>
          <div className="flex flex-wrap items-end gap-6 p-4 border rounded-md">
            <div className="flex flex-col items-center">
              <WeatherIcon type="cloudy" size={16} />
              <span className="mt-2 text-xs">16px</span>
            </div>
            <div className="flex flex-col items-center">
              <WeatherIcon type="cloudy" size={24} />
              <span className="mt-2 text-xs">24px</span>
            </div>
            <div className="flex flex-col items-center">
              <WeatherIcon type="cloudy" size={32} />
              <span className="mt-2 text-xs">32px</span>
            </div>
            <div className="flex flex-col items-center">
              <WeatherIcon type="cloudy" size={48} />
              <span className="mt-2 text-xs">48px</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Custom Styling</h4>
          <div className="flex flex-wrap gap-6 p-4 border rounded-md">
            <div className="flex flex-col items-center">
              <WeatherIcon type="clear-day" size={32} className="text-yellow-500" />
              <span className="mt-2 text-xs">Yellow Sun</span>
            </div>
            <div className="flex flex-col items-center">
              <WeatherIcon type="rain" size={32} className="text-blue-500" />
              <span className="mt-2 text-xs">Blue Rain</span>
            </div>
            <div className="flex flex-col items-center">
              <WeatherIcon type="snow" size={32} className="text-sky-300" />
              <span className="mt-2 text-xs">Light Blue Snow</span>
            </div>
            <div className="flex flex-col items-center">
              <WeatherIcon type="wind" size={32} className="text-gray-500" />
              <span className="mt-2 text-xs">Gray Wind</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
