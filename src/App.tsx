import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Map from "./Map";


function App() {

 const tasks = useQuery(api.tasks.get);
 const locations = useQuery(api.locations.get);
 return (
   <div className="App">
     <h2>Tasks</h2>
     {tasks?.map(({ _id, text }) => (
       <div key={_id}>{text}</div>
     ))}


     <h2>Locations</h2>
     {locations?.map(({ _id, longitude }) => (
       <div key={_id}>{Number(longitude)}</div>
     ))}
   </div>
 );
}


export default App;
