import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
const API_KEY = import.meta.env.VITE_APP_API_KEY
import DATA from "/data.json"
import { useParams } from 'react-router-dom' 
import RecipeInfo from './components/recipeInfo'
import { Link } from 'react-router-dom' 
import RecipeChart from './components/recipeChart'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from "recharts"

function App() {
  const [list, setList] = useState(null)
  const [newList, setNewList] = useState(list)
  const [search, setSearch] = useState('')
  const [value, setValue] = useState('')
  const [averageId, setAverageId] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [cuisine, setCuisine] = useState('')
  const [diet, setDiet] = useState('')
  const [data2, setData] = useState(null)
  const [titles, setTitles] = useState(null)
  // let params = useParams();
  // const [fullDetails, setFullDetails] = useState(null)

  useEffect(() => {
    const fetchRecipeData = async () => {
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=25&cuisine=${cuisine}&diet=${diet}`)
      const json = await response.json()
      // const json = DATA
      // console.log()
      setTotalResults(json && json.totalResults)
      setList(json && Object.entries(json.results))
      setNewList(json && Object.entries(json.results))
      var dict = {}
    //   setData(json && json.results.reduce(
    //     (dict, id, title) => (dict[id] = title,
    //     {}
    // )))
      // sorted.forEach((el, index) => dict[el.nation.iso] = sorted.length - index);
      // setData(json && Object.assign({}, json.results.map((x) => ({[x.id]: x.title}))))
      setData(json && (json.results))
      // setTitles(json && json.results)
      console.log(json.results)
      // handleTitleSearch()
    }
    fetchRecipeData().catch(console.error)
  }, [cuisine, diet])
  console.log(data2)
  // if (list) {
  //   // Object.entries(list.results).map((recipe) => console.log(recipe))
  //   console.log(totalResults)
  //   // console.log(list.results[1].title)
  // }
  let sum = 0

  // const cleanData = (data) => {
  //   let newData = []
  //   for (let i = 0; i < data.length; i++) {
  //     let temp = {}
  //     temp["id"] = data[i]["id"]
  //     temp["title"] = data[i]["title"]
  //     newData.push(temp)
  //   }
  //   return newData
  // }
  // console.log(data2 && data2.length)
  // x = cleanData(data2 && data2)
  // console.log(x)

  const handleTitleSearch = () => {
    // setSearch(value)
    setNewList(list && list.filter((recipe) => {
      return recipe[1].title.toLowerCase().includes(search.toLowerCase())
    }))
    // console.log(list)
  }
  // if (list) {
  //   console.log(recipe[1].title)
  // }
  
  const handleIDSearch = () => {
    setNewList(list && list.filter((recipe) => {
      return recipe[1].id.toString().includes(search.toString())
    }))
    console.log(newList)
  }

  const handleAverageId = () => {
    {newList && newList.map((recipe) => {
      return sum += recipe[1].id
    })}
    return sum / (newList && newList.length)
  }
  
  return (
    <div className="App">
      {/* <div>{API_KEY}</div> */}
      <h1>My Recipe List</h1>
      <div className='dashboard'>
        <div className='card'>
          <h5>Number of recipes displayed</h5>
          <div>{newList && newList.length}</div>
        </div>
        <div className='card'>
          <h5>Total number of recipes retrieved</h5>
          <div>{totalResults}</div>
        </div>
        <div className='card'>
          <h5>Average ID</h5>
          {newList && newList.map((recipe) => {
            sum += recipe[1].id
          })}
          <div> {sum / (newList && newList.length)} </div>
        </div>
      </div>
      <div>
        <input value={search} onChange={(e) => setSearch(e.target.value)}/>
        <button className='search-button' onClick={() => {
          handleTitleSearch();
          handleAverageId();
        }}>Search by title</button>
        <button className='search-button' onClick={() => {
          handleIDSearch();
          handleAverageId();
        }}>Search by ID</button>
      </div>
      <div className='filters'>
        <div>Filter API Call</div>
        <div className='filter-1'>
          <div>{`Cuisine: ${cuisine}`}</div>
          <div className='options'>
            <button onClick={() => setCuisine('Italian')}>Italian</button>
            <button onClick={() => setCuisine('Mediterranean')}>Mediterranean</button>
            <button onClick={() => setCuisine('American')}>American</button>
            <button onClick={() => setCuisine('')}>Reset</button>
          </div>
        </div>
        <div className='filter-2'>
          <div>{`Diet: ${diet}`}</div>
          <div className='options'>
            <button onClick={() => setDiet('Vegetarian')}>Vegetarian</button>
            <button onClick={() => setDiet('Vegan')}>Vegan</button>
            <button onClick={() => setDiet('')}>Reset</button>
          </div>
        </div>
        {/* <button>Call New Results</button> */}
      </div>
      <div>
        <LineChart 
          width={1300}
          height={500}
          data={data2 && data2}
          margin={{top:10, right:30, left:20, bottom:30}}
        >
          <Line 
            type="monotone"
            dataKey="id"
            stroke="#8884d8"
          />
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="">
            <Label value="Indices" position="insideBottom" dy={20}/>
          </XAxis>

          <YAxis label="Ids"/>
          <Tooltip/>
        </LineChart>
      </div>
      <div className="whole-page">
        <div className='header'>
          <div className='col-0'>Index</div>
          <div className='col-1'>Image</div>
          <div className='col-2'>Title</div>
          <div className='col-3'>ID</div>
        </div>
        <div className='column'>
          {newList && newList.map((recipe) =>
            <div className='row'>
              {/* <RecipeChart id={recipe[1].id}/> */}
              <div>{recipe[0]}</div>
              <img src={recipe[1].image} className='col-1'/>
              <Link to={`/recipeInfo/${recipe[1].id}`} key={recipe[1].id} className='titles col-2'>{recipe[1].title}</Link>
              <div className='col-3'>{recipe[1].id}</div>
            </div>
          )} 
            {/* {newList && newList.map((recipe) =>
            <div className='row'>
              <RecipeInfo 
                image={recipe[1].image}
                id={recipe[1].id}
                title={recipe[1].title}
              />
            </div>
          )}  */}
          {/* {newList && newList.map((recipe) => {
            // <RecipeInfo 
            //   image={recipe[1].image}
            //   title={recipe[1].title}
            //   id={recipe[1].id}
            // /> 
            <div className='row'>{recipe}</div>
          })} */}
          {/* <RecipeInfo /> */}
        </div>
        {/* <div className='column'> 
          <div className='header row'>Title</div>
        </div> */}
      </div>
    </div>
  )
}

export default App
