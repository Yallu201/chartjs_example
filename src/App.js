import React, { useEffect, useState } from 'react';
import Chart from 'chart.js';
import product from './musinsa-scouter-102618-export2.json';

function getDate(dateString) {
    const year = Number(dateString.substring(0, 4));
    const month = Number(dateString.substring(4, 6));
    const day = Number(dateString.substring(6, 8));
    return new Date(year, month, day);
}
function App() {
    const [size, setSize] = useState(7);
    useEffect(() => {
        const ctx = document.getElementById('myChart');
        const days = Object.entries(product.calendar);
        const pLabels = days.map(([key]) => key);
        const pData = days.map(([key, { price }]) => ({
            x: getDate(key),
            y: Number(price),
        }));
        const chart_ = new Chart(ctx, {
            type: 'line',
            data: {
                labels: pLabels.slice(-1 * size, -1),

                datasets: [
                    {
                        label: 'price',
                        data: pData.slice(-1 * size, -1),

                        // Point Styling
                        pointBorderWidth: (context) => 3,
                        pointBorderColor: (context) => 'rgba(0, 0, 0, 0.3)',
                        pointBackgroundColor: (context) => 'rgba(0, 0, 0, 0.3)',
                        pointHoverBackgroundColor: (context) => 'rgba(0, 0, 0, 1)',
                        pointHoverBorderColor: (context) => 'rgba(0, 0, 0, 1)',

                        // Line Styling
                        borderWidth: (context) => 1,
                        borderColor: (context) => 'rgba(0, 0, 0, 0.9)',
                        backgroundColor: (context) => 'rgba(0, 0, 0, 0.01)',

                        // fill: (context) => false,
                        hoverBackgroundColor: (context) => 'rgba(0, 0, 0, 0.1)',
                    },
                ],
            },
            options: {
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                title: {
                    text: 'product price',
                },
                scales: {
                    xAxes: [
                        {
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: '날짜',
                            },
                        },
                    ],
                    yAxes: [
                        {
                            display: true,
                            ticks: {
                                stepSize: 10000,
                            },
                        },
                    ],
                },
            },
        });
        return () => chart_.destroy();
    }, [size]);

    return (
        <div className='App'>
            <button onClick={() => setSize(4)}>3일</button>
            <button onClick={() => setSize(8)}>7일</button>
            <button onClick={() => setSize(31)}>30일</button>
            <canvas id='myChart'></canvas>
        </div>
    );
}

export default App;
