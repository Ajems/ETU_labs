import {selectChart, selectChartId, selectChartIds, selectSelectedChartId} from "./chartSlice";
import {useAppDispatch, useAppSelector} from "../../data/hooks";
import {Chart} from "./chart";

export function Charts() {
    const dispatch = useAppDispatch();
    const chartIds = selectChartIds(useAppSelector((state) => state))
    const chartId = selectSelectedChartId(useAppSelector((state) => state))
    const stocksNames = {
        0: 'AAPL',
        1: 'AMD',
        2: 'AMZN',
        3: 'CSCO',
        4: 'MSFT',
        5: 'QCOM',
        6: 'SBUX',
        7: 'TSLA',
    }

    if (chartIds.length === 0) {
        return (
            <div>
                <h1>Charts doesn't exist</h1>
            </div>
        )
    }

    return (
        <div>
            <select onChange={(event) => {
                dispatch(selectChartId(Number(event.target.value)))
            }}>
                {chartIds.map((id) => (
                    <option key={'option-' + id} value={id}>
                        {stocksNames[id]}
                    </option>
                ))}
            </select>

            <div>
                <Chart key={'chart-' + chartId} id={chartId}/>
            </div>
        </div>
    )
}