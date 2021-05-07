/**
 * @classdesc Персонаж
 */
class Character {
    /**
     * Количество загруженных записей о персонажах
     * @type {number}
     */
    static count = 0

    /**
     * Увеличение счетчика заргуженных записей
     * @param {number} count - количество подгружаемых записей
     */
    static incrementCount(count) {
        Character.count += Number(count)
    }

    /**
     * Идентификатор персонажа
     * @type {string}
     */
    id

    /**
     * Путь к изображению превью
     * @type {string}
     */
    img = 'https://via.placeholder.com/100'

    /**
     * Имя персонажа
     * @type {string}
     */
    name = 'Unnamed'

    /**
     * Категория
     * @type {string}
     */
    category = 'Uncategorized'

    /**
     * @constructor
     * @param id {number} - Идентификатор персонажа
     * @param img {string} - Путь к изображению превью
     * @param name {string} - Имя персонажа
     * @param category {string} - Категория
     */
    constructor(id, img, name, category) {
        this.id = id
        this.img = img
        this.name = name
        this.category = category
    }
}

export {
    Character
}
