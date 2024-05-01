import React,{useState , useContext, useEffect} from 'react'
import axios from "axios";


import "./CreateProduct.css"
import { useParams} from "react-router-dom"
import CategoriesAPI from "../../api/CategoriesAPI";
import ProductsAPI from "../../api/ProductsAPI";
import Loading from "../../utils/Loading/Loading";
import {useNavigate} from "react-router";

const initialState = {
    reference:"",
    nom:"",
    caracteristiques:"",
    img:null,
    video:"",
  catalogue:"",
    categorie:""
}

function CreateProduct() {
    const [product, setProduct] = useState(initialState)

    const [categories] =CategoriesAPI().categories
    const [img, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const history = useNavigate()
    const param = useParams()
    const [products, setProducts] =ProductsAPI().products
    const [onEdit, setOnEdit] = useState(false)

    const [callback, setCallback]= ProductsAPI().callback

    useEffect(()=>{
        if(param.id){
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id) {
                    setProduct(product)
                    setImages(product.img)
                }
            })

        }else{
            setOnEdit(false)
            setImages(false)
            setProduct(initialState)
        }
    },[param.id])
    const handleChangeInput = e => {
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const styleUpload = {
        display: img ? 'block' : 'none'
    }
    const handleUpload = async (e) =>{
        e.preventDefault()
        try {

            const file = e.target.files[0]
            if(!file) return   alert("File not exist")
            if(file.size > 1024 * 1024) return alert("Size is too large")
            if(file.type !== "image/jpeg" && file.type !== "image/png") return alert("file type not supported")

            let formData = new FormData();
            formData.append('file', file)

            setLoading(true)
            const res = await  axios.post('/api/upload', formData, {

            })
            setLoading(false)
            setImages(res.data)


        } catch (err) {
            alert(err.response)
        }
    }

    const handleDestroy = async (e) => {
        try {

            setLoading(true)
            await axios.post('/api/destroy', {public_id: img.public_id},{

            })
            setLoading(false)
            setImages(false)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if(!img) return alert("no image found")
            if(onEdit) {
                await axios.put(`/api/article/get/${product._id}`, {...product, img}, {

                })
            }else {
                await axios.post('/api/article/add', {...product, img}, {

                })
            }

            setImages(false)
            setProduct(initialState)
            setCallback(!callback)
            history.push('/')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {loading ? (
                    <div id="file_img">
                        <Loading />
                    </div>
                ) : (
                    <div id="file_img" style={styleUpload}>
                        <img src={img ? img.url : ''} alt="" />
                        <span onClick={handleDestroy}>x</span>
                    </div>
                )}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="reference">Reference</label>
                    <input
                        type="text"
                        name="reference"
                        id="reference"
                        required

                        onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="nom">Title</label>
                    <input
                        type="text"
                        name="nom"
                        id="nom"
                        required

                        onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="caracteristiques">Caracteristiques</label>
                    <textarea
                        rows="5"
                        name="caracteristiques"
                        id="caracteristiques"
                        required

                        onChange={handleChangeInput}
                    />
                </div>
                <div className="row">
                    <label htmlFor="categorie">Category</label>
                    <select
                        name="categorie"
                        id="categorie"

                        onChange={handleChangeInput}
                    >
                        <option value="">Please Select a category</option>
                        {categories.map(categorie => (
                            <option key={categorie._id} value={categorie._id}>
                                {categorie.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">{onEdit ? "Edit Product" : "Create Product"}</button>
            </form>
        </div>)
                        }

export default CreateProduct
