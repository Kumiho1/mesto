//___________________________________
//  ЗАПРОСЫ СЕРВЕРУ
//___________________________________

export default class Api {
    constructor({baseUrl, headers}, userInfo, cardList){
        this._cardList = cardList
        this._userInfo = userInfo
        this._startRequest = baseUrl
        this._headers = headers
        this._avatar = this._userInfo.getUserInfo().avatar

        console.log(this._userInfo.getUserInfo().avatar)
        this._res = (res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`)
        };
    }

    // загрузка данных пользователя
    startPageProfile () {
        return fetch(`${this._startRequest}/users/me`, {
            headers: this._headers,
            })
        .then(this._res)
        .catch((err) => {
            console.log(err); 
        });    
    }
    
    // запрос карточек с сервера
    startPageCards() {
        return fetch(`${this._startRequest}/cards`, {
            headers: this._headers,
            })
        .then(this._res)
        .catch((err) => {
            console.log(err); 
        });   
    }

    // изменение профайла
    editUserInfo () {
        return fetch(`${this._startRequest}users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(this._userInfo.getUserInfo())
        })
        .then(this._res)
        .catch((err) => {
            console.log(err); 
          }); 
    }

     // изменение аватара в профиле
     editUserAvatar (avatar) {
        return fetch(`${this._startRequest}users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then(this._res)
        .catch((err) => {
            console.log(err); 
        }); 
    }

    // сохранить карточку
    sendCard = (dataCard) => {
        return fetch(`${this._startRequest}cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(dataCard)
            })
        .then(this._res)
        .catch((err) => {
            console.log(err); 
        }); 
    }

    // удалить карточку
    deleteCard = (idCard) => {
        return fetch(`${this._startRequest}cards/${idCard}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._res)
    }

    // поставить лайк
    sendLike = (idCard) => {
        return fetch(`${this._startRequest}cards/${idCard}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
        .then(this._res)
        .catch((err) => {
            console.log(err); 
        }); 
    }

    // удалить лайк
    deleteLike = (idCard) => {
        return fetch(`${this._startRequest}cards/${idCard}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(this._res)
        .catch((err) => {
            console.log(err); 
        });  
    }
}