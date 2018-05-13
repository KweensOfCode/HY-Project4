
const app = {};

// store info from zomato once returned, just promises
app.returnFromZomato = [];

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
// Lets the user bring up the information page
app.info = function () {
	$('.btn--info').on('click', function () {
		$('.info').css('display', 'flex');
	});
}
// Lets the user close either the info section or the recommendations button
app.closeResults = function () {
	$('.btn--close').on('click', function () {
		$(this).parent().css('display', 'none');
	});
}
// Creating the sentiment score that will be updated as users provide inputs
app.score = 1;
// Counter that keeps track of how many times the user has submitted an answer
app.counter = 2;
// Creating an empty variable that will eventually store the neighbourbourhood a user selected. 
app.neighbourhoodChoice = '';
// Regular expressions that check the users input against possible neighbourhoods
app.neighbourhoodEast = new RegExp('eas', 'i');
app.neighbourhoodWest = new RegExp('wes', 'i');
app.neighbourhoodDowntown = new RegExp('down', 'i');
app.neighbourhoodNorth = new RegExp('nor', 'i');

// Function to check user's input against possible neighbourhoods. 
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
}
// Function that gets sentiment score
app.getSentimentScore = function(text) {
	// Makes the call to the API with the text
	$.ajax({
		url: 'https://api.dandelion.eu/datatxt/sent/v1',	
		data: {
			token: 'bc77fbf397184fc1b069f3085e709f0d',
			text: text,
		},
		dataType: 'jsonp',
	})
	// Updates the score variable with the current score
	.then((res) => {
		app.score = app.score + res.sentiment.score;
	})
}
// Tracks when the user clicks the submit button
app.submit = function() {
	$('form').on('submit', function (e) {
		e.preventDefault();
		// If user tries to submit without entering a value into the text box, this adds a red border to the text input
		if ($('input[type=text]').val() === ''){
			$('input[type=text]').css('border','3px solid red');
		} else {
		// This disables the submit button once the user enters a value, to ensure they only submit once
		$('input[type=submit]').prop('disabled', true);
		// Takes the text value from the user input
		app.text = $('input[type=text]').val();
		// Sends off text input to API to get sentiment score
		app.getSentimentScore(app.text);
		// Function that appends users input as text message on screen
		app.populateText(app.text);
		// Function that listens for when the writing animation ends and adds next hard-coded question to the screen. 
		app.endAnimation();
		// After the third question, this function checks the user's input for one of the localities.
		if (app.counter === 3) {
			app.checkNeighbourhood(app.text);
		}
		} 
	});
};
// end of getting sentiment score
app.populateText = function(text) {
	$('.list').append(`<li class="txtMsg paragraph">${text}</li>`)
	$('input[type=text]').val('');
	$('.animation').addClass('animate');
}

// Function to call animation and track when it ends
app.writeResponse = function(string) {
	$('.animation').removeClass('animate');
	$('.list').append(`<li class="txtMsg paragraph">${string}</li>`);
	app.counter = app.counter + 1;
}
// Function to track when the dots animation ends to populate the page with feedback for user. 
app.endAnimation = function() {
	// Once the animation has finished running on the final dot, run this function
	$('.circle-last').one('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', function () {
		// Turn on the submit button
		$('input[type=submit]').prop('disabled', false);
		// If this is the first time looping through it writes the first question
		if (app.counter === 0) {
			app.writeResponse(`I know you still haven't decided where to go for that taco date tonight, but don't worry, you've come to the taco kween 👸🏻. First, tell me how you're feeling about this date.`)
		// If this is the second time looping through it writes the second question
		}	else if (app.counter === 1){
			app.writeResponse(`That's real. And what about what's-their-face? What do have they have to say about it?`)
		// If this is for the third time looping through it writes the third question
		} else if (app.counter === 2) {
			app.writeResponse(`Hmmmm. Interesting. <br> What part of the city are you thinking? East End, West End, Downtown, or (dare I say it) North?`);
			// If this is the last time it will provide suggestions
		} else {
			app.writeResponse(`Well, based on what you've told me, I've pulled together a couple of solid suggestions for where you should go tonight. <a class="btn btn--displayResults" href="#"> Show me the results </a>`);
			$('.animation').css('display', 'none');
			app.showResults();
			app.recommendationsOnPage();
			$('input[type=submit]').prop('disabled', true);
			$('.btn--reset').css('display', 'flex');
		}
	});
}
// Sets up the click function for the "show recommendations" button
app.showResults = function() {
	$('.btn--displayResults').on('click', function () {
		$('.results').css('display','flex');
	})
}
// Runs the initial animation upon page load. 
app.endAnimation();
// Shuffles the items within an array
app.shuffle = function (array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	while (currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex--);
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}

