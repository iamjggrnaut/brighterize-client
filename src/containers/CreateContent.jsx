import React, { useContext, useState } from 'react'
import ServiceFunctions from '../service/serviceFunctions'
import AuthContext from '../service/AuthContext'
import { BASE_URL, URL } from '../config/config'

const CreateContent = ({ categories }) => {

    const { authToken } = useContext(AuthContext)

    const [content, setContent] = useState({
        title: '',
        description: '',
        category: '',
        type: '',
        media_url: '',
        preview_image: '',
        content: '',
        content_structure: { chapters: [] },
        likes_count: 0,
        views_count: 0,
        subscription_type: 'standard',
        tags: [],
        author: 'ADL Technologies',
        rating: 0,
    })

    const [chapter, setChapter] = useState({
        title: '',
        content: ''
    })
    const [tag, setTag] = useState()

    const addTag = (tag) => {
        setContent({ ...content, tags: [...content.tags, tag] })
        setTag()
    }

    const addChapter = (chapter) => {
        setContent({ ...content, content_structure: { chapters: [...content.content_structure.chapters, chapter] } })
        setChapter()
    }


    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('static', file);

        try {
            const response = await fetch(URL + '/uploadfile', { // Укажите корректный URL
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('File upload failed');
            }

            const result = await response.json(); // Ожидаем JSON с данными о файле
            setContent({ ...content, [field]: BASE_URL + result.filePath }); // Сохраняем путь к файлу
        } catch (err) {
            console.error('File upload error:', err);
        }
    };


    return (
        <div className='mt-3'>
            <h5 className='mt-4'>Контент</h5>
            <div className="row">
                <div className="col-6">
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Название</label>
                        <input type="text" onChange={e => setContent({ ...content, title: e.target.value })} />
                    </div>
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Описание</label>
                        <textarea type="text" onChange={e => setContent({ ...content, description: e.target.value })} />
                    </div>
                    <div className='admin-login-input-field mt-1'>
                        <label htmlFor="">Категория</label>
                        <select name="" id="" onChange={e => setContent({ ...content, category: e.target.value })}>
                            <option value="">Выбрать</option>
                            {
                                categories && categories.length && categories.map(category => (
                                    <option value={category.name} key={category.id}>
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='admin-login-input-field mt-1'>
                        <label htmlFor="">Тип</label>
                        <select name="" id="" onChange={e => setContent({ ...content, type: e.target.value })}>
                            <option value="">Выбрать</option>
                            <option value="media">media</option>
                            <option value="article">article</option>
                            <option value="check-list">check-list</option>
                            <option value="course">course</option>
                        </select>
                    </div>
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Превью</label>
                        <input type="file" onChange={e => handleFileUpload(e, 'preview_image')} />
                    </div>
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Медиа</label>
                        <input type="file" onChange={e => handleFileUpload(e, 'media_url')} />
                    </div>
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Контент</label>
                        <textarea type="text" onChange={e => setContent({ ...content, content: e.target.value })} />
                    </div>

                    <h6>Содержание контента</h6>
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Заголовок раздела</label>
                        <input type="text" onChange={e => setChapter({ ...chapter, title: e.target.value })} />
                    </div>
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Контент раздела</label>
                        <textarea type="text" onChange={e => setChapter({ ...chapter, content: e.target.value })} />
                        <div>
                            <button className="prime-btn"
                                onClick={e => addChapter(chapter)}
                            >
                                Добавить раздел
                            </button>
                        </div>
                    </div>

                    <div className="admin-login-input-field mt-3">
                        <label htmlFor="">Подписка</label>
                        <select name="" id="" onChange={e => setContent({ ...content, subscription_type: e.target.value })}>
                            <option value="standard">standard</option>
                            <option value="premium">premium</option>
                        </select>
                    </div>

                    <h6>Тэги</h6>
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Тэг</label>
                        <input type="text" onChange={e => setTag(e.target.value)} />
                        <div>
                            <button className="prime-btn"
                                onClick={e => addTag(tag)}
                            >
                                Добавить тэг
                            </button>
                        </div>
                    </div>

                    <div className="admin-login-input-field mt-3">
                        <label htmlFor="">Атвор</label>
                        <input type="text" defaultValue={content.author} onChange={e => setContent({ ...content, author: e.target.value })} />
                    </div>
                    <div className="admin-login-input-field mt-1">
                        <label htmlFor="">Рейтинг</label>
                        <input type="number" onChange={e => setContent({ ...content, rating: e.target.value })} />
                    </div>

                    <button
                        className="prime-btn"
                        onClick={e => ServiceFunctions.createContent(content, authToken)}
                    >
                        Создать
                    </button>
                </div>
                <div className="col-6">
                    {
                        Object.values(content).map((item, i) => (
                            <div key={i}>
                                {JSON.stringify(item)}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateContent