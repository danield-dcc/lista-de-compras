import React from 'react'
import "./AppBar.css"

const AppBar = () => {
    return (
        <div className="row">
            <div className="col-sm-12 navBar py-2">
                <h1 className="text-white">Lista de compras</h1>
                <h4 className="text-white font-italic">
                    Lista de compras dos produtos da semana
                </h4>
            </div>
        </div>
    )
}

export default AppBar;

