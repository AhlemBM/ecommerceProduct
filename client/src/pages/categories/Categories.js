import axios from 'axios';
import React, { useState, useEffect } from 'react';
import "./Category.css"


function Categories() {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');
    const [onEdit, setOnEdit] = useState(false);
    const [id, setID] = useState('');

    // Définition de la fonction fetchCategories
    const fetchCategories = () => {
        axios.get('/api/categorie/get')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    };

    useEffect(() => {
        fetchCategories(); // Appel à la fonction fetchCategories
    }, []);

    const createCategory = (e) => {
        e.preventDefault();
        if (onEdit) {
            axios.put(`/api/categorie/update/${id}`, { name: category })
                .then(() => {
                    alert("Category updated successfully");
                    fetchCategories(); // Appel à fetchCategories après la mise à jour
                })
                .catch(error => {
                    console.error('Error updating category:', error);
                    alert("An error occurred while updating the category");
                });
        } else {
            axios.post('/api/categorie/add', { name: category })
                .then(() => {
                    alert("Category created successfully");
                    fetchCategories(); // Appel à fetchCategories après la création
                })
                .catch(error => {
                    console.error('Error creating category:', error);
                    alert("An error occurred while creating the category");
                });
        }
        setCategory('');
        setOnEdit(false);
    };

    const editCategory = (id, name) => {
        setID(id);
        setCategory(name);
        setOnEdit(true);
    };

    const deleteCategory = (id) => {
        axios.delete(`/api/categorie/delete/${id}`)
            .then(() => {
                alert("Category deleted successfully");
                fetchCategories(); // Appel à fetchCategories après la suppression
            })
            .catch(error => {
                console.error('Error deleting category:', error);
                alert("An error occurred while deleting the category");
            });
    };

    return (
        <div className="categories">
            <form onSubmit={createCategory}>
                <label htmlFor="category">Category</label>
                <input type="text" name="category" value={category} required onChange={e => setCategory(e.target.value)} />
                <button type="submit"> {onEdit ? "Update" : "Save"} </button>
            </form>
            <div className="col">
                {categories.map(category => (
                    <div className="row" key={category._id}>
                        <p>{category.name}</p>
                        <div>
                            <button onClick={() => editCategory(category._id, category.name)}>Edit</button>
                            <button onClick={() => deleteCategory(category._id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Categories;
