import React from "react";
import { selectChart } from "../charts/chartSlice";
import {useAppSelector} from "../../data/hooks";

export function Table(params: { id: number }) {
    const { id } = params;

    const table = selectChart(useAppSelector((state) => state), id)

    if (!table) {
        return (
            <div className="Table">
                <h1>Table doesn't exist</h1>
            </div>
        )
    }

    const prices = table.prices

    return (
        <div className="Table">
            <h2>{table.name}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {prices.map((row) => (
                        <tr>
                            <td>{row.date}</td>
                            <td>{row.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}