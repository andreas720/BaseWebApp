  $(document).ready(function(){
    getPosts();
  })
  
  // jQuery can do a lot of crazy stuff, so make sure to Google around to find out more
 
// $(document).ready(function(){
//   getWeather();
// })


function getWeather(searchQuery) {
  var url = "http://api.openweathermap.org/data/2.5/weather?q="+searchQuery+"&units=metric&APPID=3f392d0a001d833b0366d83e50042573"+apiKey;

  // console.log(url);
  

  $(".city").text("");
  $(".temp").text("");

  $.ajax(url,{success: function(data){
    console.log(url);
    $(".city").text(data.name);
    $(".temp").text(data.main.temp);
    
  }, error:function(error){
    $(".error-message").text("An error occured");
  }})
}

function searchWeather() {
  var searchQuery = $(".search").val();
    getWeather(searchQuery);

}

function handleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    console.log(user.email);
    
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function addMessage(postTitle, postBody) {
  // Get a reference to the database service
  var postData = {
    title: postTitle,
    body: postBody
  }
  var database = firebase.database().ref("posts");

  // Create a new post reference with an auto-generated id
var newPostRef = database.push();
newPostRef.set(postData, function(error) {
    if (error) {
      // The write failed...
    } else {
      // Data saved successfully!
      window.location.reload();
    }
    }); 
}


function handleMessageFormSubmit() {
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  console.log(postTitle);
  addMessage(postTitle,postBody);
  
}

function getPosts() {
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref("posts").once('value').then(function(snapshot) {
    var posts = snapshot.val();
    console.log(posts);
    
    // ...
  });
}
