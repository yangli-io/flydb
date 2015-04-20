# flydb
the fastest slowest database there is. 
+ fastest in terms of easiest to use, there is literally no new API
+ slowest in terms of performance, this db is extremely slow
So why flydb?

## Why I made this
I made flydb because I wanted to be able to persist data for some of my projects. In order to do that I need to set up a database.  This was a pain and I always dreaded doing it. So I created flydb, the easiest way to save your data but this is not for everyone...

## Who is this for?
Flydb is for anyone who wants to create a simple project and needs to persist data but don't want to set up a database.
You **should** use flydb because
+ flydb is super easy to use
+ flydb is super easy to migrate
+ setup takes 5seconds

You **shouldn't** use flydb because
+ flydb is not scalable at all
+ flydb is extremely slow (but really for minor projects, you won't notice a difference)

##Install

````
  npm install flydb
````

##Example

````javascript
var flydb = require('flydb');

flydb.test = "hello world";  //flydb.test will now persist
````

Change the codes and see if it's still there! you will be amazed!!
````javascript
var flydb = require('flydb');

console.log(flydb.test);
````

## TODO:
+ Add testing
+ Add some more functionality without disrupting it's simplicity, such as allow users to create their own .fdb files on init


