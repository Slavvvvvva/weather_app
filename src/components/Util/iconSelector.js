import clearDay from '../IMG/weather-icon/clear-day.svg'
import clearNight from '../IMG/weather-icon/clear-night.svg'
import partlyCloudyDay from '../IMG/weather-icon/partly-cloudy-day.svg'
import partlyCloudyNight from '../IMG/weather-icon/partly-cloudy-night.svg'
import cloudy from '../IMG/weather-icon/cloudy.svg'
import overcastDay from '../IMG/weather-icon/overcast-day.svg'
import overcastNight from '../IMG/weather-icon/overcast-night.svg'
import overcast from '../IMG/weather-icon/overcast.svg'
import drizzleDay from '../IMG/weather-icon/partly-cloudy-day-drizzle.svg'
import drizzleNight from '../IMG/weather-icon/partly-cloudy-night-drizzle.svg'
import drizzle from '../IMG/weather-icon/drizzle.svg'
import partlyCloudyRainDay from '../IMG/weather-icon/partly-cloudy-day-rain.svg'
import partlyCloudyRainNight from '../IMG/weather-icon/partly-cloudy-night-rain.svg'
import rain from '../IMG/weather-icon/rain.svg'
import snow from '../IMG/weather-icon/snow.svg'
import partlyCloudySnowNight from '../IMG/weather-icon/partly-cloudy-night-snow.svg'
import partlyCloudySnowDay from '../IMG/weather-icon/partly-cloudy-day-snow.svg'
import sleet from '../IMG/weather-icon/sleet.svg'
import partlyCloudySleetDay from '../IMG/weather-icon/partly-cloudy-day-sleet.svg'
import partlyCloudySleetNight from '../IMG/weather-icon/partly-cloudy-night-sleet.svg'
import thunderstorms from '../IMG/weather-icon/thunderstorms.svg'
import thunderstormsRain from '../IMG/weather-icon/thunderstorms-rain.svg'
import thunderstormsRainDay from '../IMG/weather-icon/thunderstorms-day-rain.svg'
import thunderstormsRainNight from '../IMG/weather-icon/thunderstorms-night-rain.svg'
import thunderstormsDay from '../IMG/weather-icon/thunderstorms-day.svg'
import thunderstormsNight from '../IMG/weather-icon/thunderstorms-night.svg'
import mist from '../IMG/weather-icon/mist.svg'
import tornado from '../IMG/weather-icon/tornado.svg'





export const iconSelector = (patch) => {
    switch (patch.icon) {
        case '01d': return clearDay
        case '01n': return clearNight
        case '02d': return partlyCloudyDay
        case '02n': return partlyCloudyNight
        case '03d': return cloudy
        case '03n': return cloudy
        case '04d': switch (patch.id) {
            case 804: return overcast
            default: return overcastDay
        }
        case '04n': switch (patch.id) {
            case 804: return overcast
            default: return overcastNight
        }
        case '09d': switch (patch.id) {
            case 300: return drizzleDay
            default: return drizzle
        }
        case '09n': switch (patch.id) {
            case 300: return drizzleNight
            default: return drizzle
        }
        case '10d': switch (patch.id) {
            case 500: return partlyCloudyRainDay
            default: return rain
        }
        case '10n': switch (patch.id) {
            case 500: return partlyCloudyRainNight
            default: return rain
        }
        case '13d': switch (patch.id) {
            case 600: return partlyCloudySnowDay
            case 611: return sleet
            case 612: return partlyCloudySleetDay
            case 613: return sleet
            case 615: return sleet
            case 616: return sleet
            default: return snow
        }
        case '13n': switch (patch.id) {
            case 600: return partlyCloudySnowNight
            case 611: return sleet
            case 612: return partlyCloudySleetNight
            case 613: return sleet
            case 615: return sleet
            case 616: return sleet
            default: return snow
        }
        case '11d': switch(patch.id) {
            case 200 : return thunderstormsRainDay
            case 201 : return thunderstormsRain
            case 202 : return thunderstormsRain
            case 210 : return thunderstormsDay
            case 221 : return thunderstormsRain
            case 230 : return thunderstormsRain
            case 231 : return thunderstormsRain
            default: return thunderstorms
        }
        case '11n': switch(patch.id) {
            case 200 : return thunderstormsRainNight
            case 201 : return thunderstormsRain
            case 202 : return thunderstormsRain
            case 210 : return thunderstormsNight
            case 221 : return thunderstormsRain
            case 230 : return thunderstormsRain
            case 231 : return thunderstormsRain
            default: return thunderstorms
        }
        case '50d': switch(patch.id) {
            case 781 : return tornado
            default: return mist
        }
        case '50n': switch(patch.id) {  
            case 781 : return tornado
            default: return mist
        }
        default: return clearDay
    }
}