import React, { useState, useEffect, useRef } from 'react';
import Weather from './components/Weather';
import FormCity from './components/FormCity';



const App = () => {

  const [inputCity, setInputCity] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (value) => {
    setInputCity(value);
    setIsSubmitted(true);
  }

  return (
    <>
      <FormCity 
        onSubmit={handleSubmit}
      />
      {isSubmitted && <Weather location={inputCity} />}
    </>
  )
}

export default App

