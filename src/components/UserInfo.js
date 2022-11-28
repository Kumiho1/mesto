// //_____________________________
// //  управление отображением 
// //  информации о пользователе
// //_____________________________

export default class UserInfo {
    constructor (name, about, avatar) {
        this._nameContaier = name
        this._aboutContainer = about
        this._avatarContainer = avatar
    }

    getUserInfo () {
        const user = {
            name: this._nameContaier.textContent,
            about: this._aboutContainer.textContent,
            avatar: this._avatarContainer.src
        }
        return user
    }

    setUserInfo ({ name, about, avatar, _id }) {
        this._nameContaier.textContent = name
        this._aboutContainer.textContent = about
        this._avatarContainer.src = avatar
    }

    
}