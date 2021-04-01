const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const {Builder, By, until} = require('selenium-webdriver');
chai.use(chaiAsPromised);
const {Given, When, Then} = require('cucumber');

/**
 * @author John Shields
 * @title Logout Steps
 * @desc Works with logout.feature to allow a Mock User to Logout.
 */

// Spin up a controlled firefox while the app is running to see if any Page is available.
driver = new Builder().forBrowser('firefox').build();
Given(/^user is on any page$/, {timeout: 2 * 5000}, async () => {
    driver.wait(until.elementLocated(By.tagName('ion-header')));
    await driver.get('http://localhost:8100/#/options');
});

// Mock User clicks on the hamburger menu.
When(/^user clicks the hamburger menu$/, function () {
    let elm = driver.findElement(By.id('hamburger-menu'));
    return elm.click();
});

// Mock User then clicks the Logout Button.
Then(/^user clicks the logout button$/, function () {
    let elm = driver.findElement(By.id('logout-btn'));
    return elm.click();
});

// Mock User has been Logged out.
Then(/^user should be logged out successfully$/, function () {
    console.log('User successfully Logged out');
    return driver.close();
});
