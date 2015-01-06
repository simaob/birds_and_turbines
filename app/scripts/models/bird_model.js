/*global Ember*/

BirdsAndTurbines.Bird = DS.Model.extend({
  posX : DS.attr('string'),
  posY : DS.attr('string'),
  name : DS.attr('string'),
});

// probably should be mixed-in...
BirdsAndTurbines.Bird.reopen({
  attributes: function(){
    var model = this;
    return Ember.keys(this.get('data')).map(function(key){
      return Em.Object.create({ model: model, key: key, valueBinding: 'model.' + key });
    });
  }.property()
});
