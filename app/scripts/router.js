BirdsAndTurbines.Router.map(function () {

  this.resource("about");
  this.resource("contact");

  this.resource('birds', function(){
    this.resource('bird', { path: '/:bird_id' }, function(){
      this.route('edit');
    });
    this.route('create');
  });
});
