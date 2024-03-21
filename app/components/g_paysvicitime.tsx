"use client"
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const PieChartDashboard = () => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstance = useRef<Chart<"pie"> | null>(null); // Référence pour stocker l'instance du graphique

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                if (chartInstance.current) {
                    chartInstance.current.destroy(); // Détruire le graphique précédent s'il existe
                }
                chartInstance.current = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: ['France', 'Angleterre', 'Chine', 'Russie', 'États-Unis', 'Inde'],
                        datasets: [{
                            label: 'Nombre de victimes',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(153, 102, 255)',
                                'rgb(255, 159, 64)'
                            ]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            }
        }
    }, []);

    return (
        <div style={{ width: '400px', marginLeft: '20px' }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PieChartDashboard;
