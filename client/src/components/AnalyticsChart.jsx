import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function AnalyticsChart({
    completed,
    pending,
}) {

    const data = {
        labels: [
            "Completed",
            "Pending",
        ],
        datasets: [
            {
                data: [
                    completed,
                    pending,
                ],
                backgroundColor: [
                    "#22c55e",
                    "#eab308",
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="w-[300px] mx-auto mb-8">
            <Pie data={data} />
        </div>
    );
}

export default AnalyticsChart;
