// //_____________________________
// //  управление отображением 
// //  информации о пользователе
// //_____________________________

export default class UserInfo {
    constructor (name, about) {
        this._nameContaier = name
        this._aboutContainer = about
    }

    getUserInfo () {
        const user = {
            name: this._nameContaier.textContent,
            about: this._aboutContainer.textContent
        }
        return user
    }

    setUserInfo ({name, about}) {
        this._nameContaier.textContent = name
        this._aboutContainer.textContent = about
    }
}