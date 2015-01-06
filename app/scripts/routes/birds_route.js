BirdsAndTurbines.BirdsRoute = Ember.Route.extend({
  model: function() {
    return this.get('store').find('bird');
  }
});

