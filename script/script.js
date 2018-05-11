
const app = {};

// store info from zomato once returned, just promises
app.returnFromZomato = [];

// 1. do 5 calls 👌🏻
// 2. use Ky's list to filter from app.restaurants into the four location arrays 👌🏻
// 3. hard copy in first informative message for user 
// 4. filter each location array based on const score between -2 to 2  👌🏻
// 5. show on DOM (style) - with a window popping up effect, figure out all functionality:
// 6. button to return to texting screen
// 7. finish responsive testing 

// an array of 100 restaurant results
app.restaurants = [];

// filtered array
app.downtownToronto = [ [], [], [] ];

// downtown is the variable that holds the regex for filtering
const downtown = new RegExp('Entertainment|Kensington|Fashion|Grange|Downtown|Church|Financial', 'gi');

// filtered array
app.eastEndToronto = [ [], [], [] ];

// eastEnd is the variable that holds the regex for filtering
const eastEnd = new RegExp('Distillery|East|Lawrence|Beaches|Riverside', 'gi');

// filtered array
app.westEndToronto = [ [], [], [] ];

// westEnd is the variable that holds the regex for filtering
const westEnd = new RegExp('Brockton|Parkdale|Junction|Chinatown|Bloor West Village|Italy|Annex|Liberty|Dufferin|Runnymede|Seaton|Trinity|Beaconsfield|Roncesvalles', 'gi');

// filtered array
app.northToronto = [ [], [], [] ];

// northEnd is the variable that holds the regex for filtering
const northEnd = new RegExp('Hillcrest|Eglinton|Earlscourt|Davisville|York', 'gi');

////////////////////////////////////////////////////////////////////////////////////////////////////

class Restaurant {
	constructor(featuredImage, name, address, url, userRating, priceRange) {
        this.featuredImage = featuredImage;
		this.name = name;
		this.address = address;
		this.url = url;
        this.userRating = userRating;
        this.priceRange = priceRange;
	}
}
app.filteredRestaurants = function (array, array2) {
    array.push
        (new Restaurant (array2.restaurant.featured_image, array2.restaurant.name, array2.restaurant.location.address, array2.restaurant.url,array2.restaurant.user_rating.aggregate_rating, array2.restaurant.price_range)) 
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

                if (downtown.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 1)) {
					app.filteredRestaurants(app.downtownToronto[0], app.restaurants[i]);
				} 
				
				else if (downtown.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 2)) {
					app.filteredRestaurants(app.downtownToronto[1], app.restaurants[i]);
				} 
				
				else if (downtown.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 3)) {
					app.filteredRestaurants(app.downtownToronto[2], app.restaurants[i]);
				} 
				
				else if (eastEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 1)) {
					app.filteredRestaurants(app.eastEndToronto[0], app.restaurants[i]);
				} 
				
				else if (eastEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 2)) {
					app.filteredRestaurants(app.eastEndToronto[1], app.restaurants[i]);
				}

				else if (eastEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 3)) {
					app.filteredRestaurants(app.eastEndToronto[2], app.restaurants[i]);
				}

				else if (westEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 1)) {
					app.filteredRestaurants(app.westEndToronto[0], app.restaurants[i]);
				}

				else if (westEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 2)) {
					app.filteredRestaurants(app.westEndToronto[1], app.restaurants[i]);
				}

				else if (westEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 3)) {
					app.filteredRestaurants(app.westEndToronto[2], app.restaurants[i]);
				}

				else if (northEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 1)) {
					app.filteredRestaurants(app.northToronto[0], app.restaurants[i]);
				}

				else if (northEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 2)) {
					app.filteredRestaurants(app.northToronto[1], app.restaurants[i]);
				}

				else if (northEnd.test(app.restaurants[i].restaurant.location.locality) && (app.restaurants[i].restaurant.price_range === 3)) {
					app.filteredRestaurants(app.northToronto[2], app.restaurants[i]);
				}
                // end of if statement
            }
            // end of for loop
		});
}
app.score = 0;
app.counter = 2;
app.neighbourhoodChoice = '';
app.neighbourhoodEast = new RegExp('eas', 'i');
app.neighbourhoodWest = new RegExp('wes', 'i');
app.neighbourhoodDowntown = new RegExp('down', 'i');
app.neighbourhoodNorth = new RegExp('nor', 'i');

app.checkNeighbourhood = function(text) {
	if (app.neighbourhoodEast.test(text)) {
		app.neighbourhoodChoice = app.eastEndToronto;
	} else if (app.neighbourhoodWest.test(text)) {
		app.neighbourhoodChoice = app.westEndToronto;
	} else if (app.neighbourhoodDowntown.test(text)) {
		app.neighbourhoodChoice = app.downtownToronto;
	} else if (app.neighbourhoodNorth.test(text)) {
		app.neighbourhoodChoice = app.northToronto;
	}
	console.log(app.neighbourhoodChoice);
}
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
		app.score = app.score + res.sentiment.score;
	})
}
app.submit = function() {
	$('form').on('submit', function (e) {
		e.preventDefault();
		let text = $('input[type=text]').val();
		if (app.counter === 3) {
			app.checkNeighbourhood(text);
			$('input[type=submit]').prop('disabled',true);
		}
		app.getSentimentScore(text);
		$('.list').append(`<li class="txtMsg paragraph">${text}</li>`)
		$('input[type=text]').val('');
		$('.animation').addClass('animate');
		app.endAnimation();
	});
};
// end of getting sentiment score

// Function to call animation and track when it ends
app.writeResponse = function(string) {
	$('.animation').removeClass('animate');
	$('.list').append(`<li class="txtMsg paragraph">${string}?</li>`);
	app.counter = app.counter + 1;
}
app.endAnimation = function() {
	$('.circle-last').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', function () {
		if (app.counter === 0) {
		app.writeResponse('You ready for your taco date tonight')
		}	else if (app.counter === 1){
			app.writeResponse(`You're taking what's-their-face right? What did their last text say`)
		} else if (app.counter === 2) {
			app.writeResponse('Are you thinking <form><label for="west">West End</label>, <label for="east">East End</label>, <label for="downtown">Downtown</label>, or <label for="north"> North </label>');
		} else {
			app.writeResponse('<a class="btn btn--results" href="#"> Show Suggestions </a>');
			$('.animation').css('display', 'none');
			app.showResults();
		}
	});
}

app.showResults = function() {
	$('.btn--results').on('click', function () {
		$('.results').css('display','flex');
	})
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


