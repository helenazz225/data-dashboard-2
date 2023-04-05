import React, { useEffect, useState} from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY
import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import { Link } from "react-router-dom"

const RecipeInfo = ({image, title, id}) => {
    let params = useParams()
    // const[fullDetails, setFullDetails] = useState(null)
    const[vegetarian, setVegetarian] = useState(false)
    const[healthScore, setHealthScore] = useState(0)
    const[sourceURL, setSourceURL] = useState('')
    const[title2, setTitle2] = useState('')
    const[img, setImg] = useState('')
    // print('hello9')
    // const [test, setTest] = useState(null)
    useEffect(() => {
        const getRecipeInfo = async () => {
            const response = await fetch(`https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${API_KEY}`)
            // print(response)
            // console.log(response)
            const json = await response.json()
            // console.log(json.image)
            // print(json)
            // print(json)
            setTitle2(json.title)
            setImg(json.image)
            setSourceURL(json.sourceUrl)
            setHealthScore(json.healthScore)
            setVegetarian(json.vegetarian)

            // setTest(json && Object.entries(json).healthScore)
            // console.log(json.vegetarian)
        }
        getRecipeInfo().catch(console.error)
    }, [id])
    // console.log(test)
    return (
        // <div>
        //     {newList ? (
        //         <div>test</div>
        //     ) :
        //     null
        //     }
        // </div>
        // <div>{id}</div>
        // <div>test</div>
        // <div className='row'>
        //     {/* <div>hello</div> */}
        //     <img key={id} src={image} className='col-1'/>
        //     <div className='titles col-2'>{title}</div>
        //     <div className='col-3'>{id}</div>
        //     <div>{test && test}</div>
        // </div>

        <div className="App">
            <Link to="/" className="sidebar">
                <Sidebar />
            </Link>
            <div>
                <img id='big-img' src={img}/>
                <h1>{title2}</h1>
                <h5>{`ID: ${params.id}`}</h5>
                <h5>{`Health Score: ${healthScore}`}</h5>
                <h5>{`Vegetarian: ${vegetarian}`}</h5>
                <div>{`Source url: ${sourceURL}`}</div>
            </div>
            
        </div>
        // {/* {newList && newList.map((recipe) =>
        //     <div className='row'>
        //       <img key={recipe[1].id} src={recipe[1].image} className='col-1'/>
        //       <div className='titles col-2'>{recipe[1].title}</div>
        //       <div className='col-3'>{recipe[1].id}</div>
        //     </div>
        //   )}  */}
    )
}

export default RecipeInfo