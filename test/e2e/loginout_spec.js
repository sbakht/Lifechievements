'use strict';

describe('login', function() {

  var loc = 'http://localhost:9000/#/';

  beforeEach(function() {
    browser.get(loc);
  });

  it('should redirect to homepage when navigating to /account while logged out', function() {
    browser.get(loc + "account");
    expect(browser.getCurrentUrl()).toBe(loc);
  });

  it('should give error when entering wrong password when logging in', function() {
    element(by.css('[ng-click="login()"]')).click();
    element(by.css('[data-ng-model="loginData.userName"]')).sendKeys("tester@tester.com");
    element(by.css('[data-ng-model="loginData.password"]')).sendKeys("wrong password");
    element(by.id('login')).click();
    browser.sleep(5000);
    expect(element(by.binding('message')).getText()).toBe('Error: The specified password is incorrect.');
  });

  it('should login and redirect to account page', function() {
  	element(by.css('[ng-click="login()"]')).click();
  	element(by.css('[data-ng-model="loginData.userName"]')).sendKeys("tester@tester.com");
  	element(by.css('[data-ng-model="loginData.password"]')).sendKeys("tester");
  	element(by.id('login')).click();
    browser.sleep(5000);
  	expect(browser.getCurrentUrl()).toBe(loc + "account");
  });

  it('should redirect to homepage when user logs out', function() {
  	element(by.css('[ng-click="logout()"]')).click();
  	expect(browser.getCurrentUrl()).toBe(loc);
  });
});
