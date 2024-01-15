const { Builder, By } = require("selenium-webdriver");
const assert = require("assert");

(async function test() {
    let n = 2;
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        //LOGIN
        await driver.get('http://localhost:5173/login');
        await driver.findElement(By.id("login-input")).sendKeys("admin");
        await driver.findElement(By.id("login-button")).click();
        await driver.sleep(2000);

        let accountNameElement = await driver.findElement(By.id("login"));
        let accountName = await accountNameElement.getText();
        assert.ok(accountName.includes('admin'), "Некорректный вход");

        //BUY
        let balanceElement = await driver.findElement(By.id("balance"))
        if (balanceElement === "Нет торгов"){
            await driver.sleep(2000);
        }
        let startBalance = (await balanceElement.getText()).split(" ").pop();


        //open dialog
        let buy_buttons = await driver.findElements(By.id('buyButton'));
        let firstBuyButton = buy_buttons[0];
        let isDisabled = await firstBuyButton.getAttribute('disabled');
        if (isDisabled) {
            await driver.sleep(2000);
        }
        await firstBuyButton.click();
        await driver.sleep(1000);


        // fill dialog
        let quantityInput = await driver.findElement(By.id('dialogInputQuantity'))
        quantityInput.clear()
        quantityInput.sendKeys(n)

        //buy stock
        let orderButton = await driver.findElement(By.id('dialogOrderButton'))
        isDisabled = await orderButton.getAttribute('disabled');
        if (isDisabled) {
            await driver.sleep(2000);
        }
        let priceTag = await driver.findElement(By.id('dialogStockPrice'))
        let stockPrice = parseFloat((await priceTag.getText()).split(" ").pop())
        orderButton.click()
        await driver.sleep(1000);

        let newBalance = (await balanceElement.getText()).split(" ").pop();
        let stockTotalPrice = stockPrice * n;
        console.log(startBalance, newBalance,  stockTotalPrice)
        assert.ok(Math.abs(parseFloat(newBalance) + stockTotalPrice - parseFloat(startBalance)) <= 0.02, "Некорректная покупка");
        await driver.sleep(10000)

        //SELL
        startBalance = (await balanceElement.getText()).split(" ").pop();

        //open dialog sell
        let sell_buttons = await driver.findElements(By.id('sellButton'));
        let firstSellButton = sell_buttons[0];
        isDisabled = await firstSellButton.getAttribute('disabled');
        if (isDisabled) {
            await driver.sleep(2000);
        }
        await firstSellButton.click();
        await driver.sleep(1000);

        quantityInput = await driver.findElement(By.id('dialogInputQuantity'))
        quantityInput.clear()
        quantityInput.sendKeys(n)

        orderButton = await driver.findElement(By.id('dialogOrderButton'))
        isDisabled = await orderButton.getAttribute('disabled');
        if (isDisabled) {
            await driver.sleep(2000);
        }
        priceTag = await driver.findElement(By.id('dialogStockPrice'))
        stockPrice = parseFloat((await priceTag.getText()).split(" ").pop())
        orderButton.click()
        await driver.sleep(1000);

        newBalance = (await balanceElement.getText()).split(" ").pop();
        stockTotalPrice = stockPrice * n;

        console.log(startBalance, newBalance,  stockTotalPrice)
        assert.ok(Math.abs(parseFloat(newBalance) - stockTotalPrice - parseFloat(startBalance)) <= 0.02, "Некорректная продажа");
    } catch (error) {
        console.error("Error:", error);
    } finally {
        await driver.quit();
    }
})();