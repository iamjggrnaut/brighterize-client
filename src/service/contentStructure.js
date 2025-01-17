const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Content = sequelize.define('content', {
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.TEXT, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        type: { type: DataTypes.STRING, allowNull: false },
        media_url: { type: DataTypes.STRING, allowNull: true },
        preview_image: { type: DataTypes.STRING, allowNull: true },
        content: { type: DataTypes.TEXT, allowNull: true },
        content_structure: { type: DataTypes.JSONB, allowNull: true },
        likes_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        views_count: { type: DataTypes.INTEGER, defaultValue: 0 },
        subscription_type: { type: DataTypes.ENUM('standard', 'premium'), allowNull: false },
        difficulty_level: { type: DataTypes.STRING, allowNull: true },
        estimated_time: { type: DataTypes.INTEGER, allowNull: true },
        tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
        author: { type: DataTypes.JSONB, allowNull: false },
        rating: { type: DataTypes.JSONB, allowNull: true },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        availability: { type: DataTypes.JSONB, allowNull: true }
    }, {
        tableName: 'contents',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    return Content;
};


const obj = {
    "id": "string", // Уникальный идентификатор контента
    "title": "string", // Название контента
    "description": "string", // Краткое описание
    "category": "string", // Категория (например, психология, IT, наука)
    "type": "string", // Тип контента (чек-лист, аудиокнига, видео и т.д.)
    "media_url": "string", // URL на медиафайл (если применимо)
    "preview_image": "string", // URL на изображение превью
    "content": "string", // Основное содержание (текст, структура курса, описание для фото)
    "content_structure": {
        "chapters": [
            {
                "title": "string", // Название главы
                "content": "string" // Текст или URL медиа для главы
            }
        ]
    },
    "likes_count": "integer", // Количество лайков
    "views_count": "integer", // Количество просмотров
    "subscription_type": "string", // Тип подписки (стандарт или премиум)
    "difficulty_level": "string", // Уровень сложности (новичок, средний, эксперт)
    "estimated_time": "integer", // Оценочное время прохождения (в минутах)
    "tags": ["string"], // Теги для поиска (например, продуктивность, mindfulness)
    "author": {
        "id": "string", // Уникальный идентификатор автора
        "name": "string", // Имя автора
        "profile_image": "string" // URL на изображение профиля автора
    },
    "rating": {
        "average": "float", // Средний рейтинг
        "reviews_count": "integer" // Количество отзывов
    },
    "created_at": "timestamp", // Дата создания
    "updated_at": "timestamp", // Дата последнего обновления
    "availability": {
        "languages": ["string"], // Список доступных языков
        "regions": ["string"] // Регионы доступности контента
    }
}
