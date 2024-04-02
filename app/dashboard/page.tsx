"use client"
import React from 'react';
import Sidebar from '../components/sidebar';
import DashboardBrowser from '../components/g_browser';
import DashboardMap from '../components/g_geolocalisation';
import DashboardDevice from '../components/g_devices';
import DashboardTime from '../components/g_time'; // Ajout du composant DashboardTime
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
    const layout = [
        { i: 'a', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2, maxH: 2 },
        { i: 'b', x: 0, y: 2, w: 6, h: 2, minW: 3, minH: 2, maxH: 2, maxW: 6 },
        { i: 'c', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2, maxH: 2 },
        { i: 'd', x: 6, y: 2, w: 6, h: 2, minW: 3, minH: 2, maxH: 2, maxW: 6 },
    ];

    const cols = { lg: 12, md: 12, sm: 4, xs: 2, xxs: 1 };

    return (
        <div style={{ display: 'flex', width: '100%', overflow: 'hidden' }}>
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '20px' }}>
                <h1>Dashboard</h1>
                <ResponsiveReactGridLayout className="layout" layouts={{ lg: layout }} cols={cols}>
                    <div key="a" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                        <DashboardBrowser clientId={1} />
                    </div>
                    <div key="b" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                        <DashboardMap userId={1} />
                    </div>
                    <div key="c" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                        <DashboardDevice clientId={1} />
                    </div>
                    <div key="d" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                        <DashboardTime clientId={1} /> {/* Ajout du composant DashboardTime avec le prop clientId */}
                    </div>
                </ResponsiveReactGridLayout>
            </div>
        </div>
    );
};

export default Dashboard;
