import React from "react";
import {Table} from "./table";
import {selectChartId, selectChartIds, selectSelectedChartId} from "../charts/chartSlice";
import {useAppDispatch, useAppSelector} from "../../data/hooks";

export function Tables() {
    const dispatch = useAppDispatch()

    const tableIds = selectChartIds(useAppSelector((state) => state))
    const tableId = selectSelectedChartId(useAppSelector((state) => state)) ?? 0


    if (tableIds.length === 0) {
        return (
            <div className="Tables">
                <h1>Tables doesn't exist</h1>
            </div>
        )
    }

    return (
        <div className="Tables">
            <select onChange={(event) => {
                dispatch(selectChartId(Number(event.target.value)))
            }}>
                {tableIds.map((id) => (
                    <option key={'option-' + id} value={id}>
                        {id}
                    </option>
                ))}
            </select>

            <div className="Table">
                <Table key={'table-' + tableId} id={tableId}/>
            </div>
        </div>
    )
}