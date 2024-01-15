import React from 'react'

export function Router() {
    return (
        <nav className="navbar">
            <a href="/charts">Charts</a>
            <br/>
            <a href="/tables">Tables</a>
            <br/>
            <a href="/brokers">Brokers</a>
            <br/>
            <a href="/settings">Settings</a>
        </nav>
    )
}