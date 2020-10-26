import React, { useEffect } from "react";
import Chart from "chart.js";
import product from "./musinsa-scouter-102618-export2.json";
function App() {
    useEffect(() => {
        const ctx = document.getElementById("myChart");
        let pLabels = [];
        let pData = [];
        let year, month, day, newDate;
        const timeFormat = "MM/DD/YYYY HH:mm";
        for (const [key, value] of Object.entries(product.calendar)) {
            year = Number(key.substring(0, 4));
            month = Number(key.substring(4, 6));
            day = Number(key.substring(6, 8));
            newDate = new Date(year, month, day);

            pLabels.push(newDate);
            pData.push({ x: newDate, y: Number(value.price) });
        }
        new Chart(ctx, {
            type: "line",
            data: {
                labels: pLabels,
                datasets: [
                    {
                        label: "price",
                        data: pData,

                        // Point Styling
                        pointBorderWidth: (context) => 3,
                        pointBorderColor: (context) => "rgba(0, 0, 0, 0.3)",
                        pointBackgroundColor: (context) => "rgba(0, 0, 0, 0.3)",
                        pointHoverBackgroundColor: (context) => "rgba(0, 0, 0, 1)",
                        pointHoverBorderColor: (context) => "rgba(0, 0, 0, 1)",

                        // Line Styling
                        borderWidth: (context) => 1,
                        borderColor: (context) => "rgba(0, 0, 0, 0.9)",
                        backgroundColor: (context) => "rgba(0, 0, 0, 0.01)",

                        // fill: (context) => false,
                        hoverBackgroundColor: (context) => "rgba(0, 0, 0, 0.1)",

                        // General
                        // xAxisID: "date-x-axis",
                        // yAxisID: "price-y-axis",
                    },
                ],
            },
            options: {
                tooltips: {
                    mode: "index",
                    intersect: false,
                },
                title: {
                    text: "product price",
                },
                scales: {
                    xAxes: [
                        {
                            id: "date-x-axis",
                            type: "time",
                            time: {
                                parser: timeFormat,
                                tooltipFormat: "YYYY.MM.DD",
                            },
                            scaleLabel: {
                                display: true,
                                labelString: "Date",
                            },
                            ticks: {
                                major: {
                                    fontStyle: "bold",
                                    fontColor: "#FF0000",
                                },
                            },
                        },
                    ],
                    yAxes: [
                        {
                            id: "price-y-axis",
                            // type: "time",
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            },
        });
    }, []);

    return (
        <div className="App">
            <canvas id="myChart"></canvas>
        </div>
    );
}

export default App;
