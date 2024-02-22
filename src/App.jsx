import HomePage from "./component/Homepage";
import { Routes, Route} from "react-router-dom";

function App() {
  
  return (
<section>
  <Routes>
    <Route index element={<HomePage />} />
  </Routes>
</section>
  )

}


export default App;
