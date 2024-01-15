import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from "react-chartjs-2";
import {selectChart} from "./chartSlice";
import {useAppDispatch, useAppSelector} from "../../data/hooks";
import {selectDate, updateDate} from "./dateSlice";
import {controllerSocket} from "../../data/socket";

export function Chart (params: {id: number}) {
    const {id} = params
    const dispatch = useAppDispatch()

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const chart = selectChart(useAppSelector((state) => state), id);
    const currentDate = swapNumber(selectDate(useAppSelector((state) => state)));
    let currentPrice = 0

    controllerSocket.on('clockStocks', (date: string) => {
        dispatch(updateDate({ date: formatDate(date.date) }));
    })

    if (!chart) {
        return (
            <div>
                <p>Chart doesn't exist</p>
            </div>
        );
    }

    const dates: string[] = [];
    const values: number[] = [];
    for (let i = 0; i < chart.prices.length; i++) {
        const { date, price } = chart.prices[i];
        if (new Date(date).getTime() > new Date(currentDate).getTime()){
            continue
        }
        values.push(price);
        dates.push(date);
        if (date === currentDate) {
            currentPrice = price
        }
        if (currentPrice === 0){
            currentPrice = "Цена отсутсвует"
        }
    }
    dates.reverse()
    values.reverse()

    const data = {
        labels: dates,
        datasets: [
            {
                type: 'line',
                label: chart.name,
                data: values,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };

    return (
        <>
            <h1>{swapFS(currentDate)}</h1>
            <h2>Price: {currentPrice}</h2>
            <div>
                <Line data={data} />
            </div>
        </>
    )
}

function formatDate(inputDate) {
    const parts = inputDate.split('T')[0].split('-');
    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
}

function swapNumber(inputDate) {
    if (inputDate.includes('-')) {
        inputDate = inputDate.replaceAll('-', '/')
        const [year, month, day] = inputDate.split('/');
        return `${month}/${day}/${year}`;
    }
    const [day, month, year] = inputDate.split('/');
    return`${month}/${day}/${year}`;
}

function swapFS(inputDate) {
    const [month, day, year] = inputDate.split('/');
    return`${day}/${month}/${year}`;
}
