
const app = {};

app.zomato = function() {
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search',
        dataType: 'json',
        method: 'GET',
        data: {
            entity_id: 89,
            entity_type: 'city',
            q: 'Toronto',
            cuisines: '73',
            count: 20,
        },
        headers: {
            'user-key': '6abd2ae7eb0a9857f87a37c0d6bdeff3',
        },
    })
    .then((res) => {
        console.log(res);
    })
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search',
        dataType: 'json',
        method: 'GET',
        data: {
            entity_id: 89,
            entity_type: 'city',
            q: 'Toronto',
            cuisines: '73',
            count: 20,
            start: 1,
        },
        headers: {
            'user-key': '6abd2ae7eb0a9857f87a37c0d6bdeff3',
        },
    })
    .then((res) => {
        console.log(res);
    })
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search',
        dataType: 'json',
        method: 'GET',
        data: {
            entity_id: 89,
            entity_type: 'city',
            q: 'Toronto',
            cuisines: '73',
            count: 20,
            start: 2,
        },
        headers: {
            'user-key': '6abd2ae7eb0a9857f87a37c0d6bdeff3',
        },
    })
        .then((res) => {
            console.log(res);
    })
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search',
        dataType: 'json',
        method: 'GET',
        data: {
            entity_id: 89,
            entity_type: 'city',
            q: 'Toronto',
            cuisines: '73',
            count: 20,
            start: 3,
        },
        headers: {
            'user-key': '6abd2ae7eb0a9857f87a37c0d6bdeff3',
        },
    })
    .then((res) => {
        console.log(res);
    })
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search',
        dataType: 'json',
        method: 'GET',
        data: {
            entity_id: 89,
            entity_type: 'city',
            q: 'Toronto',
            cuisines: '73',
            count: 20,
            start: 4,
        },
        headers: {
            'user-key': '6abd2ae7eb0a9857f87a37c0d6bdeff3',
        },
    })
        .then((res) => {
            console.log(res);
    })
    $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/search',
        dataType: 'json',
        method: 'GET',
        data: {
            entity_id: 89,
            entity_type: 'city',
            q: 'Toronto',
            cuisines: '73',
            count: 20,
            start: 5,
        },
        headers: {
            'user-key': '6abd2ae7eb0a9857f87a37c0d6bdeff3',
        },
    })
    .then((res) => {
        console.log(res);
    })
};

app.getLocality = function() {

}

app.init = function () {
    app.zomato();
}
$(function () {
    app.init();
});
