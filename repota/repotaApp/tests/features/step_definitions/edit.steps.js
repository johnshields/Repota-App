const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const {Builder, By, until} = require('selenium-webdriver');
chai.use(chaiAsPromised);
const {Given, When, Then} = require('cucumber');

/**
 * @author John Shields
 * @title Edit Steps
 * @desc Works with edit.feature to allow a Mock User/Worker to edit a Report.
 */

// Spin up a controlled firefox while the app is running to see if the History Page is available.
driver = new Builder().forBrowser('firefox').build();
Given(/^worker is on the history page$/, {timeout: 2 * 5000}, async () => {
    driver.wait(until.elementLocated(By.tagName('ion-header')));
    await driver.get('http://localhost:8100/#/history');
});
// Mock User Opens a Report
Then(/^worker clicks on open$/, function () {
    let elm = driver.findElement(By.id('open'));
    return elm.click();
});
// Mock User wants to edit the report.
Then(/^worker clicks edit$/, function () {
    let elm = driver.findElement(By.id('edit'));
    return elm.click();
});
// Mock User/worker edits the Report's Details.
When(/^worker edits date "([^"]*)"$/, function (date) {
    let elm = driver.findElement(By.id('date'));
    return elm.sendKeys(date);
});
When(/^worker edits model "([^"]*)"$/, function (model) {
    let elm = driver.findElement(By.id('model'));
    return elm.sendKeys(model);
});
When(/^worker edits reg "([^"]*)"$/, function (reg) {
    let elm = driver.findElement(By.id('reg'));
    return elm.sendKeys(reg);
});
When(/^worker edits miles "([^"]*)"$/, function (miles) {
    let elm = driver.findElement(By.id('miles'));
    return elm.sendKeys(miles);
});
When(/^worker edits location "([^"]*)"$/, function (location) {
    let elm = driver.findElement(By.id('location'));
    return elm.sendKeys(location);
});
When(/^worker edits warranty box$/, function () {
    let elm = driver.findElement(By.id('warranty'));
    return elm.click();
});
When(/^worker edits cause "([^"]*)"$/, function (cause) {
    let elm = driver.findElement(By.id('cause'));
    return elm.sendKeys(cause);
});
When(/^worker edits correction "([^"]*)"$/, function (correct) {
    let elm = driver.findElement(By.id('correction'));
    return elm.sendKeys(correct);
});
When(/^worker edits parts "([^"]*)"$/, function (parts) {
    let elm = driver.findElement(By.id('parts'));
    return elm.sendKeys(parts);
});
When(/^worker edits hours "([^"]*)"$/, function (hours) {
    let elm = driver.findElement(By.id('hours'));
    return elm.sendKeys(hours);
});
Then(/^worker edits complete box$/, function () {
    let elm = driver.findElement(By.id('complete'));
    return elm.click();
});

// Mock User has finished editing.
Then(/^worker clicks the edit button$/, function () {
    let elm = driver.findElement(By.id('edit-btn'));
    return elm.click();
});

// Report has been successfully edited.
Then(/^a report should be successfully edited$/, function () {
    console.log('Report successfully edited');
    return driver.close();
});
