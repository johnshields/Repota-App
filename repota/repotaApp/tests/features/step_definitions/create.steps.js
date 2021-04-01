const chai = require("chai");
const chaiAsPromised = require('chai-as-promised');
const {Builder, By, until} = require('selenium-webdriver');
chai.use(chaiAsPromised);
const {Given, When, Then} = require('cucumber');

/**
 * @author John Shields
 * @title Create Steps
 * @desc Works with create.feature to allow a Mock User/Worker to create a Report.
 */

// Spin up a controlled firefox while the app is running to see if the Create Page is available.
driver = new Builder().forBrowser('firefox').build();
Given(/^worker is on the create page$/, {timeout: 2 * 5000}, async () => {
    driver.wait(until.elementLocated(By.tagName('ion-header')));
    await driver.get('http://localhost:8100/#/create');
});

// Mock User/worker fills in the Report's Details.
When(/^worker types in date "([^"]*)"$/, function (date) {
    let elm = driver.findElement(By.id('date'));
    return elm.sendKeys(date);
});
When(/^worker types in model "([^"]*)"$/, function (model) {
    let elm = driver.findElement(By.id('model'));
    return elm.sendKeys(model);
});
When(/^worker types in reg "([^"]*)"$/, function (reg) {
    let elm = driver.findElement(By.id('reg'));
    return elm.sendKeys(reg);
});
When(/^worker types in miles "([^"]*)"$/, function (miles) {
    let elm = driver.findElement(By.id('miles'));
    return elm.sendKeys(miles);
});
When(/^worker types in location "([^"]*)"$/, function (location) {
    let elm = driver.findElement(By.id('location'));
    return elm.sendKeys(location);
});
When(/^worker checks the warranty box$/, function () {
    let elm = driver.findElement(By.id('warranty'));
    return elm.click();
});
When(/^worker types in customer name "([^"]*)"$/, function (customerName) {
    let elm = driver.findElement(By.id('customerName'));
    return elm.sendKeys(customerName);
});
When(/^worker types in complaint "([^"]*)"$/, function (complaint) {
    let elm = driver.findElement(By.id('complaint'));
    return elm.sendKeys(complaint);
});
When(/^worker types in cause "([^"]*)"$/, function (cause) {
    let elm = driver.findElement(By.id('cause'));
    return elm.sendKeys(cause);
});
When(/^worker types in correction "([^"]*)"$/, function (correct) {
    let elm = driver.findElement(By.id('correction'));
    return elm.sendKeys(correct);
});
When(/^worker types in parts "([^"]*)"$/, function (parts) {
    let elm = driver.findElement(By.id('parts'));
    return elm.sendKeys(parts);
});
When(/^worker types in hours "([^"]*)"$/, function (hours) {
    let elm = driver.findElement(By.id('hours'));
    return elm.sendKeys(hours);
});
Then(/^worker checks the complete box$/, function () {
    let elm = driver.findElement(By.id('complete'));
    return elm.click();
});

// Mock User has finished filling out the Report.
Then(/^worker clicks the create button$/, function () {
    let elm = driver.findElement(By.id('create-btn'));
    return elm.click();
});

// A new Report has been successfully created.
Then(/^a report should be successfully created$/, function () {
    console.log('Report successfully created');
    return driver.close();
});
