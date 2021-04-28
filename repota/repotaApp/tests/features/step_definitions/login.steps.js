const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const {Builder, By, until} = require('selenium-webdriver');
chai.use(chaiAsPromised);
const {Given, When, Then} = require('cucumber');

/**
 * @author John Shields
 * @title Login Steps
 * @desc Works with login.feature to allow a Mock User to Login.
 */

// Spin up a controlled firefox while the app is running to see if the Login Page is available.
driver = new Builder().forBrowser('firefox').build();
Given('user navigates to the Login Page', {timeout: 2 * 5000}, async () => {
    driver.wait(until.elementLocated(By.tagName('ion-header')));
    await driver.get('http://localhost:8100/#/login');
});

// Mock User enters username into the username input box.
When(/^user enters username "([^"]*)"$/, function (username) {
    let elm = driver.findElement(By.id('username'));
    return elm.sendKeys(username);
});

// Mock User enters password into the password input box.
When(/^user enters password "([^"]*)"$/, function (password) {
    let elm = driver.findElement(By.id('password'));
    return elm.sendKeys(password);
});

// Finally Mock User clicks the login button.
Then(/^user clicks the login button$/, function () {
    let elm = driver.findElement(By.id('login-btn'));
    return elm.click();
});

// Mock User has been logged in.
Then('user should be successfully logged in', function () {
    console.log('User successfully Logged in');
    return driver.close();
});
