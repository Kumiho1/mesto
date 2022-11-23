//___________________________________
//  ЗАПРОСЫ СЕРВЕРУ
//___________________________________

export default class Api {
    constructor(userInfo, cardList){
        this._startRequest = 'https://mesto.nomoreparties.co/v1/cohort-54'
        this._authorization ='b54228be-8e0f-45cf-a3af-cf408891c36e'
        this._userInfo = userInfo
        this._cardList = cardList
    }

    // запрос карточек с сервера
    startPageCards () {
        fetch(`${this._startRequest}/cards`, {
            headers: {
                authorization: this._authorization
            }
            })
        .then(res => res.json())
        .then((result) => {
            // добавление карточек
            this._cardList.renderItems(result);
        }); 
    }

    // загрузка данных пользователя
    startPageProfile () {
        fetch(`${this._startRequest}/users/me`, {
            headers: {
                authorization: this._authorization
            }
            })
        .then(res => res.json())
        .then((res) => {
        const dataUser = {
            name: res.name,
            about: res.about
        }
        this._userInfo.setUserInfo(dataUser)
        document.querySelector('.profile__avatar').src = res.avatar
        }); 
    }

    // изменение профайла
    editUserInfo () {
        fetch(`${this._startRequest}/users/me`, {
            method: 'PATCH',
            headers: {
              authorization: this._authorization,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this._userInfo.getUserInfo())
        })
    }

    // сохранить карточку
    sendCard = (dataCard) => {
    fetch(`${this._startRequest}/cards`, {
        method: 'POST',
        headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataCard)
        })
    .then(res => res.json())
    .then((res) => {console.log(res)})
    }
}