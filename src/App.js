
import Table from "./components/Table";
import DeleteModal from "./components/DeleteModal";
import StartModal from "./components/StartModal";
function App() {
  return (
    <div className="App">
      <div className="container">
         <Table/>
         <DeleteModal/>
         <StartModal/>
      </div>
    
    </div>
  );
}

export default App;
