//___________________________________
//  ЗАПРОСЫ СЕРВЕРУ
//___________________________________

export default class Api {
    constructor({baseUrl, headers}, userInfo, cardList){
        this._cardList = cardList
        this._userInfo = userInfo
        this._startRequest = baseUrl
        this._headers = headers

        this._res = (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`)
        };
    }

    // загрузка данных пользователя
    startPageProfile () {
        return fetch(`${this._startRequest}/users/me`, {
            headers: this._headers,
            })
        .then(this._res);   
    }
    
    // запрос карточек с сервера
    startPageCards() {
        return fetch(`${this._startRequest}/cards`, {
            headers: this._headers,
            })
        .then(this._res);  
    }

    // изменение профайла
    editUserInfo () {
        fetch(`${this._startRequest}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(this._userInfo.getUserInfo())
        })
        // .finally(()=>{renderLoading('false')})
    }

    // сохранить карточку
    sendCard = (dataCard) => {
     return fetch(`${this._startRequest}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(dataCard)
        })
    .then(this._res);
    }

    // удалить карточку
    deleteCard = (idCard) => {
        return fetch(`${this._startRequest}${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._res); 
        // .finally(()=>{renderLoading('false')})

    }

}