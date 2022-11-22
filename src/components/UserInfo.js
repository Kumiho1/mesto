// //_____________________________
// //  управление отображением 
// //  информации о пользователе
// //_____________________________

export default class UserInfo {
    constructor ({nameInfo, jobInfo}) {
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