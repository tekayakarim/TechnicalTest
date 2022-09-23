const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();

  await page.goto('https://www.goodreads.com/choiceawards/best-books-2020', {
    waitUntil: 'networkidle2',
  });

  const productsHandles = await page.$$(
    ".clearFix"
  );
console.log(productsHandles);
let allelements=false;
let i=0;

  for (const producthandle of productsHandles) {
    let category = "Null";
    try {
      category = await page.evaluate(
        (el) => el.querySelector(" div > div > a > h4").textContent,
        producthandle
      );
      console.log(category);
    } catch (error) {
      console.error(error);
    }

   
}
  await browser.close();
})();



