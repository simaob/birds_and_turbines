BirdsAndTurbines.BirdRoute = Ember.Route.extend({
  model: function(params) {
    return this.get('store').find('bird', params.bird_id);
  }
});

