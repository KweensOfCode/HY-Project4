
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
};
app.submit = function() {
    $('form').on('submit', function(e){
        e.preventDefault();
        let text = $('input[type=text]').val();        
        app.getSentimentScore(text);
    });
};
app.getSentimentScore = function(text) {
    $.ajax({
        url: 'https://api.dandelion.eu/datatxt/sent/v1',
        data: {
            token: 'bc77fbf397184fc1b069f3085e709f0d',
            text: text,
        },
        dataType: 'jsonp',
    }).then((res)=>console.log(res.sentiment.type, res.sentiment.score))
}
app.returnSentimentScore = function () {
    get.SentimentScore();
}
app.getLocality = function() {

}

app.init = function () {
    // app.getText();
    app.submit();
}
$(function () {
    app.init();
});
