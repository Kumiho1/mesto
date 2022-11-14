// //_____________________________
// //  управление отображением 
// //  информации о пользователе
// //_____________________________

export default class UserInfo {
    constructor ({nameInput, jobInput, nameInfo, jobInfo}) {
        this._name = nameInput
        this._about = jobInput
        this._nameContaier = nameInfo
        this._aboutContainer = jobInfo
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