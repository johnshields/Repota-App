const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const {Builder, By, until} = require('selenium-webdriver');
chai.use(chaiAsPromised);
const {Given, When, Then} = require('cucumber');

/**
 * @author John Shields
 * @title Register Steps
 * @desc Works with register.feature to allow a Mock User to register.
 */

// Spin up a controlled firefox while the app is running to see if the Register Page is available.
driver = new Builder().forBrowser('firefox').build();
Given(/^new user navigates to the Register Page$/, {timeout: 2 * 5000}, async () => {
    driver.wait(until.elementLocated(By.tagName('ion-header')));
    await driver.get('http://localhost:8100/#/register');
});

// Mock User enters username into the username input box.
When(/^new user enters username "([^"]*)"$/, function (username) {
    let elm = driver.findElement(By.id('username'));
    return elm.sendKeys(username);
});

// Mock User enters name into the name input box.
When(/^new user enters name "([^"]*)"$/, function (name) {
    let elm = driver.findElement(By.id('name'));
    return elm.sendKeys(name);
});

// Mock User enters password into the password input box.
When(/^new user enters password "([^"]*)"$/, function (password) {
    let elm = driver.findElement(By.id('password'));
    return elm.sendKeys(password);
});

// Finally Mock User clicks the register button.
Then(/^user clicks the register button$/, function () {
    let elm = driver.findElement(By.id('register-btn'));
    return elm.click();
});

// Mock User has been registered.
Then(/^user should be successfully registered$/, function () {
    console.log('New User successfully Registered');
    return driver.close();
});
