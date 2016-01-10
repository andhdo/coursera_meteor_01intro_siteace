/// routing 

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('website_form', {
    to:"add_form"
  });

  this.render('website_list', {
    to:"main"
  });
});

Router.route('/websites',function(){
	this.render('website_form', {
    to:"add_form"
  });

  this.render('website_list', {
    to:"main"
  });
});


Router.route('/websites/:_id', function () {
  this.render('website_item_detailed', {
    to:"main", 
    data:function(){
      return Websites.findOne({_id:this.params._id});
    }
  });

});
