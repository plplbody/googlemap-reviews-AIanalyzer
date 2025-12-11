import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Polygon, Line, Text as SvgText, G, Circle } from 'react-native-svg';

interface RadarChartProps {
    data: { subject: string; A: number; fullMark: number }[];
    width?: number;
    height?: number;
    strokeColor?: string;
    fillColor?: string;
}

export default function RadarChart({
    data,
    width = 300,
    height = 300,
    strokeColor = "#f43f5e",
    fillColor = "#f43f5e"
}: RadarChartProps) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 40; // Padding for labels
    const angleStep = (Math.PI * 2) / data.length;

    // Helper to calculate coordinates
    const getCoordinates = (value: number, index: number, max: number) => {
        const angle = index * angleStep - Math.PI / 2; // Start from top
        const r = (value / max) * radius;
        return {
            x: centerX + r * Math.cos(angle),
            y: centerY + r * Math.sin(angle)
        };
    };

    // Generate grid lines (e.g., 5 levels like 1, 2, 3, 4, 5)
    const renderGrid = () => {
        const levels = 5;
        const grids = [];
        for (let i = 1; i <= levels; i++) {
            const points = data.map((_, index) => {
                const { x, y } = getCoordinates(i, index, levels);
                return `${x},${y}`;
            }).join(' ');
            grids.push(
                <Polygon
                    key={`grid-${i}`}
                    points={points}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                    fill="none"
                />
            );
        }
        return grids;
    };

    // Generate axes lines
    const renderAxes = () => {
        return data.map((item, index) => {
            const { x, y } = getCoordinates(item.fullMark, index, item.fullMark);
            return (
                <Line
                    key={`axis-${index}`}
                    x1={centerX}
                    y1={centerY}
                    x2={x}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeWidth="1"
                />
            );
        });
    };

    // Generate data polygon
    const renderData = () => {
        const points = data.map((item, index) => {
            const { x, y } = getCoordinates(item.A, index, item.fullMark);
            return `${x},${y}`;
        }).join(' ');

        return (
            <Polygon
                points={points}
                stroke={strokeColor}
                strokeWidth="2"
                fill={fillColor}
                fillOpacity="0.5"
            />
        );
    };

    // Generate labels
    const renderLabels = () => {
        return data.map((item, index) => {
            const { x, y } = getCoordinates(item.fullMark + 1.2, index, item.fullMark); // Push label out slightly
            return (
                <SvgText
                    key={`label-${index}`}
                    x={x}
                    y={y}
                    fill="#64748b"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {item.subject}
                </SvgText>
            );
        });
    };

    return (
        <View className="items-center justify-center">
            <Svg width={width} height={height}>
                <G>
                    {renderGrid()}
                    {renderAxes()}
                    {renderData()}
                    {renderLabels()}
                </G>
            </Svg>
        </View>
    );
}
