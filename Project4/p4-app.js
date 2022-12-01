
// scroll through dogs in your area

// API key = lArZ9OoQvbW5IMp80Xh8vqUGyf2a9GENVVphOUzAhlj6xLmd2E
// secret = TbBpa0ozASwK2p2ld6qGXnGcDOjn7R9D1Hed67qV

// Response:
//{"token_type":"Bearer","expires_in":3600,
//"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsQXJaOU9vUXZiVzVJTXA4MFhoOHZxVUd5ZjJhOUdFTlZWcGhPVXpBaGxqNnhMbWQyRSIsImp0aSI6ImEzODQxN2FhMjQ4NmIxZDhjNDMxMjU5NDE2ODk4ZmZiOWU2OGE2M2M0N2RiMDFlNzQyYWYwMTMyOTJmMDdlZmU2YzFjNWZiZTRkYmFlZDQyIiwiaWF0IjoxNjY4OTg4MDA5LCJuYmYiOjE2Njg5ODgwMDksImV4cCI6MTY2ODk5MTYwOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.gRg6eDvUaqqGAGrLzinV3YwTl8SB6MDQYcOLrOoiLNU1mF7sKeq6hu5V_rgV1zQZO6gsnkckpk-wk9Bhv6c_9OEFTYbtn5HikWPcfx95AiSDS1OOfWQaGwZzGE3AzTISJDskjCibm5dgUbpATwcAN17NbOg3bck3qFXKVsfgfw_nB1kSpduiSxI_3lEOhI7AlJmfATwYpo57a7zGldazxWN9VoRIgNvcPjBi9ovEke-5vzDjWRZip0kZ3YrL2GtDeYLqZCBXCYrJEU1AsMjjiQ8KWg2EbslKoFrZFm63rSHaxsLc3tOPdBSoxhEizkVKGH1TN9G2OCBMIcFzJiAYsA"}%  

// -------------------------------------------------------------------------------------------------//

// var ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsQXJaOU9vUXZiVzVJTXA4MFhoOHZxVUd5ZjJhOUdFTlZWcGhPVXpBaGxqNnhMbWQyRSIsImp0aSI6IjVkMGUzZjJiNzI4MTA2OWY1MzY3ZTIzYmRkZjBjNDVhYjEwNWYwYzM1NDkzN2MyYWQyYjhiMGVhNjA5NTQ1ZThmNWZmNGYxODI5NTIxYTc2IiwiaWF0IjoxNjY5NzEyMDM4LCJuYmYiOjE2Njk3MTIwMzgsImV4cCI6MTY2OTcxNTYzOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.uo3pUP5_JW8DNkyi-3fXsLX_waLtJihHwPjWCJV8U8ULuCAlpCWk49fil5Lqi0gp1E8oQa4OGaK1MjRdPqHVLMjCDkVuPiFxRG7h4VFNJLiIxkcamsExlVd--TQ8bdayB7LJvcsBcBiRVXrhUTwt49JUsukmx5Fs5pwPE3NH_t6gfuNX4xHI_gPVYFV775naOu6-vfXx-IpYBwsa966gVd0XrVeuklfXDx9qFralYquy8at8S7_7bBnPIqFrKJWsG5iWgcPGcxQ29VBV4o5-nLXF8D980uHw28YfFK8BaMmiG5z_VM2us6W6VACwf2cBEqQUgGz5BibZUmZfrTcGcg';
var KEY = "lArZ9OoQvbW5IMp80Xh8vqUGyf2a9GENVVphOUzAhlj6xLmd2E";
var SECRET = "TbBpa0ozASwK2p2ld6qGXnGcDOjn7R9D1Hed67qV";

/**
 * Sends the get request to PetFinder and saves the response.
 * @param {*} url 
 */
async function httpGet(url)
{
    // get the token to use in the request
    let key_response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id='+KEY+'&client_secret='+SECRET,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    let k = await key_response.json();
    let access_token = k.access_token;

    // async function using fetch
    let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(access_token),
                'Content-Type': 'application/json'
            }
        });
    let json = await response.json();

    // if the request returns with 200 status, dipslay
    // otherwise print error message and log the error
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
 * @param {*} response 
 */
function displayResponse(json, i){

        // if anything important is null, select a different dog
        if (json.animals[i].name == null || json.animals[i].gender == null || json.animals[i].photos[0].large == null){
            displayResponse(json, i++);
        }
        document.getElementById("notes").innerHTML = "";

        // change background colors
        document.getElementById("info_box").style.backgroundColor = 'rgb(236, 236, 236)';
        document.getElementById("location_box").style.backgroundColor = 'rgba(86, 107, 191, 0.181)';


        // name
        document.getElementById("name").innerHTML = json.animals[i].name;

        // document.getElementById("breed-title"),innerHTML = "breed";
        // document.getElementById("gender-title"),innerHTML = "gender";
        // document.getElementById("age-title"),innerHTML = "age";
        // document.getElementById("size-title"),innerHTML = "size";
        
        
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

        // LOCATION
        // if it's not null then print
        document.getElementById("find_me").innerHTML = "Come find me!";
        document.getElementById("location").innerHTML = "I'm located in " + json.animals[i].contact.address.city + ", " + json.animals[i].contact.address.state;

        // link
        document.getElementById("link").innerHTML = "You can see me HERE on PetFinder";
        document.getElementById("link").href = json.animals[i].url;
        document.getElementById("my_id").innerHTML = "My ID is: " + json.animals[i].id;


        // wait until button is pressed
        // if next or back button was pressed, change dogs
        // if button is pressed, increase index and change 
    // }


}



/**
 * on button click, get a dog from DB
 */
var next = document.getElementById("next_button");
 next.addEventListener('click', function() { 
    // display searching note
    document.getElementById("notes").innerHTML = "...Please wait while we find the perfect pup for you...";

    // get zipcode from textbox
    var zip = document.getElementById('zip_code').value;
    url = "https://api.petfinder.com/v2/animals?type=dog&location="+zip;

    // call the function that send the api requests
    httpGet(url); 
});


