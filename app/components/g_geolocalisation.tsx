"use client"
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface DashboardMapProps {
    userId: number;
}

const DashboardMap: React.FC<DashboardMapProps> = ({ userId }) => {
    const [userLocations, setUserLocations] = useState([]);
    const mapRef = useRef<L.Map | null>(null);

    useEffect(() => {
        const getUserLocation = async (userId: number) => {
            try {
                const response = await axios.get(`/api/getGeolocation/${userId}`);
                setUserLocations(response.data.userLocations);
            } catch (error) {
                console.error("Error fetching user location:", error);
            }
        };

        getUserLocation(userId);
    }, [userId]);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('dashboard-map', {
                minZoom: 2,
                maxBounds: L.latLngBounds([-90, -180], [90, 180])
            }).setView([0, 0], 2);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapRef.current);
        }

        mapRef.current.eachLayer(layer => {
            if (layer instanceof L.Circle) {
                mapRef.current!.removeLayer(layer);
            }
        });

        userLocations.forEach(async location => {
            const { geolocation } = location;
            const [latitudeString, longitudeString] = geolocation.split(',');
            const latitude = parseFloat(latitudeString);
            const longitude = parseFloat(longitudeString);

            if (location !== undefined && geolocation !== undefined) {
                const circle = L.circle([latitude, longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 500
                }).addTo(mapRef.current!);

                // on récupère l'adresse IP à partir de l'API /api/getIP
                try {
                    const response = await axios.get(`/api/getIP/${userId}`);
                    const ipAddress = response.data.clientData.ip_address;
                    
                    // popup au survol du cercle avec l'adresse IP
                    circle.bindPopup(ipAddress).openPopup();

                } catch (error) {
                    console.error("Error fetching IP address:", error);
                }

                // gestion d'affichage de la pop up
                circle.on('mouseover', function (event) {
                    circle.openPopup();
                });

                circle.on('mouseout', function (event) {
                    circle.closePopup();
                });
            }
        });
    }, [userLocations]);
    
    return <div id="dashboard-map" style={{ width: '100%', height: '300px' }} />;
};

export default DashboardMap;
