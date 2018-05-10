
const app = {};

// store info from zomato once returned, just promises
app.returnFromZomato = [];

// 1. do 5 calls 👌🏻
// 2. use Ky's list to filter from app.restaurants into the four location arrays
// 3. hard copy in first informative message for user
// 3. filter each location array based on positive, negative, neutral (based on price range - $, $$, $$$)
// 4. show on DOM (style) - with a window popping up effect:
// - featured_image
//     - Name of restaurant
//         - Address
//         - Phone number
//         - URL (button to link to the website_URL)
//         - **user_rating … aggregate_rating
//         - "X" to close down the window popping up

// an array of 100 restaurant results
app.restaurants = [];

// location arrays
app.downtownToronto = [];

app.eastEndToronto = [];

app.westEndToronto = [];

app.northToronto = [];


app.calls = function(number) {
    return $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search",
        dataType: "json",
        method: "GET",
        data: {
            entity_id: 89,
            entity_type: "city",
            q: "Toronto",
            cuisines: "73",
            counter: 125,
            start: number,
        },
        headers: {
            "user-key": "ee3c8dde85aabb1ed3fc23bb743b2cc6",
        },
    });
};

app.receiveCalls = function() {

    // call to API happening five times, pushing promises to returnFromZomato each time
    for (let i = 0; i <= 80; i = i + 20) {
        app.returnFromZomato.push(app.calls(i));
    }
    // console.log(app.returnFromZomato);

    // when the results from the calls are pushed...
    $.when(...app.returnFromZomato)
        .then((...results) => {
            // console.log(...results);
            for (let i = 0; i < results.length; i++) {
                // console.log(results[i][0].restaurants);
                // spread operator "takes off the brackets" and gives us the individual objects
                app.restaurants.push(...results[i][0].restaurants);
            }
            // console.log(app.restaurants);
        });
}

app.filterForLocations = function() {
    app.downtownToronto = app.restaurants.filter(function(locality) {
        if (locality === "Entertainment District" ||)
    });
}






app.init = function () {
    app.calls();
    app.receiveCalls();
}
$(function () {
    app.init();
});