// use app.score to .text, and .attr (image) to the page using an if statement:
app.recommendationsOnPage = function() {
// 	// app.neighbourhoodChoice will return one of app.downtownToronto, app.eastEndToronto, app.westEndToronto, or app.northToronto
		if (app.score < 0) {
		// shuffles the contents of the array
		// app.neighbourhoodChoice[0][0] - takes first item out of shuffled array
		app.shuffle(app.neighbourhoodChoice[0][0]);
		// app.neighbourhoodChoice[0] - takes first item out of shuffled array

		// ----- first section targets the first restaurant recommendation ----- 
		$('.image1').attr('src', app.neighbourhoodChoice[0][0].featuredImage)
		$('.restaurantName').text(app.neighbourhoodChoice[0][0].name);
		$('.restaurantAddress').text(app.neighbourhoodChoice[0][0].address);
		$('.restaurantRating').text(`Rating: ${app.neighbourhoodChoice[0][0].userRating}`);
		$('.restaurantURL').attr('href', app.neighbourhoodChoice[0][0].url);
		// ----- end of first section reco -----

		// ----- second section targets the second restaurant recommendation ----
		$('.image2').attr('src', app.neighbourhoodChoice[0][1].featuredImage)
		$('.restaurantName2').text(app.neighbourhoodChoice[0][1].name);
		$('.restaurantAddress2').text(app.neighbourhoodChoice[0][1].address);
		$('.restaurantRating2').text(`Rating: ${app.neighbourhoodChoice[0][1].userRating}`);
		$('.restaurantURL2').attr('href', app.neighbourhoodChoice[0][1].url);
		// ---- end of second section reco ----
		} 
		// end of score < 0
		
		else if (app.score === 0) {
		// ----- first section targets the first restaurant recommendation ----- 
		$('.image1').attr('src', app.neighbourhoodChoice[1][0].featuredImage)
		$('.restaurantName').text(app.neighbourhoodChoice[1][0].name);
		$('.restaurantAddress').text(app.neighbourhoodChoice[1][0].address);
		$('.restaurantRating').text(`Rating: ${app.neighbourhoodChoice[1][0].userRating}`);
		$('.restaurantURL').attr('href', app.neighbourhoodChoice[1][0].url);
		// ----- end of first section reco -----

		// ----- second section targets the second restaurant recommendation ----
		$('.image2').attr('src', app.neighbourhoodChoice[1][1].featuredImage)
		$('.restaurantName2').text(app.neighbourhoodChoice[1][1].name);
		$('.restaurantAddress2').text(app.neighbourhoodChoice[1][1].address);
		$('.restaurantRating2').text(`Rating: ${app.neighbourhoodChoice[1][1].userRating}`);
		$('.restaurantURL2').attr('href', app.neighbourhoodChoice[1][1].url);
		// ---- end of second section reco ----
		} 
		// end of score === 0

		else if (app.score > 0) {
		// ----- first section targets the first restaurant recommendation ----- 
		$('.image1').attr('src', app.neighbourhoodChoice[2][0].featuredImage)
		$('.restaurantName').text(app.neighbourhoodChoice[2][0].name);
		$('.restaurantAddress').text(app.neighbourhoodChoice[2][0].address);
		$('.restaurantRating').text(`Rating: ${app.neighbourhoodChoice[2][0].userRating}`);
		$('.restaurantURL').attr('href', app.neighbourhoodChoice[2][0].url);
		// ----- end of first section reco -----

		// ----- second section targets the second restaurant recommendation ----
		$('.image2').attr('src', app.neighbourhoodChoice[2][1].featuredImage)
		$('.restaurantName2').text(app.neighbourhoodChoice[2][1].name);
		$('.restaurantAddress2').text(app.neighbourhoodChoice[2][1].address);
		$('.restaurantRating2').text(`Rating: ${app.neighbourhoodChoice[2][1].userRating}`);
		$('.restaurantURL2').attr('href', app.neighbourhoodChoice[2][1].url);
		// ---- end of second section reco ----
		}
		// end of score > 0
}
// end of recommendationsOnPage function

app.init = function () {
	app.calls();
	app.receiveCalls();
	app.submit();
	app.closeResults(); 
	app.info();
}

$(function () {
	app.init();
});


