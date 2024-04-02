"use client"
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

interface DeviceData {
    client_id: number;
    device_type: string;
}

const DashboardDevice: React.FC<{ clientId: number }> = ({ clientId }) => {
    const [deviceData, setDeviceData] = useState<DeviceData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/getDevice/${clientId}`);
                setDeviceData(response.data.deviceData);
            } catch (error) {
                console.error("Error fetching device data:", error);
            }
        };

        fetchData();
    }, [clientId]);

    useEffect(() => {
        // Create chart
        if (deviceData.length > 0) {
            const deviceCounts = deviceData.reduce((acc, curr) => {
                acc[curr.device_type] = (acc[curr.device_type] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const labels = Object.keys(deviceCounts);
            const data = Object.values(deviceCounts);

            const ctx = document.getElementById('device-chart') as HTMLCanvasElement;
            if (ctx) {
                // Check if a chart already exists
                if (Chart.getChart(ctx)) {
                    // Destroy the existing chart
                    Chart.getChart(ctx)?.destroy();
                }

                // Create a new chart (pie chart)
                new Chart(ctx, {
                    type: 'pie', // Change the type to 'pie' for pie chart
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Device Type Count',
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.5)',
                                'rgba(54, 162, 235, 0.5)',
                                'rgba(255, 206, 86, 0.5)',
                                'rgba(75, 192, 192, 0.5)',
                                'rgba(153, 102, 255, 0.5)',
                                'rgba(255, 159, 64, 0.5)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
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
    }, [deviceData]);

    return (
        <div>
            <h2>Device Type Distribution for Client {clientId}</h2>
            <canvas id="device-chart" width={100} height={200}></canvas>
        </div>
    );
};

export default DashboardDevice;
