"use client"
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

interface BrowserData {
    client_id: number;
    browser_info: string;
}


const DashboardBrowser: React.FC<{ clientId: number }> = ({ clientId }) => {
    const [browserData, setBrowserData] = useState<BrowserData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/getBrowser/${clientId}`);
                setBrowserData(response.data.browserData);
            } catch (error) {
                console.error("Error fetching browser data:", error);
            }
        };

        fetchData();
    }, [clientId]);

    useEffect(() => {
        // Create chart
        if (browserData.length > 0) {
            const browserCounts = browserData.reduce((acc, curr) => {
                acc[curr.browser_info] = (acc[curr.browser_info] || 0) + 1;
                return acc;
            }, {} as Record<string, number>);

            const labels = Object.keys(browserCounts);
            const data = Object.values(browserCounts);

            const ctx = document.getElementById('browser-chart') as HTMLCanvasElement;
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
    }, [browserData]);

    return (
        <div>
            <h2>Browser Distribution for Client {clientId}</h2>
            <canvas id="browser-chart" width={200} height={300}></canvas>
        </div>
    );
};

export default DashboardBrowser;
