BirdsAndTurbines.ApplicationRoute = Ember.Route.extend({
  model : function(){
    var birds = this.get('store').findAll('bird');
    return birds;
  }
});
