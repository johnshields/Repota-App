const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const { Builder, By, until } = require('selenium-webdriver');
chai.use(chaiAsPromised);
const {Given, When, Then} = require('cucumber');

driver = new Builder().forBrowser('firefox').build();

Given(/^new user navigates to the Register Page$/, {timeout: 2 * 5000}, async () => {
    driver.wait(until.elementLocated(By.tagName('ion-header')));
    await driver.get('http://localhost:8100/#/register');
});

When(/^new user enters username "([^"]*)"$/, function (username) {
    let elm = driver.findElement(By.id('username'));
    return elm.sendKeys(username);
});

When(/^new user enters name "([^"]*)"$/, function (name) {
    let elm = driver.findElement(By.id('name'));
    return elm.sendKeys(name);
});

When(/^new user enters password "([^"]*)"$/, function (password) {
    let elm = driver.findElement(By.id('password'));
    return elm.sendKeys(password);
});

Then(/^user clicks the register button$/, function () {
    let elm = driver.findElement(By.id('register-btn'));
    return elm.click()
});

Then(/^user should be successfully registered$/, function () {
    console.log('New User successfully Registered');
    driver.close();
});
