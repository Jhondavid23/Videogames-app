import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGame, ResetVideogame } from '../../actions';

export const useForm = (initialForm, validateForm) => {

    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [select, setSelect] = useState({});

    //Selects
    const handleSelects = (e) => {
        const { name, value } = e.target
       
        if (name === "select1") {
            setSelect((select) => {
                return {
                    ...select,
                    [name]: value
                }
            })
        }
        if (name === "select2") {
            setSelect((select) => {
                return {
                    ...select,
                    [name]: value
                }
            })
        }
        if (name === "select3") {
            setSelect((select) => {
                return {
                    ...select,
                    [name]: value
                }
            })
        }
        
    }
    const blurSelects = () => {
        setForm(() => {

            return {
                ...form,
                genres: Object.values(select)
            }
        })
        setError(validateForm(form));
    }

    //Function by change de state of the inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }
    // Function by select and save in state the platforms
    const handlePlatforms = (e) => {
        var set = new Set();
        let platforms = [];
        if (e.target.checked === true) {
            set.add(e.target.value)
            platforms.push(...set);
            setForm({
                ...form,
                platforms: [...form.platforms, ...platforms]
            })
        } else if (e.target.checked === false) {
            let filtrados = form.platforms.filter(i => i !== e.target.value)
            setForm({
                ...form,
                platforms: filtrados
            })
        }
    }


    //Function by the onBlur
    const handleBlur = (e) => {
        setError(validateForm(form));

    }


    // To submit, check the state
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validateForm(form))
        let game = form;
        if (game.name.length === 0 || game.description.length === 0 || game.name.length === 0 || !game.platforms[0] || !game.genres[0]) {
            console.log(error)
            alert("The game was not created, missing fields")
            return;
        }
        dispatch(createGame(game));
        dispatch(ResetVideogame())
        alert("Video game was created")
        setForm({ ...initialForm })
        history.push("/games")


    }

    return {
        form,
        error,
        handleChange,
        handleBlur,
        handleSubmit,
        handlePlatforms,
        handleSelects,
        blurSelects

    }
};
