import React from 'react';
import Sidebar from '../components/sidebar';
import DashboardNombreVictime from '../components/g_nombrevictime';
import DashboardPaysVictime from '../components/g_paysvicitime';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '20px' }}>
                <h1>Dashboard</h1>
                <div style={{ display: 'flex' }}>
                    <DashboardNombreVictime />
                    <DashboardPaysVictime/>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
