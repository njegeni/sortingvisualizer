"use client"
import Image from "next/image";
import GridLayout from "./components/grids";
import ButtonLayout from "./components/buttons";
import Descriptions from "./components/descriptions";
import React, {useEffect, useState} from "react";

export default function Home() {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [arraySize, setArraySize] = useState(50);
  const [array, setArray] = useState([]);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [mode, setMode] = useState('random');
  const [isPlaying, setIsPlaying] = useState(false);

  const generateArray = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/sort/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          size: arraySize,
          mode: mode,
          algorithm: algorithm
        })
      });

      const data = await response.json();
      console.log('Got data from Flask:', data);

      setSteps(data.steps);
      setCurrentStep(0);

    
      setArray(data.initial_array);
      setComparisons(0);
      setSwaps(0);
              
    } catch (error) {
      console.error('Error fetching:', error);
    }
  };


useEffect(() => {
  console.log('useEffect running - isPlaying:', isPlaying, 'currentStep:', currentStep, 'total steps:', steps.length);
  
  if (isPlaying && currentStep < steps.length - 1) {
    const timer = setTimeout(() => {
      const nextStep = currentStep + 1;
      console.log('Moving to step:', nextStep);
      setCurrentStep(nextStep);
      setArray(steps[nextStep].array);
      setComparisons(steps[nextStep].metrics.comps);
      setSwaps(steps[nextStep].metrics.swaps);
    }, 5);

    return () => clearTimeout(timer);
  } else if (currentStep >= steps.length - 1) {
    console.log('Animation complete, stopping');
    setIsPlaying(false);
  }
}, [isPlaying, currentStep, steps]);

const togglePlayPause = () => {
  if (steps.length === 0) {
    console.log('Generate an array first!');
    return;
  }
  setIsPlaying(!isPlaying);
};

  return (
    <div className="min-h-screen font-sans bg-blue-800 m-20 font-serif">
      <div className="flex">
        <h1 className="text-4xl">
          Sorting Algorithms Visualized
        </h1>
      </div>
      <div className="flex flex-col bg-blue-800 font-serif">
        <ButtonLayout
          arraySize={arraySize}
          setArraySize={setArraySize}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          mode={mode}
          setMode={setMode}
          generateArray={generateArray}
          isPlaying={isPlaying}
          togglePlayPause={togglePlayPause}  
          />
      </div>
      <div className="flex flex-col bg-blue-800 my-4  font-serif">
        <GridLayout 
          array={array}
          comparisons={comparisons}
          swaps={swaps}
          currentStep={currentStep}
          steps={steps}
        />
      </div>
      <div>
        <Descriptions />
      </div>
    </div>
  );
}