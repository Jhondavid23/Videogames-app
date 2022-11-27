import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './useForm';
import style from './videogameForm.module.css'
import logoBack from '../../image/flecha-izquierda.png'
import { getAllGenres } from '../../actions';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import SelectList from './SelectList';

const initialForm = {
    name: "",
    release_date: "",
    rating: 1,
    description: "",
    genres: [],
    platforms: []
};

const valitionsForm = (form) => {
    let errors = {};
    if (!form.name.trim()) {
        errors.name = "The name is required";
       
    }
    if (!form.description.trim()) {
        errors.description = "The description is required";
    }
    if (!form.platforms[0]) {
        errors.platforms = "Platforms is required"
    }
    if (!form.genres[0]) {
        errors.genres = "Genres is required"
    }



    return errors
}

function CreateForm() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllGenres())

    }, [dispatch])
    const genres = useSelector((state) => state.genres);

    const { form,
        error,
        handleChange,
        handleBlur,
        handleSubmit,
        handlePlatforms,
        handleSelects,
        blurSelects
         } = useForm(initialForm, valitionsForm)


    return (
        <div className={style.container}>
            <div>
                <NavLink to={'/games'} className={style.navLinkBack}><img src={logoBack} className={style.imgBack} alt="logo" /></NavLink>
            </div>
            <div className={style.form}>
                <div className={style.title}>
                    <h2>Create your game </h2>
                </div>
                <form action="" className={style.form1}>

                    <div>
                        <input type="text"
                            value={form.name} required
                            name="name"
                            onChange={handleChange}
                            placeholder="Name"
                            onBlur={handleBlur}
                            className={style.input}

                        />
                    </div>
                    <div className={style.divError}>
                        {error.name && <p className={style.error}>{error.name}</p>}
                    </div>
                    <div>
                        <input type="text"
                            value={form.release_date} required
                            name='release_date'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder='Realease date'
                            className={style.input}

                        />
                    </div>
                    <div>
                        <label htmlFor="">Rating: </label>
                        <input type="number"
                            name='rating'
                            value={form.rating}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            placeholder='Rating'
                            min={'1'}
                            max='5'


                        />

                    </div>
                    <div>
                        <input type="text"
                            name='description'
                            value={form.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            placeholder='Description'
                            required
                            className={style.description}
                        />
                    </div>
                    <div className={style.divError}>
                        {error.description && <p className={style.error}>{error.description}</p>}
                    </div>
                    <div>
                        <input type="text"
                            name='img'
                            value={form.img}
                            placeholder='Url image'
                            onChange={handleChange}
                            className={style.input}

                        />
                    </div>
                    <div className={style.titleGenre}>
                        <p>Select genres</p>

                        <SelectList genres ={genres} handleChange={handleSelects} name={"select1"} onBlur ={blurSelects}/>
                    </div>
                    <div>
                        <SelectList genres ={genres} handleChange={handleSelects} name={"select2"} onBlur ={blurSelects}/>
                    </div>
                    <div>
                        <SelectList genres ={genres} handleChange={handleSelects} name={"select3"} onBlur ={blurSelects}/>
                    </div>
                    <div className={style.divError}>
                        {error.genres && <p className={style.error}>{error.genres}</p>}
                    </div>

                </form>

                <form action="" className={style.form2}>
                    <p className={style.box}>Select supported platforms</p>
                    <input type="checkbox"
                        name='Xbox'
                        value={'Xbox'}
                        onChange={handlePlatforms}
                        onBlur={handleBlur}
                        className={style.box}
                        id='Xbox'
                    />
                    <label >Xbox</label>
                    <input type="checkbox"
                        name='PC'
                        id='PC'
                        value={'PC'}
                        onBlur={handleBlur}
                        onChange={handlePlatforms}
                        className={style.box}
                    />
                    <label>PC</label>
                    <input type="checkBox"
                        name='Play_station'
                        value={'Play station'}
                        id='Play_station'
                        onBlur={handleBlur}
                        onChange={handlePlatforms}
                        className={style.box}
                    />
                    <label >Play Station</label>
                    <input type="checkBox"
                        name='Nintendo'
                        value={'Nintendo'}
                        id='Nintendo'
                        onBlur={handleBlur}
                        onChange={handlePlatforms}
                        className={style.box}
                    />
                    <label >Nintendo</label>
                </form>
                <div className={style.divError}>
                    {error.platforms && <p className={style.error}>{error.platforms}</p>}
                </div>

                <form action="" onSubmit={handleSubmit}>

                    <div>
                        <button type='submit' value={'enviar'} className={style.buttonSubmit}>Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateForm