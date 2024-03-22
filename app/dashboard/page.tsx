"use client"
import React from 'react';
import Sidebar from '../components/sidebar';
import DashboardNombreVictime from '../components/g_nombrevictime';
import DashboardPaysVictime from '../components/g_paysvicitime';
import { WidthProvider, Responsive } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
    const layout = [
        { i: 'a', x: 0, y: 0, w: 6, h: 2, minW: 3, minH: 2, maxH: 2 }, // on définit la taille des objets
        { i: 'b', x: 6, y: 0, w: 6, h: 2, minW: 3, minH: 2, maxH: 2 }  
    ];

    const cols = { lg: 12, md: 12, sm: 4, xs: 2, xxs: 1 }; // on définit les colonnes pour chaque breakpoint, on définit le nombre de colonnes de la grille en fonction de la taille de l'écran

    return (
        <div style={{ display: 'flex', width: '100%', overflow: 'hidden' }}> 
            <Sidebar />
            <div style={{ flex: 1, marginLeft: '20px' }}>
                <h1>Dashboard</h1>
                <ResponsiveReactGridLayout className="layout" layouts={{ lg: layout }} cols={cols}>
                    <div key="a" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                        <DashboardNombreVictime />
                    </div>
                    <div key="b" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black' }}>
                        <DashboardPaysVictime />
                    </div>
                </ResponsiveReactGridLayout>
            </div>
        </div>
    );
};

export default Dashboard;
