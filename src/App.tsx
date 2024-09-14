import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import Map from "./Map";

function App() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div className="App">
      {/* {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)} */}
      <Map />
    </div>
  );
}

export default App;

