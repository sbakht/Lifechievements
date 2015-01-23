'use strict';

describe('homepage', function() {

  var loc = 'http://localhost:9000/#/';
  var demoButton = element(by.id('demobutton'));

  beforeEach(function() {
    browser.get(loc);
  });

  it('should contain a button link to demo page', function() {
    expect(demoButton.getText()).toContain('Demo');
  });

  it('should click button to the demo page', function() {
  	demoButton.click();
  	expect(browser.getCurrentUrl()).toBe(loc + "demo");
  	expect(browser.getCurrentUrl()).toContain('demo');
  });

  it('should click the demo header link', function() {
  	element(by.id('demolink')).click();
  	expect(browser.getCurrentUrl()).toBe(loc + "demo");
  });

});
