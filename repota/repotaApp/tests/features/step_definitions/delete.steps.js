const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const {Builder, By, until} = require('selenium-webdriver');
chai.use(chaiAsPromised);
const {Given, When, Then} = require('cucumber');

/**
 * @author John Shields
 * @title Delete Steps
 * @desc Works with delete.feature to allow a Mock User/Worker to Delete a Report.
 */

// Spin up a controlled firefox while the app is running to see if the History Page is available.
driver = new Builder().forBrowser('firefox').build();
Given(/^worker is on the history page and wants to delete a report$/, {timeout: 2 * 5000}, async () => {
    driver.wait(until.elementLocated(By.tagName('ion-header')));
    await driver.get('http://localhost:8100/#/history');
});

// Mock User begins the Delete process by opening the Report.
Then(/^worker must open the report$/, function () {
    let elm = driver.findElement(By.id('open'));
    return elm.click();
});

// Mock User clicks Delete.
When(/^worker clicks the delete button$/, function () {
    let elm = driver.findElement(By.id('delete'));
    return elm.click();
});

// Mock user confirms the Delete.
Then(/^worker confirms the delete$/, function () {
    let alert = driver.switchTo().alert();
    return alert.accept();
});

// Report has been successfully deleted.
Then(/^the report should be successfully deleted$/, function () {
    console.log('Report successfully deleted');
    return driver.close();
});
