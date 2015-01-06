/* BirdsAndTurbines.ApplicationAdapter = DS.FixtureAdapter; */

BirdsAndTurbines.ApplicationStore = DS.Store.extend();
BirdsAndTurbines.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'birds_and_turbines'
});
