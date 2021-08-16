import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Select from 'react-select'
import { routes, callApi, postFormValue, postValue } from '../../routes'

function CreatePost({ setPageName }) {

    const [input, setInput] = useState({
        post_title: "",
        post_description: "",
        post_category: {
            value: null,
            label: null
        },
        featured_image: null
    })
    const [categories, setCategories] = useState([])
    
    const getFile = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = (theFile) => {
            var data = {
                file: file,
                blob: theFile.target.result, 
                name: file.name,
            };
            setInput({ ...input, featured_image: data })
        };
        reader.readAsDataURL(file);
    }    
    // To update general input
    const updateInput = e => {
        setInput(prev => {            
            return {
                ...prev,
                [e.target.id]: e.target.value
            }
        })
    }
    // To update from react select component
    const updateSelect = e => {
        setInput({...input, post_category: { value: e.value, label: e.label} })
    }
    const handleCreatePost = (e) => {
        e.preventDefault()
        const data = {
            title: input.post_title,
            description: input.post_description,
            category: input.post_category.value,
            featured_image: input.featured_image.file
        }
        postFormValue(routes.createPost, data).then(res => console.log(res))
    }
    useEffect(() => {
        // console.log(input)
        callApi(routes.getAllCategories).then(data => {
            setCategories(data.map(item => { return {value: item.id, label: item.name} }))
        })
    }, [input])

    // const categories = [
    //     { value: 'chocolate', label: 'Chocolate' },
    //     { value: 'strawberry', label: 'Strawberry' },
    //     { value: 'vanilla', label: 'Vanilla' }
    // ]

    setPageName("Create Post")

    return (
        <div className="row">
            <div className="create-post col-sm">
                <form method="POST" onSubmit={handleCreatePost} enctype="multipart/form-data">
                    <div className="mb-3">
                        <label htmlFor="post-title" className="form-label">Post Title</label>
                        <input 
                            type="text" 
                            value={input.post_title}
                            onChange={updateInput} 
                            className="form-control" 
                            id="post_title" 
                            name="post_title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="post-description" className="form-label">Post Description</label>
                        <textarea 
                            className="form-control" 
                            name="post-description" 
                            id="post_description" 
                            rows="3"
                            onChange={updateInput}
                        >{input.post_description}</textarea>
                    </div>
                    <div className="row">
                        <div className="col-sm">
                            <Select
                                id="post_category"
                                name="post_category"
                                options={categories} 
                                onChange={updateSelect}
                            /> 
                            {/* <input 
                                list="brow" 
                                name="post_category" 
                                id="post_category" 
                                className="form-select"
                                value={input.post_category}
                                onChange={updateInput}
                            />
                            <datalist id="brow" className="">
                                <option value="{{ $category->id }}" label="{{ $category->name }}" />    
                            </datalist>                  */}
                            
                        </div>
                    </div>
                    <div className="mb-3 mt-2">
                        <label htmlFor="featured_image" className="form-label">Add Image</label>
                        <input 
                            className="form-control" 
                            type="file" 
                            id="featured_image" 
                            name="featured_image" 
                            onChange={getFile}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Post</button>
                </form>
            </div>
            <div className="preview col-sm">
                {input.featured_image !== null ? 
                <img src={input.featured_image.blob} style={{ maxWidth: '100%' }} /> :
                ""}
                <h2 className="display 3">{input.post_title}</h2>
                <p>{input.post_description}</p>
                <p>{input.post_category.value !== null ? <b>Category: </b> : ""}{input.post_category.label}</p>
            </div>
        </div>
    )
}

export default CreatePost
