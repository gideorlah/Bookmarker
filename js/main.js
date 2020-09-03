// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
   // Get form values
   var siteName = document.getElementById('siteName').value;
   var siteUrl = document.getElementById('siteUrl').value;

   if(!validateForm(siteName, siteUrl)) {
      return false;
   }

   var bookmark = {
       name: siteName,
       url: siteUrl
   }

   /*
   // Local Storage Test
   localStorage.setItem('test', 'Hello World');
   console.log(localStorage.getItem('test'));
   localStorage.removeItem('test');
   console.log(localStorage.getItem('test'));

   JSON.parse will turn a string to JSON
   JSON.stringify will turn JSON back to a string

    */

    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //Initialize array
        var bookmarks = [];
        // Add to the array
        bookmarks.push();
        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else{
        // Get Bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);
        // Reset back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form after submission
    document.getElementById('#myForm').reset;

    // Re-fetch bookmarks
    fetchBookMarks();

    // Prevent form from submitting in the regular way
    e.preventDefault();
}

// Delete Bookmarks
function deleteBookmark(url) {
    // Get bookmarkers from Local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop through the bookmarks
    for(var i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            // Remove from Array
            bookmarks.splice(i, 1);
        }
    }
    // Re-Set back to Local Storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookMarks();
}

// Fetch Bookmarks
function fetchBookMarks() {
    // Get Bookmarks from Local Storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    // Get Output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // Build Output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i<bookmarks.length; i++) {
      var name = bookmarks[i].name;
      var url = bookmarks[i].url;

      bookmarksResults.innerHTML += '<div class="well">'+
                                    '<h3>'+name+
                                    ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> '+
                                    '</h3>'+
                                    '</div>';
    }
}

//Validate Form
function validateForm(siteName, siteUrl){
        if(!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
    }

    return true;
}
