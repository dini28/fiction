import React from 'react';
import './SystemConfiguration.css';

const SystemConfiguration = () => {
    const specs = {
        minimum: {
            title: "MINIMUM PROTOCOLS",
            items: [
                { label: "OS", value: "Windows 10 64-bit (Latest Update)" },
                { label: "PROCESSOR", value: "Intel Core i5-8400 / AMD Ryzen 5 2600" },
                { label: "MEMORY", value: "12 GB RAM" },
                { label: "GRAPHICS", value: "NVIDIA GeForce RTX 2060 / AMD Radeon RX 5600 XT" },
                { label: "STORAGE", value: "70 GB SSD available space" } // Increased storage for modern games
            ]
        },
        recommended: {
            title: "OPTIMAL CONFIGURATION",
            items: [
                { label: "OS", value: "Windows 10/11 64-bit (Latest Update)" },
                { label: "PROCESSOR", value: "Intel Core i7-10700K / AMD Ryzen 7 5800X" },
                { label: "MEMORY", value: "16 GB RAM" },
                { label: "GRAPHICS", value: "NVIDIA GeForce RTX 3070 / AMD Radeon RX 6800" },
                { label: "STORAGE", value: "70 GB NVMe SSD available space" }
            ]
        }
    };

    return (
        <section className="sys-config-section">
            <div className="sys-config-container">
                <header className="sys-config-header">
                    <h2 className="sys-config-title">SYSTEM PROTOCOLS</h2>
                    <div className="sys-config-subtitle">ENSURE YOUR HARDWARE IS BATTLE-READY</div>
                </header>

                <div className="sys-config-grid">
                    <div className="sys-config-card minimum">
                        <div className="card-header">
                            <h3>{specs.minimum.title}</h3>
                            <div className="header-decoration"></div>
                        </div>
                        <ul className="spec-list">
                            {specs.minimum.items.map((item, index) => (
                                <li key={index} className="spec-item">
                                    <span className="spec-label">{item.label}</span>
                                    <span className="spec-value">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="sys-config-card recommended">
                        <div className="card-header">
                            <h3>{specs.recommended.title}</h3>
                            <div className="header-decoration"></div>
                        </div>
                        <ul className="spec-list">
                            {specs.recommended.items.map((item, index) => (
                                <li key={index} className="spec-item">
                                    <span className="spec-label">{item.label}</span>
                                    <span className="spec-value">{item.value}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SystemConfiguration;
