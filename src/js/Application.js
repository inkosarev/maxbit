import {ADD_COUNT, API, INIT_COUNT} from './constants'
import {Character} from './Character'

/**
 * @classdesc Экземпляр приложения
 */
class Application {
    /**
     * Инициализирует приложение
     */
    async start() {
        // создание контейнера
        const container = document.querySelector('#container')
        container.style.height = `${parseInt(getComputedStyle(document.body).height) + 10}px`

        // Создание обработчика подгружающего записи при прокручивании страницы
        document.addEventListener('scroll', async event => {
            const element = event.target.body
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                const characters = await this.getCharacters(ADD_COUNT)
                this.addCharactersItems(container, characters)
            }
        })

        // Получение записей с сервера
        const characters = await this.getCharacters(INIT_COUNT)

        // Добавление данных в контенер
        if (characters.length) this.addCharactersItems(container, characters)
        else container.innerHTML = '<h1 style="text-align: center">No data</h1>'
    }

    /**
     * Запрашивает с сервера массив данных о персонажах
     * @param {number} limit - количество запрашиваемых записей
     * @return {Promise<Character[]>}
     */
    async getCharacters(limit) {
        let result = []
        try {
            const url = `${API.characters}?limit=${limit}&offset=${Character.count}`
            result = await fetch(url)
            result = await result.json()
            result = result.map(c => new Character(c.char_id, c.img, c.name, c.category))
            Character.incrementCount(limit)
        } catch (e) {
            console.error(e)
        } finally {
            return result
        }
    }

    /**
     * Добавляет в контейнер описание персонажей
     * @param {Element} container - элемент на странице в который добавятся записи
     * @param {Character[]} characters - массив данных персонажей
     */
    addCharactersItems(container, characters) {
        characters.forEach(character => {
            const item = `
            <img src="${character.img}" alt="image">
            <div>
                <p>name: ${character.name}</p>
                <p>ID: ${character.id}</p>
                <p>Category: ${character.category}</p>
            </div>
        `
            const element = document.createElement('div')
            element.classList.add('char-item')
            element.innerHTML = item
            container.appendChild(element)
        })
    }
}

export {
    Application
}
