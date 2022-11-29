
// scroll through dogs in your area

// API key = lArZ9OoQvbW5IMp80Xh8vqUGyf2a9GENVVphOUzAhlj6xLmd2E
// secret = TbBpa0ozASwK2p2ld6qGXnGcDOjn7R9D1Hed67qV

// Response:
//{"token_type":"Bearer","expires_in":3600,
//"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsQXJaOU9vUXZiVzVJTXA4MFhoOHZxVUd5ZjJhOUdFTlZWcGhPVXpBaGxqNnhMbWQyRSIsImp0aSI6ImEzODQxN2FhMjQ4NmIxZDhjNDMxMjU5NDE2ODk4ZmZiOWU2OGE2M2M0N2RiMDFlNzQyYWYwMTMyOTJmMDdlZmU2YzFjNWZiZTRkYmFlZDQyIiwiaWF0IjoxNjY4OTg4MDA5LCJuYmYiOjE2Njg5ODgwMDksImV4cCI6MTY2ODk5MTYwOSwic3ViIjoiIiwic2NvcGVzIjpbXX0.gRg6eDvUaqqGAGrLzinV3YwTl8SB6MDQYcOLrOoiLNU1mF7sKeq6hu5V_rgV1zQZO6gsnkckpk-wk9Bhv6c_9OEFTYbtn5HikWPcfx95AiSDS1OOfWQaGwZzGE3AzTISJDskjCibm5dgUbpATwcAN17NbOg3bck3qFXKVsfgfw_nB1kSpduiSxI_3lEOhI7AlJmfATwYpo57a7zGldazxWN9VoRIgNvcPjBi9ovEke-5vzDjWRZip0kZ3YrL2GtDeYLqZCBXCYrJEU1AsMjjiQ8KWg2EbslKoFrZFm63rSHaxsLc3tOPdBSoxhEizkVKGH1TN9G2OCBMIcFzJiAYsA"}%  

// -------------------------------------------------------------------------------------------------//

var ACCESS_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJsQXJaOU9vUXZiVzVJTXA4MFhoOHZxVUd5ZjJhOUdFTlZWcGhPVXpBaGxqNnhMbWQyRSIsImp0aSI6IjVkMGUzZjJiNzI4MTA2OWY1MzY3ZTIzYmRkZjBjNDVhYjEwNWYwYzM1NDkzN2MyYWQyYjhiMGVhNjA5NTQ1ZThmNWZmNGYxODI5NTIxYTc2IiwiaWF0IjoxNjY5NzEyMDM4LCJuYmYiOjE2Njk3MTIwMzgsImV4cCI6MTY2OTcxNTYzOCwic3ViIjoiIiwic2NvcGVzIjpbXX0.uo3pUP5_JW8DNkyi-3fXsLX_waLtJihHwPjWCJV8U8ULuCAlpCWk49fil5Lqi0gp1E8oQa4OGaK1MjRdPqHVLMjCDkVuPiFxRG7h4VFNJLiIxkcamsExlVd--TQ8bdayB7LJvcsBcBiRVXrhUTwt49JUsukmx5Fs5pwPE3NH_t6gfuNX4xHI_gPVYFV775naOu6-vfXx-IpYBwsa966gVd0XrVeuklfXDx9qFralYquy8at8S7_7bBnPIqFrKJWsG5iWgcPGcxQ29VBV4o5-nLXF8D980uHw28YfFK8BaMmiG5z_VM2us6W6VACwf2cBEqQUgGz5BibZUmZfrTcGcg';
var KEY = "lArZ9OoQvbW5IMp80Xh8vqUGyf2a9GENVVphOUzAhlj6xLmd2E";
var SECRET = "TbBpa0ozASwK2p2ld6qGXnGcDOjn7R9D1Hed67qV";

/**
 * Sends the get request to PetFinder and saves the response.
 * @param {*} url 
 */
async function httpGet(url)
{
    // let key_full = await fetch("https://api.petfinder.com/v2/oauth2/token", {
    //     method: 'GET',
    //     headers: {
    //         grant_type: 'client_credentials',
    //         client_id: KEY,
    //         client_secret: SECRET,
    //         'Content-Type': 'application/json'
    //     }
    // });
    // let key = await key_full.text();
    // let key_value = key.access_token;
    // console.log(key);

    // document.getElementById("dog_info").innerhtml = key;

    // curl -d "grant_type=client_credentials&client_id=lArZ9OoQvbW5IMp80Xh8vqUGyf2a9GENVVphOUzAhlj6xLmd2E&client_secret=TbBpa0ozASwK2p2ld6qGXnGcDOjn7R9D1Hed67qV" https://api.petfinder.com/v2/oauth2/token

    // var json = {};
    // async function using fetch
    let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': "Bearer ".concat(ACCESS_TOKEN),
                'Content-Type': 'application/json'
            }
        });

    let json = await response.json();

    // if (json.status === 200) {
    //     displayResponse(json);
    // } else {
    //     document.getElementById("dog_div").innerHTML = "Data not avaliable. Please try again later.";
    // }
    // document.getElementById("dog_info").innerHTML = json;

    // begins on 1 because sometimes the first index (0) is being inputted
    // and not all necessary infornmation has been entered
    // return json;
    displayResponse(json, 1);
    // return;
    // return json;
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
        // name
        document.getElementById("name").innerHTML = json.animals[i].name;

        // breed
        if (json.animals[i].breeds.primary == null){
            document.getElementById("breed").innerHTML = "BREED: Mixed - currently unknown";
        } else {
            document.getElementById("breed").innerHTML = "BREED: "+json.animals[i].breeds.primary;
        }

        // age
        if (json.animals[i].age == null){
            document.getElementById("age").innerHTML = "AGE: unknown";
        } else {
            document.getElementById("age").innerHTML = "AGE: " + json.animals[i].age;
        }

        // size
        document.getElementById("size").innerHTML = "SIZE: " + json.animals[i].size;
        
        // gender
        document.getElementById("gender").innerHTML = "GENDER: " + json.animals[i].gender;

        document.getElementById("main_pic").src = json.animals[i].photos[0].large;

        // LOCATION
        // if it's not null then print
        document.getElementById("location").innerHTML = "Come find me! I'm located in " + json.animals[i].contact.address.city + ", " + json.animals[i].contact.address.state;

        // // link
        document.getElementById("link").innerHTML = "Find me on PetFinder";
        document.getElementById("link").href = json.animals[i].url;
        document.getElementById("my_id").innerHTML = "My ID is: " + json.animals[i].id;





        // wait until button is pressed
        // if next or back button was pressed, change dogs
        // if button is pressed, increase index and change 
    // }


}

    // name

    // description

    // breed

    // age

    // gender

    // size

    // location




function get_new_dog(){

    // send get request
    // url = "https://api.petfinder.com/v2/animals?type=dog&location=98370"
    // // store result in json object
    // httpGet(url);
    // displayResponse(result, 1);
}


/**
 * on button click Thumbs down: getNewDog
 */
var next = document.getElementById("next_button");
 next.addEventListener('click', function() { 
    // get_new_dog();
    var zip = document.getElementById('zip_code').value;
    url = "https://api.petfinder.com/v2/animals?type=dog&location="+zip;
    httpGet(url); 
});

// var new_dog = document.getElementById("new");
//  next.addEventListener('click', function() { 
//     get_new_dog(); 
// });

