"use client"
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import 'chartjs-adapter-date-fns';


export interface TimeData {
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
                const newData = response.data.timeData.map((data: any) => ({
                    up_time: new Date(data.up_time),
                    off_time: new Date(data.off_time)
                }));
                setTimeData(newData);
            } catch (error) {
                console.error("Error fetching time data:", error);
            }
        };
    
        fetchTimeData();
    }, [clientId]);

    useEffect(() => {
        if (timeData.length > 0) {
            const upTimes = timeData.map(data => new Date(data.up_time));
            const offTimes = timeData.map(data => new Date(data.off_time));

            const upHours = upTimes.map(time => time.getHours());
            const upDays = upTimes.map(time => time.getDate());

            const offHours = offTimes.map(time => time.getHours());

            const ctx = document.getElementById('time-chart') as HTMLCanvasElement;
            if (ctx) {
                // Destroy existing chart before creating new one
                Chart.getChart(ctx)?.destroy();

                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: upDays.map((day, index) => `${day}/${upTimes[index].getMonth() + 1}`), // Format: DD/MM
                        datasets: [
                            {
                                label: 'Hour of Connection',
                                data: upHours,
                                borderColor: 'rgba(255, 99, 132, 1)',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            },
                            {
                                label: 'Hour of Disconnection',
                                data: offHours,
                                borderColor: 'rgba(54, 162, 235, 1)',
                                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            }
                        ]
                    },
                    options: {
                        scales: {
                            x: {
                                title: {
                                    display: true,
                                    text: 'Day'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Hour'
                                }
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
