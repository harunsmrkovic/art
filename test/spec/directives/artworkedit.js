'use strict';

describe('Directive: artworkEdit', function () {

  // load the directive's module
  beforeEach(module('artApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<artwork-edit></artwork-edit>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the artworkEdit directive');
  }));
});
