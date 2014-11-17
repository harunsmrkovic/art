'use strict';

describe('Directive: artworkCreate', function () {

  // load the directive's module
  beforeEach(module('artApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<artwork-create></artwork-create>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the artworkCreate directive');
  }));
});
