"use client"
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";

import './DeliveryMap.css';

function DeliveryMapForScoreDisplay({ deliveries }) {
    const containerRef = useRef(null);
    const [svgWidth, setSvgWidth] = useState(400);
    const maxDotsPerRow = 6;
    const rowHeight = 50;
    const dotRadius = 15;
    const spaceBetween = svgWidth / maxDotsPerRow;
    const numberOfRows = Math.ceil(deliveries.length / maxDotsPerRow);
    const svgHeight = numberOfRows * rowHeight;

    useEffect(() => {
        const updateSvgWidth = () => {
            if (containerRef.current) {
                setSvgWidth(containerRef.current.clientWidth);
            }
        };

        updateSvgWidth();
        window.addEventListener('resize', updateSvgWidth);

        return () => {
            window.removeEventListener('resize', updateSvgWidth);
        };
    }, []);

    useEffect(() => {
        const lastDot = containerRef.current?.lastChild;
        if (lastDot) {
            lastDot.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [deliveries]);

    const calculatePosition = (index) => {
        const row = Math.floor(index / maxDotsPerRow);
        const col = index % maxDotsPerRow;
        const isRowEven = row % 2 === 0;
        let x;
        if (isRowEven) {
            x = col * spaceBetween + spaceBetween / 2;
        } else {
            x = svgWidth - (col * spaceBetween + spaceBetween / 2); // Reverse direction for odd rows
        }
        const y = row * rowHeight + rowHeight / 2;
        return { x, y };
    };

    const drawLines = (index) => {
        const lines = [];
        if (index > 0) {
            const { x, y } = calculatePosition(index);
            const prevIndex = index - 1;
            const { x: prevX, y: prevY } = calculatePosition(prevIndex);

            const dx = x - prevX;
            const dy = y - prevY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const nx = dx / distance;
            const ny = dy / distance;
            const offsetX = nx * dotRadius;
            const offsetY = ny * dotRadius;

            const adjustedStartX = prevX + offsetX;
            const adjustedStartY = prevY + offsetY;
            const adjustedEndX = x - offsetX;
            const adjustedEndY = y - offsetY;

            lines.push(
                <line
                    key={`line-${index}`}
                    x1={adjustedStartX}
                    y1={adjustedStartY}
                    x2={adjustedEndX}
                    y2={adjustedEndY}
                    stroke="lightgreen"
                />
            );
        }
        return lines;
    };

    return (
        <>
            <div className="dotContainer" ref={containerRef}>
                <svg width={svgWidth} height={svgHeight} style={{ border: 'none' }}>
                    {deliveries.map((delivery, index) => {
                        const { x, y } = calculatePosition(index);
                        const lines = drawLines(index);

                        return (
                            <React.Fragment key={index}>
                                {lines}
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={dotRadius}
                                    fill="yellow"
                                />
                                <text
                                    x={x}
                                    y={y}
                                    dominantBaseline="middle"
                                    textAnchor="middle"
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'bold',
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                    }}
                                >
                                    {delivery}
                                </text>
                            </React.Fragment>
                        );
                    })}
                </svg>
            </div>
        </>
    );
}

DeliveryMapForScoreDisplay.propTypes = {
    deliveries: PropTypes.array.isRequired,
};

export default DeliveryMapForScoreDisplay;