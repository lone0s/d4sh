"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartDashboard = () => {
    const chartContainer = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let myChart: Chart<"bar", number[], string> | null = null;

        if (chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');

            if (ctx) {
                myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
                        datasets: [{
                            label: 'Nombre de victimes',
                            data: [65, 59, 80, 81, 56, 55, 40],
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }

        return () => {
            if (myChart && typeof myChart.destroy === 'function') {
                myChart.destroy();
            }
        };
    }, []);

    return (
        <div style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
            <canvas ref={chartContainer} width={800} height={400}></canvas>
        </div>
    );
};

export default ChartDashboard;
