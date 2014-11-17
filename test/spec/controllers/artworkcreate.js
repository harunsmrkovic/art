'use strict';

describe('Controller: ArtworkcreateCtrl', function () {

  // load the controller's module
  beforeEach(module('artApp'));

  var ArtworkcreateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ArtworkcreateCtrl = $controller('ArtworkcreateCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
