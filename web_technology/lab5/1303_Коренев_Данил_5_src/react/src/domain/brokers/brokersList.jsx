import {getBrokersList} from "./brokerSlice";
import {brokerSocket} from "../../data/socket";
import {useAppSelector} from "../../data/hooks";

export function BrokersList() {
    const brokers = getBrokersList(useAppSelector((state) => state));
    return (
        <div className="BrokersList">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>LOGIN</th>
                        <th>BALANCE</th>
                    </tr>
                </thead>
                <tbody>
                {brokers.map((broker) => (
                    <tr key={'broker-' + broker.id}>
                        <td>{broker.id}</td>
                        <td>{broker.login}</td>
                        <td>{broker.balance}</td>
                        <td>
                            <button onClick={() => {
                                brokerSocket.emit('remove', broker.id)
                            }}
                            >Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
