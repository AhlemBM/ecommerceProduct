import React ,{useContext, useEffect, useState} from 'react'
import {useParams , Link}  from "react-router-dom";


import "./DetailProduct.css"
import ProductsAPI from "../../api/ProductsAPI";
import ProductItem from "../../utils/Product_item/ProductItem";
function DetailProduct() {
    const params = useParams();

    const [products]= ProductsAPI().products
    console.log("les produits sont"+products)

    const[detailProduct,setDetailProduct] = useState([])

    useEffect(()=>{
        if(params.id){
            products.forEach(product =>{

                if(product._id=== params.id) setDetailProduct(product)

            })
        }
    },[products,params.id])


        console.log("le detail est"+detailProduct)

    if(detailProduct.length === 0) return 0;
    return (
        <>
            <div className="detail">
                <img src={detailProduct.img.url} alt=""/>
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.nom}</h2>
                        <h6>ID: {detailProduct._id}</h6>
                    </div>

                    <p> <h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Content:</h4> {detailProduct.video}</p>
                    <p><h4 style={{textDecoration:'underline' , color:'whitesmoke'}}>Description : </h4>{detailProduct.caracteristiques}</p>

                </div>
            </div>
            <div>
                <h2>Related Products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.categorie === detailProduct.categorie
                                ? <ProductItem key={product._id} product={product}/> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default DetailProduct
