# TwitterAPI
	
	heroku link:-https://aayush-twitter-backend.herokuapp.com/
	
	first command "npm install"

	run test    =>    "npm test"
	run project =>    "npm start'

	"POST (/user/login)":{
 		"req":{
		    "username":"",
		    "password":""
		}

		"res":{
		   " username":"",
		    "password":"",
		    "_id":"",
		    "timestamps":"",
		    "noOfFollowers":"type=Number",
		    "noOfFollowings":"type=Number",
		}
   	 }
    
    
    "POST (/user/register)":{
        "req":{
           " username":"",
            "password":""
        },
        "res":{
           " username":"",
            "password":"",
            "_id":"",
            "timestamps":""
        }
    }
    
    "GET (/)":{
        "req":{},
        "res":"session is created / session is not created"
    }
    "POST (/user/follow/:username) here username=username of that person whom current person want to follow":{
        "req":{},
        "res":{
            "status":"true",
            "status":"false",
        }
    }
    
    "DELETE (/user/follow/:username) here username=username of that person whome current person want to unfollow":{
        "req":{},
        "res":"unfollow successful / error"
    }
    
    
    "POST (/tweet/post)":{
        "req":{
            "body":""
        }
        "res":{
           " username":"",
            "_id":"",
            "body":"",
            "noOfLikes":"type=Number",
            "noOfRetweet":"type=Number",
            "timestamps":""
        }
    }
    
    "GET (/tweet/get/:id) id= tweet_id which want to read":{
        "req":{},
        "res":{
           " username":"",
            "_id":"",
           " body":"",
            "noOfLikes":"type=Number",
            "noOfRetweet":"type=Number",
            "timestamps":""
        }
    }
    
    "DELETE (/tweet/delete/:id) id=tweet_id which user want to delete":{
        "req":{},
        "res":"deleted / login first"
    }
    
    "DELETE (/tweet/delete/:username) username=username of the person wants to delete":{
        "req":{},
        "res":"deleted / User not present"
    }

