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
        }
    }

    // загрузка данных пользователя
    startPageProfile () {
        fetch(`${this._startRequest}/users/me`, {
            headers: this._headers,
            })
        .then(this._res)
        .then((res) => {
            console.log(res)
            // userId = res._id;
            // console.log(userId);
            this._userInfo.setUserInfo(res)
            document.querySelector('.profile__avatar').src = res.avatar
        });   
    }
    
    // запрос карточек с сервера
    startPageCards() {
        fetch(`${this._startRequest}/cards`, {
            headers: this._headers,
            })
        .then(this._res).then((result) => {
            // добавление карточек
                this._cardList.renderItems(result);
            }); ; 
    }

    // // изменение профайла
    // editUserInfo () {
    //     fetch(`${this._startRequest}/users/me`, {
    //         method: 'PATCH',
    //         headers: this._headers,
    //         body: JSON.stringify(this._userInfo.getUserInfo())
    //     })
    // }

    // // сохранить карточку
    // sendCard = (dataCard) => {
    // fetch(`${this._startRequest}/cards`, {
    //     method: 'POST',
    //     headers: this._headers,
    //     body: JSON.stringify(dataCard)
    //     })
    // .then(res => res.json())
    // .then((res) => {console.log(res)})
    // }

    // // проверка соответствия id
    // getOwnerId () {
    //     fetch(`${this._startRequest}/users/me`, {
    //         headers: this._headers,
    //         })
    //         .then(res => res.json())
    //         .then((res) => {
    //             // console.log("id user: " + res._id)
    //             return res._id 
    //     }); 
    // }
}