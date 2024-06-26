
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/products/Products";
import Categories from "./pages/categories/Categories";
import DetailProduct from "./pages/products/DetailProduct";
import CreateProduct from "./pages/createProducts/CreateProduct";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>


          <Route path="/products" element={<Products />} />
            <Route path="/categorie" element={<Categories />} />
            <Route path="/detail/:id" element={<DetailProduct />}/>
            <Route path="/create_product" element={<CreateProduct/>}/>
            <Route path="/edit_product/:id" element={<CreateProduct/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
