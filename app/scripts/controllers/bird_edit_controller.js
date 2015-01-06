BirdsAndTurbines.BirdEditController = Ember.ObjectController.extend({
  needs: 'bird',
  actions: {
    save: function(){
      self = this
      this.get('buffer').forEach(function(attr){
        self.get('controllers.bird.model').set(attr.key, attr.value);
      });
      this.transitionToRoute('bird',this.get('model'));
    }
  }
});

