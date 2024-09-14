import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Map from "./Map";
import Sidebar from "./Sidebar";


function App() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Map />
      </div>
    </div>
  );
}

export default App;

