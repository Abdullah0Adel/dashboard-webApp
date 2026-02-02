"use client";
import { useTranslations } from "next-intl";
import { useState, useMemo } from "react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";


const categoryData = [
    { name: "Clothing", sold: 520 },
    { name: "Shoes", sold: 310 },
    { name: "Accessories", sold: 180 },
    { name: "Bags", sold: 260 },
    { name: "Bags", sold: 260 },
    { name: "Bags", sold: 260 },
    { name: "Bags", sold: 260 },
];

// Products
const productData = [
    { name: "T-Shirt Black", sold: 300 },
    { name: "T-Shirt White", sold: 180 },
    { name: "Jacket Winter", sold: 420 },
    { name: "Sneakers A", sold: 260 },
    { name: "Sneakers B", sold: 190 },
    { name: "Cap", sold: 90 },
    { name: "Backpack", sold: 210 },
    { name: "Belt", sold: 70 },
    { name: "Hoodie", sold: 240 },
    { name: "Jeans", sold: 280 },
];

const classifyData = (data: any[], key: string) => {
    const values = data.map((d) => d[key]);
    const max = Math.max(...values);
    const min = Math.min(...values);

    return data.map((item) => ({
        ...item,
        level:
            item[key] === max
                ? "high"
                : item[key] === min
                    ? "low"
                    : "medium",
    }));
};


const MAX_VISIBLE_BARS = 8;
const BAR_WIDTH = 90;
const CHART_HEIGHT = 420;


const SalesChart = () => {
    const [viewMode, setViewMode] = useState<"category" | "product">("category");
    const t = useTranslations();
    const rawData = viewMode === "category" ? categoryData : productData;

    const chartData = useMemo(() => {
        return classifyData(
            [...rawData].sort((a, b) => b.sold - a.sold),
            "sold"
        );
    }, [viewMode]);


    return (
        <>
            <div
                className="w-full p-4 bg-[#E5F3FF] mt-4 rounded-xl"
            >
                <div className="flex lg:flex-row flex-col items-center justify-between mb-3">
                    <div className="flex gap-2 mb-3">
                        <button
                            onClick={() => setViewMode("category")}
                            style={{
                                padding: "8px 14px",
                                borderRadius: 8,
                                border: "none",
                                cursor: "pointer",
                                background:
                                    viewMode === "category" ? "#0088FF" : "#ddd",
                                color: viewMode === "category" ? "#fff" : "#000",
                            }}
                        >
                            {t('graph.ByCategory')}
                        </button>

                        <button
                            onClick={() => setViewMode("product")}
                            style={{
                                padding: "8px 14px",
                                borderRadius: 8,
                                border: "none",
                                cursor: "pointer",
                                background:
                                    viewMode === "product" ? "#0088FF" : "#ddd",
                                color: viewMode === "product" ? "#fff" : "#000",
                            }}
                        >
                            {t('graph.ByProduct')}
                        </button>
                    </div>
                    <div className="">
                        <h2 className="text-lg font-semibold">
                            {t('graph.TopSelling')} {viewMode === "category" ? t('graph.categories') : t('graph.products')}
                        </h2>
                        <p className="text-sm text-gray-600">
                            {t('graph.Overview')} {viewMode === "category" ? t('graph.categories') : t('graph.products')}
                        </p>
                    </div>
                </div>
                <div style={{ overflowX: "auto", width: "100%", maxWidth: '100vw' }}>
                    <ResponsiveContainer aspect={3} width="100%" height={CHART_HEIGHT}>

                        <BarChart
                            className="lg:w-full w-1/2"
                            height={CHART_HEIGHT}
                            data={chartData}

                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickCount={5} />
                            <Tooltip cursor={{ fill: "transparent" }} />

                            <Bar dataKey="sold" radius={[10, 10, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={index}
                                        fill={
                                            entry.level === "high"
                                                ? "#0088FF"
                                                : entry.level === "low"
                                                    ? "#FF383C"
                                                    : "#fff"
                                        }
                                    />
                                ))}
                            </Bar>

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
};

export default SalesChart;
