import React from 'react';
import logo from './logo.svg';
import Chart from './components/ChartComponent'
import './App.css';

const myData1 = [
  { x: 0, y: 10 },
  { x: 1, y: 20 },
  { x: 2, y: 40 },
  { x: 3, y: 20 },
  { x: 4, y: 10 }
];

const myData2 = [
  { x: "USA", y: 193 },
  { x: "Canada", y: 46 },
  { x: "UK", y: 320 },
  { x: "China", y: 341 },
  { x: "South Africa", y: 88 }
];

function App() {

  return (
    <div className="container bg">
      <div className='row text-center header-styling'>
        <h1 className='col'>Chart it out!</h1>
      </div>
      <div className='row'>
        <Chart data={myData2}/>
      </div>
    </div>
  );
}

export default App;
