




/////
// template helpers 
/////

// helper function that returns all available websites
Template.website_list.helpers({
	websites:function(){
		//return Websites.find({});
		return Websites.find({}, {sort:{rating:-1, createdOn: -1}});
	}
});


/////
// template events 
/////

Template.website_item.events({
	"click .js-upvote":function(event){
		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Up voting website with id "+website_id);
		// put the code in here to add a vote to a website!
		// Websites.update({_id: website_id } , { $inc: {rating: + 1 }})

		var rating = Websites.findOne({_id: website_id}).rating;
		if (Meteor.user()){
			if(undefined == rating || isNaN(rating) ) {
				rating = 1;
			}
			
			rating = rating + 1;
			Websites.update({_id:website_id}, {$set: {rating:rating}});
			console.log(rating);
			console.log("successfully upvoted");
		}
		else{
			alert("Please log in at first to vote.");
		}		

		return false;// prevent the button from reloading the page
	}, 
	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Down voting website with id "+website_id);

		// put the code in here to remove a vote from a website!
		// Websites.update({_id: website_id } , { $inc: {rating: - 1 }})
		var downrating = Websites.findOne({_id: website_id}).downrating;		
		if (Meteor.user()){
			if(undefined == downrating || isNaN(downrating) ) {
				downrating = 1;
			}
			
			downrating = downrating + 1;

			Websites.update({_id:website_id}, {$set: {downrating:downrating}});
			console.log(downrating);
			console.log("successfully downvoted");
		}
		else{
			alert("Please log in at first to vote.");
		}
		return false;// prevent the button from reloading the page
	}
})

Template.website_form.events({
	"click .js-toggle-website-form":function(event){
		$("#website_form").toggle('slow');
	}, 
	"submit .js-save-website-form":function(event){

		// here is an example of how to get the url out of the form:
		var url = event.target.url.value;
		var title = event.target.title.value;
		var description = event.target.description.value;
		console.log("The url they entered is: "+url);
		console.log("Meteor.user: " + Meteor.user());
		
		//  put your website saving code in here!	
		if (Meteor.user()){
			Websites.insert({
				title:title, 
				url:url, 
				description:description,
				rating: 0,
				downrating : 0,
				createdOn:new Date(),
				createdBy:Meteor.user()._id,
				comments: []
			});

			console.log("successfully inserted");
		}
		else{
			alert("Please log in at first to add new website.");
		}
		$("#websit_form").modal('hide');
		
		return false;// stop the form submit from reloading the page

	}
});

Template.website_item_detailed.events({
	"submit .js-save-comment-form":function(event){

		// here is an example of how to get the comment out of the form:
		var website_id = this._id;
		var comment = event.target.comment.value;
		console.log("The comment they entered is: "+comment);
		
		//  put your website saving code in here!	

		if (Meteor.user()){
			
			if(comment!=""){
				Websites.update({_id:website_id}, {$push: {comments:comment}});

				console.log("successfully inserted comment");
			}
			
		}
		else{
			alert("Please log in at first to add comment.");
		}

		$("#websit_form").modal('hide');

		return false; // stop the form submit from reloading the page

	},

	"click .js-upvote":function(event){
		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Up voting website with id "+website_id);
		// put the code in here to add a vote to a website!

		var rating = Websites.findOne({_id: website_id}).rating;
		// put the code in here to remove a vote from a website!
		if (Meteor.user()){
			rating = rating + 1;
			Websites.update({_id:website_id}, {$set: {rating:rating}});
			console.log(rating);
			console.log("successfully upvoted");
		}
		else{
			alert("Please log in at first to vote.");
		}

		return false;// prevent the button from reloading the page
	}, 

	"click .js-downvote":function(event){

		// example of how you can access the id for the website in the database
		// (this is the data context for the template)
		var website_id = this._id;
		console.log("Down voting website with id "+website_id);


		var downrating = Websites.findOne({_id: website_id}).downrating;
		// put the code in here to remove a vote from a website!
		if (Meteor.user()){
			downrating = downrating + 1;
			Websites.update({_id:website_id}, {$set: {downrating:downrating}});
			console.log(downrating);
			console.log("successfully downvoted");
		}
		else{
			alert("Please log in at first to vote.");
		}

		return false;// prevent the button from reloading the page
	}
});




if (Meteor.isClient) {

}


if (Meteor.isServer) {

}
