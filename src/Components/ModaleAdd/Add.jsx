import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from "react";
import './add.scss';

const ModalAdd = ({ isOpen, onClose, openModalDelete, reload }) => {
    const [categories, setCategories] = useState([]);
    const [preview, setPreview] = useState();
    const { fetchCategories, addWork } = useApi();

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        try {
            const data = await fetchCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPreview(URL.createObjectURL(file));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const added = await addWork(formData);
        if (added) {
            onClose();
            openModalDelete();
            setPreview();
            e.target.reset();
            reload();
        }
    }

    const handleClose = () => {
        onClose();
        setPreview();
    }

    return (
        <div className={"modal" + (isOpen ? " active" : '')}>
            <div className="modal__content">
                <FontAwesomeIcon icon={faTimes} className='modal__content-icon' onClick={handleClose} />
                <h2>Ajout photo</h2>
                <form id="test" onSubmit={handleSubmit}>
                    <div className='preview'>
                        {preview ?
                            <img src={preview} alt="preview" />
                            :
                            <>
                                <img src={"/assets/icons/placeholder.svg"} alt="placeholder" />
                                <label htmlFor="image">+ ajouter photo</label>
                                <span>jpg, png : 4mo max</span>
                            </>
                        }
                    </div>
                    <input type="file" id="image" name="image" onChange={handleFileChange} accept='image/*' />
                    <label htmlFor="name">Nom</label>
                    <input type="text" id="name" name="name" />

                    <label htmlFor="preparationTime">Temps de préparations</label>
                    <input type="text" id="preparationTime" name="preparationTime" />

                    <label htmlFor="cookTime">Temps de cuisson</label>
                    <input type="text" id="cookTime" name="cookTime" />

                    <label htmlFor="category">Categorie</label>
                    <select name="catégory" id="category">
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <label htmlFor="type">Types</label>
                    <select name="type" id="type">
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <label htmlFor="ingrédients">Ingrédients</label>
                    <textarea name="ingrédients" id="ingrédients"></textarea>
                    <label htmlFor="instructions">Etape</label>
                    <textarea name="instructions" id="instructions"></textarea>
                </form>
                <hr />
                <button form="test">Valider</button>
            </div>
        </div>
    );
};

export default ModalAdd;