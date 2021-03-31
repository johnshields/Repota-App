const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const { Builder, By, until } = require('selenium-webdriver');
chai.use(chaiAsPromised);
const {Given, When, Then} = require('cucumber');

driver = new Builder().forBrowser('firefox').build();

Given('user navigates to the Login Page', {timeout: 2 * 5000}, async () => {
    driver.wait(until.elementLocated(By.tagName('ion-header')));
    await driver.get('http://localhost:8100/#/login');
});

When(/^user enters username "([^"]*)"$/, function (username) {
    let elm = driver.findElement(By.id('username'));
    return elm.sendKeys(username);
});

When(/^user enters password "([^"]*)"$/, function (password) {
    let elm = driver.findElement(By.id('password'));
    return elm.sendKeys(password);
});

Then(/^user clicks the login button$/, function () {
    let elm = driver.findElement(By.id('loginButton'));
    return elm.click()
});

Then('user should be successfully logged in to Repota', function () {
    console.log('User successfully Logged in');
    driver.close();
});
