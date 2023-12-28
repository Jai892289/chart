import React, { useState, useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto'; 
import axios from 'axios';

function Bar() {
  const [chartData, setChartData] = useState(null);
  const[datas, setDatas]= useState([])
  const chartCanvasRef = useRef(null);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res)=> res.json())
    .then((data) => {
      setDatas(data);
    })
  },[])
  useEffect(() => {
    const d = datas.map((post) => post.title.split(' ').slice(0,2).join(' ')).slice(0,5);
    const dataValues = datas.map((post) => post.id).slice(0,5);
    const da = datas.map((post) => post.title.split(' ').slice(0,2).join(' ')).slice(0,5);

    const mockDatas = {
      labels: d,
      datasets: [
        {
          label: 'Sales',
          data: dataValues,
          backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 206, 86)'],
          borderWidth: 1,
        },
      ],
    };

    setChartData(mockDatas);
  }, []);

  useEffect(() => {
    let myChart;

    if (chartData) {
      const canvas = chartCanvasRef.current;
      myChart = new Chart(canvas, {
        type: 'pie',  
        data: chartData,
      });
    }

    return () => {
      if (myChart) {
        myChart.destroy();
      }
    };
  }, [chartData]);

  return <canvas ref={chartCanvasRef} width="100" height="100"></canvas>;
}

export default Bar;
