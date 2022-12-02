/**
 * author: Cassandra Wischhoefer
 * 
 * Homes for Hounds is a webpage where you can be paired with an adoptable dog
 * within close proximity to your entered zipcode.
 */


var KEY = "lArZ9OoQvbW5IMp80Xh8vqUGyf2a9GENVVphOUzAhlj6xLmd2E";
var SECRET = "TbBpa0ozASwK2p2ld6qGXnGcDOjn7R9D1Hed67qV";

/**
 * Sends the get request to PetFinder and saves the response.
 * @param {*} url 
 */
async function httpGet(url, access_token)
{

    // send GET request to petfinder  
    let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(access_token),
                'Content-Type': 'application/json'
            }
        });
    let json = await response.json();

    // If the request returns with 200 status, display.
    // Otherwise print error message and log the error
    if (response.status === 200) {
        // get a random num between 1 and 5
        let random_dog_index = Math.floor(Math.random() * 5);
        displayResponse(json, random_dog_index);
    } else {
        document.getElementById("notes").innerHTML = "Data not avaliable. Please try again later.";
        console.log(response.text());
    }
}


/**
 * Formats the response from the request and displays relevent details
 * @param {*} json the response from petfinder in the form is json
 * @param {*} i the index of the dog in the list of dogs in json
 */
function displayResponse(json, i){

        // if anything important is null, select a different dog
        if (json.animals[i].name == null || json.animals[i].gender == null || json.animals[i].photos[0].large == null){
            displayResponse(json, i++);
        }
        document.getElementById("notes").innerHTML = "";

        // change background colors of text sections
        document.getElementById("info_box").style.backgroundColor = 'rgb(236, 236, 236)';
        document.getElementById("location_box").style.backgroundColor = 'rgba(86, 107, 191, 0.181)';

        // name
        document.getElementById("name").innerHTML = json.animals[i].name;
        
        // breed
        if (json.animals[i].breeds.primary == null){
            document.getElementById("breed").innerHTML = "Mixed Breed";
        } else {
            document.getElementById("breed").innerHTML = "BREED:<br>" + json.animals[i].breeds.primary;
        }

        // age
        if (json.animals[i].age == null){
            document.getElementById("age").innerHTML = "Age unknown";
        } else {
            document.getElementById("age").innerHTML = "AGE:<br>" + json.animals[i].age;
        }

        // size
        document.getElementById("size").innerHTML = "SIZE:<br>" + json.animals[i].size;
        
        // gender
        document.getElementById("gender").innerHTML = "GENDER:<br>" + json.animals[i].gender;

        document.getElementById("main_pic").src = json.animals[i].photos[0].large;

        // location
        document.getElementById("find_me").innerHTML = "Come find me!";
        document.getElementById("location").innerHTML = "I'm located in " + json.animals[i].contact.address.city + ", " + json.animals[i].contact.address.state;

        // link
        document.getElementById("link").innerHTML = "You can see me HERE on PetFinder";
        document.getElementById("link").href = json.animals[i].url;
        document.getElementById("my_id").innerHTML = "My ID is: " + json.animals[i].id;
}

/**
 * When the page is loaded, get the api key to use in all requests
 */
window.onload = async function(){
    let key_response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id='+KEY+'&client_secret='+SECRET,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    let k = await key_response.json();
    window.access_token = k.access_token;
}


/**
 * On button click, get a dog from Petfinder api
 */
var next = document.getElementById("next_button");
next.addEventListener('click', function() { 
    
    // todo get this to work
    // this only runs when the form is validated with correct input from Parsley
    // if ($('#form').isValid()){

    // display searching note so user's know it is working in the back
    document.getElementById("notes").innerHTML = "...Please wait while we find the perfect pup for you...";

    // get uer inputted zipcode from textbox
    var zip = document.getElementById('zip_code').value;
    url = "https://api.petfinder.com/v2/animals?type=dog&location="+zip;

    // call the function that sends the api request
    httpGet(url, access_token); 

    // }
});


