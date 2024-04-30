import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductItem from "../../utils/Product_item/ProductItem";
import Loading from "../../utils/Loading/Loading";
import ProductsAPI from "../../api/ProductsAPI";
import "./Products.css"
function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = ProductsAPI().callback
    const [isChecked, setIsChecked] = useState(false)



    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await axios.get('/api/article/get');
                setProducts(res.data.products);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true);
            const destroyImg = axios.post(`/api/destroy`, { public_id: public_id });
            const deleteProduct = axios.delete(`/api/article/delete/${id}`);
            await destroyImg;
            await deleteProduct;
            // Filtrer les produits pour exclure celui supprimé
            const updatedProducts = products.filter(product => product._id !== id);
            // Mettre à jour l'état local des produits
            setProducts(updatedProducts);
            setLoading(false);
            setCallback(!callback);
        } catch (err) {
            setLoading(false);
            alert(err.response.data.msg);
        }
    };

    const checkAll= () =>{
        products.forEach(product =>{
            product.checked =  !isChecked
        })
        setProducts([...products])
        setIsChecked(!isChecked)
    }

    const deleteAll = () =>{
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.img.public_id)
        })
    }
    return (
        <>

            {

                <div className="delete-all"style={{textAlign:"right", margin:'20px'}} >
                    <span style={{textTransform:'uppercase', color:'blue', letterSpacing:'1.3px'}}>Select all</span>
                    <input style={{height:'25px', width:'25px', transform:'translateX(5px)',margin:'0 15px'}} type="checkbox" checked={isChecked} onChange={checkAll}/>
                    <button onClick={deleteAll} style={{border:'1px solid crimson', padding:'10px 25px', color:'crimson', textTransform:'uppercase'}}> Delete All</button>
                </div>
            }
            <div className="products">
                {
                    products.map(product => {
                        return <ProductItem key={product._id} product={product} setProducts={setProducts}
                                         callback={callback} setCallback={setCallback} deleteProduct={deleteProduct}  products={products}/>
                    })
                }
            </div>

            {
                products.length === 0 && <Loading/>
            }
        </>
    );
}

export default Products;
