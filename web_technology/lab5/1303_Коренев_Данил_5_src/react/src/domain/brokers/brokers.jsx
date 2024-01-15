import {BrokersList} from "./brokersList";
import React from "react";
import {brokerSocket} from "../../data/socket";
import {deleteBroker, updateBroker} from "./brokerSlice";
import {useAppDispatch} from "../../data/hooks";
import './brokers.css'
export function Brokers() {
    const dispatch = useAppDispatch();

    brokerSocket.emit('findAll', (brokers: { id: number; login: string; balance: number }[]) => {
        brokers.forEach((broker) => {
            dispatch(updateBroker(broker));
        });
    });

    brokerSocket.on('update', (broker: { id: number; login: string; balance: number }) => {
        dispatch(updateBroker(broker));
    });

    brokerSocket.on('remove', (brokerId: number) => {
        dispatch(deleteBroker(brokerId));
    });

    return (
        <>
            <div className="BrokerFormContainer">
                <div className="BrokerForm">
                    <label htmlFor="broker-login">Login: </label>
                    <input id="broker-login" type="text" />
                    <br />
                    <label htmlFor="broker-money">Money: </label>
                    <input id="broker-money" type="number" />
                    <br />
                    <button
                        className="BrokerButton"
                        onClick={() => {
                            const login = document.getElementById('broker-login');
                            const balance = document.getElementById('broker-money');
                            brokerSocket.emit('update', {
                                login: login.value,
                                balance: Number(balance.value),
                            });
                            console.log(`${login.value}, ${balance.value}`);
                            login.value = '';
                            balance.value = '';
                        }}
                    >
                        Create / Update
                    </button>
                </div>
            </div>
            <br/>
            <BrokersList/>
        </>
    )
}