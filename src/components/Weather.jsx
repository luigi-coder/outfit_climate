import { useEffect, useState } from 'react';
import img_1 from '../assets/cero_a_diez_grados.jpeg';
import img_2 from '../assets/diez_a_veinte_grados.jpeg';
import img_3 from '../assets/veinte_a_treinta_grados.jpeg';
import img_4 from '../assets/treinta_a_cuarenta_grados.jpeg';
import axios from 'axios';


const Weather = ({ location }) => {

  const [translatedName, setTranslatedName] = useState('');
  const [translatedDescription, setTranslatedDescription] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [translationsLoaded, setTranslationsLoaded] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) {
        return; // No se realiza la solicitud si la ubicación está vacía
      }

      try {
      
        // Api de clima
        const apiKey = '821bd2a477aeb9df9841356b05f63792';
        const encodedLocation = encodeURIComponent(location);
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedLocation}&appid=${apiKey}`;
        const response = await axios.get(url);
        setWeatherData(response.data);

        // Api Traducción de nombre y descripción del clima
        const translationNameResponse = await axios.post('https://libretranslate.de/translate', null, {
          params: {
            q: response.data.name,
            source: 'en',
            target: 'es'
          }
        });

        setTranslatedName(translationNameResponse.data.translatedText);

        const translationDescriptionResponse = await axios.post('https://libretranslate.de/translate', null, {
          params: {
            q: response.data.weather[0].description,
            source: 'en',
            target: 'es'
          }
        });

        setTranslatedDescription(translationDescriptionResponse.data.translatedText);

        setTranslationsLoaded(true);

        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulamos un retraso de 2 segundos

      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [location]);

  if (!weatherData) {
    return <div>Cargando...</div>;
  }
  const temperatureInCelsius = Math.round(weatherData.main.temp - 273.15);

  


  return (
    <>
      {translationsLoaded ? ( // Mostramos los datos cuando las traducciones estén cargadas
        <>
          {
            temperatureInCelsius <= 10 ? <img src={img_1} alt="" /> :
              temperatureInCelsius > 10 && temperatureInCelsius <= 20 ? <img src={img_2} alt="" /> :
                temperatureInCelsius > 20 && temperatureInCelsius <= 30 ? <img src={img_3} alt="" /> :
                  temperatureInCelsius > 30 ? <img src={img_4} alt="" /> : null
          }
          <h2>{translatedName}</h2>
          <p>{translatedDescription}</p>
          <p>Temperatura: {temperatureInCelsius}°C</p>
        </>
      ) : (
        <div>Cargando...</div>
      )}
    </>
  );

  /* return (
    <div>
      <img src="https://http2.mlstatic.com/D_NQ_NP_605254-MLA54082456010_022023-O.webp" alt="" />
      <h2>{weatherData.name}</h2>
      <p>{weatherData.weather[0].description}</p>
      <p>Temperatura: {temperatureInCelsius}°C</p>
    </div>
  ); */

  
};

export default Weather; 
