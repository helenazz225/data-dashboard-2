import React, { Component, useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from "recharts"

const RecipeChart = ({ id }) => {
    const [price, setPrice] = useState('')
    
    useEffect(() => {
        const getPrice = async () => {
            // const response = await fetch(`https://api.spoonacular.com/recipes/${id}/priceBreakdownWidget.json?apiKey=${API_KEY}`)
            // const json = await response.json();
            // console.log(json.totalCost && json.totalCost)
            // setPrice(json && json.totalCost)
        
        }
        getPrice().catch(console.error)

    })

    return (
        // <div>{price}</div>
        <div>
            <br></br>
            <h2>Cost Data</h2>
        </div>
    )
}

export default RecipeChart