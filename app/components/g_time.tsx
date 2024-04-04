import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'chartjs-adapter-date-fns';

export interface TimeData {
    client_id: number;
    up_time: string;
    off_time: string;
}

export interface DashboardTimeProps {
    clientId: number;
}

const DashboardTime: React.FC<DashboardTimeProps> = ({ clientId }) => {
    const [timeData, setTimeData] = useState<TimeData[]>([]);

    useEffect(() => {
        const fetchTimeData = async () => {
            try {
                const response = await axios.get(`/api/getTime/${clientId}`);
                setTimeData(response.data.timeData);
            } catch (error) {
                console.error("Error fetching time data:", error);
            }
        };

        fetchTimeData();
    }, [clientId]);

    useEffect(() => {
        if (timeData.length > 0) {
            const ctx = document.getElementById('time-chart') as HTMLCanvasElement;
            if (ctx) {
                // Destroy existing chart before creating new one
                Chart.getChart(ctx)?.destroy();

                new Chart(ctx, {
                    type: 'line',
                    data: {
                        datasets: timeData.flatMap((data, index) => ([
                            {
                                label: `Client ${data.client_id} - Up time`,
                                data: [{ x: new Date(data.up_time), y: new Date(data.up_time).getHours() }],
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                fill: false,
                                borderDash: [5, 5], 
                            },
                            {
                                label: `Client ${data.client_id} - Off time`,
                                data: [{ x: new Date(data.off_time), y: new Date(data.off_time).getHours() }],
                                borderColor: 'rgba(54, 162, 235, 1)',
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                                fill: false,
                            }
                        ]))
                    },
                    options: {
                        scales: {
                            x: {
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        hour: 'dd/MM/yyyy' 
                                    }
                                },
                                title: {
                                    display: true,
                                    text: 'Time'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Hour'
                                }
                            }
                        },
                        elements: {
                            line: {
                                tension: 0 
                            }
                        }
                    }
                });
            }
        }
    }, [timeData]);

    return (
        <div>
            <h2>Connection Times for Client {clientId}</h2>
            <canvas id="time-chart" width={500} height={250}></canvas>
        </div>
    );
};

export default DashboardTime;
