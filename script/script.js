
const app = {};

// store info from zomato once returned, just promises
app.returnFromZomato = [];

// 1. do 5 calls 👌🏻
// 2. use Ky's list to filter from app.restaurants into the four location arrays 👌🏻
// 3. hard copy in first informative message for user
// 4. filter each location array based on positive, negative, neutral (based on price range - $, $$, $$$)
// 5. show on DOM (style) - with a window popping up effect, figure out all functionality:
// - featured_image
//     - Name of restaurant
//         - Address
//         - Phone number
//         - URL (button to link to the website_URL)
//         - **user_rating … aggregate_rating
// 6. button to return to texting screen
// 7. finish responsive testing 

// an array of 100 restaurant results
app.restaurants = [];
// filtered array
app.downtownToronto = [];
// downtown is the variable that holds the regex for filtering
const downtown = new RegExp('Entertainment|Kensington|Fashion|Grange|Downtown|Church|Financial', 'gi');
// filtered array
app.eastEndToronto = [];
// eastEnd is the variable that holds the regex for filtering
const eastEnd = new RegExp('Distillery|East|Lawrence|Beaches|Riverside', 'gi');
// filtered array
app.westEndToronto = [];
// westEnd is the variable that holds the regex for filtering
const westEnd = new RegExp('Brockton|Parkdale|Junction|Chinatown|Bloor West Village|Italy|Annex|Liberty|Dufferin|Runnymede|Seaton|Trinity|Beaconsfield|Roncesvalles', 'gi');
// filtered array
app.northToronto = [];
const northEnd = new RegExp('Hillcrest|Eglinton|Earlscourt|Davisville|York', 'gi');
class Restaurant {
	constructor(featuredImage, name, address, url, userRating) {
        this.featuredImage = featuredImage;
		this.name = name;
		this.address = address;
		this.url = url;
		this.userRating = userRating;
	}
}
app.filteredRestaurants = function (array, array2) {
    array.push
        (new Restaurant (array2.restaurant.featured_image, array2.restaurant.name, array2.restaurant.location.address, array2.restaurant.url,array2.restaurant.user_rating.aggregate_rating)) 
}

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
			"user-key": "6abd2ae7eb0a9857f87a37c0d6bdeff3",
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
            for (let i = 0; i < app.restaurants.length; i++) {
                if (downtown.test(app.restaurants[i].restaurant.location.locality)) {
                    // if the values in the regex match to the values in locality in app.restaurants then push to ...
                    app.filteredRestaurants(app.downtownToronto, app.restaurants[i]);
                } else if (eastEnd.test(app.restaurants[i].restaurant.location.locality)) {
                    app.filteredRestaurants(app.eastEndToronto, app.restaurants[i])
                } else if (westEnd.test(app.restaurants[i].restaurant.location.locality)) {
                    app.filteredRestaurants(app.westEndToronto, app.restaurants[i])
                } else if (northEnd.test(app.restaurants[i].restaurant.location.locality)) {
                    app.filteredRestaurants(app.northToronto, app.restaurants[i])
                }
                // end of if statement
            }
            // end of for loop
            // console.log(app.northToronto);
		});
}
let score = 0;
// getting sentiment score
app.getSentimentScore = function(text) {
	$.ajax({
		url: 'https://api.dandelion.eu/datatxt/sent/v1',	
		data: {
			token: 'bc77fbf397184fc1b069f3085e709f0d',
			text: text,
		},
		dataType: 'jsonp',
	})
	.then((res) => {
		score = score + res.sentiment.score;
		console.log(res.sentiment.score);
	})
}
app.submit = function() {
	$('form').on('submit', function (e) {
		e.preventDefault();
		let text = $('input[type=text]').val();
		app.getSentimentScore(text);
		$('.list').append(`<li class="txtMsg paragraph">${text}</li>`)
		$('input[type=text]').val('');
		$('.animation').addClass('animate');
		app.endAnimation();
	});
};
// end of getting sentiment score

// Function to call animation and track when it ends
app.endAnimation = function() {
	$('.circle-last').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', function () {
		$('.animation').removeClass('animate');
		console.log('the animation ended');
		$('.list').append(`<li class="txtMsg paragraph">some words</li>`);		
	});
}

app.endAnimation();

app.init = function () {
	app.calls();
	app.receiveCalls();
  app.submit(); 
}
$(function () {
	app.init();
});


