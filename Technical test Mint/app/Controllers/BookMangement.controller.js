const puppeteer = require('puppeteer');


exports.findGenres= async (req, res, next) => {
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
    
  let elements=[];
    for (const producthandle of productsHandles) {
      let genre = "Null";
      try {
        genre = await page.evaluate(
          (el) => el.querySelector(" div > div > a > h4").textContent,
          producthandle
        );
        
        elements.push(genre);
        console.log(genre);
      } catch (error) {
        console.error(error);
      }
  
     
  }
  console.log(elements);
  let js={};
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    js[index]=({key:index,value:element});
  }
    await browser.close();
  res.status(200).json({js});
  };


exports.randomBook=async (req, res, next) => {

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
   try{
    choice=req.params.choice;
    console.log(choice);
    switch (choice) {
        case '1':
            await page.goto('https://www.goodreads.com/choiceawards/best-fiction-books-2020', {
                waitUntil: 'networkidle2',
              });  
              
            break;
            case '2':
                await page.goto('https://www.goodreads.com/choiceawards/best-mystery-thriller-books-2020', {
                    waitUntil: 'networkidle2',
                  });  
                  
                break;
            case '3':
                 await page.goto('https://www.goodreads.com/choiceawards/best-historical-fiction-books-2020', {
                       waitUntil: 'networkidle2',
                     });  
                      
                    break;
            case '4':
                 await page.goto('https://www.goodreads.com/choiceawards/best-fantasy-books-2020', {
                       waitUntil: 'networkidle2',
                     });  
                      
                    break;
             case '5':
                    await page.goto('https://www.goodreads.com/choiceawards/best-romance-books-2020', {
                          waitUntil: 'networkidle2',
                        });  
                         
                       break;
             case '6':
                       await page.goto('https://www.goodreads.com/choiceawards/best-science-fiction-books-2020', {
                             waitUntil: 'networkidle2',
                           });  
                            
                          break;
             case '7':
                    await page.goto('https://www.goodreads.com/choiceawards/best-horror-books-2020', {
                                waitUntil: 'networkidle2',
                              });  
                               
                             break;
             case '8':
                    await page.goto('https://www.goodreads.com/choiceawards/best-humor-books-2020', {
                           waitUntil: 'networkidle2',
                             });  
                                  
                                break;
            case '9':
                        await page.goto('https://www.goodreads.com/choiceawards/best-nonfiction-books-2020', {
                                  waitUntil: 'networkidle2',
                                });  
                                     
                                   break;
            case '10':
                 await page.goto('https://www.goodreads.com/choiceawards/best-memoir-autobiography-books-2020', {
                       waitUntil: 'networkidle2',
                     });  
                      
                    break;
            case '11':
                    await page.goto('https://www.goodreads.com/choiceawards/best-history-biography-books-2020', {
                          waitUntil: 'networkidle2',
                        });  
                         
                       break;
           case '12':
                   await page.goto('https://www.goodreads.com/choiceawards/best-science-technology-books-2020', {
                         waitUntil: 'networkidle2',
                          });  
                            
                          break;
          case '13':
                  await page.goto('https://www.goodreads.com/choiceawards/best-food-cookbooks-2020', {
                        waitUntil: 'networkidle2',
                              });  
                               
                             break;
         case '14':
                 await page.goto('https://www.goodreads.com/choiceawards/best-graphic-novels-comics-2020', {
                                   waitUntil: 'networkidle2',
                                 });  
                                  
                                break;
       case '15':
                await page.goto('https://www.goodreads.com/choiceawards/best-poetry-books-2020', {
                  waitUntil: 'networkidle2',
                                });  
                                   break;
       case '16':
               await page.goto('https://www.goodreads.com/choiceawards/best-debut-novel-2020', {
                     waitUntil: 'networkidle2',
                       });  
                     break;
         case '17':
             await page.goto('https://www.goodreads.com/choiceawards/best-young-adult-fiction-books-2020', {
                       waitUntil: 'networkidle2',
                     });    
                        break;
         case '18':
            await page.goto('https://www.goodreads.com/choiceawards/best-young-adult-fantasy-books-2020', {
                  waitUntil: 'networkidle2',
                   });     
                           break;
       case '19':
               await page.goto('https://www.goodreads.com/choiceawards/best-childrens-books-2020', {
                     waitUntil: 'networkidle2',
                       });   
                              break;
      case '20':
              await page.goto('https://www.goodreads.com/choiceawards/best-picture-books-2020', {
                    waitUntil: 'networkidle2',
                      });  
                                   
                                 break;
        default:
            console.log('choose the option from 1 to 20');
            break;
    }
}
catch(err){console.log('switch error : '+err);}
try{
let data = await page.evaluate(() => {
    //get all img titles
    var image = Array.from(
      document.querySelectorAll("a.pollAnswer__bookLink img")
    ).map((image) => image.title);
  
    // get all books links
    var link = Array.from(
      document.querySelectorAll("a.pollAnswer__bookLink ")
    ).map((link) => link.href);
   
    return {
      image,
      link
    };
  });
  
  console.log('you want to buy this book: \n'+ data.image[Math.floor(Math.random()*data.image.length)]);
 

 let position= Math.floor(Math.random()*data.image.length);
  res.status(200).json({
  key:position,
  value:data.image[position]
});
await browser.close();
}
catch(err){ res.status(404).json({ error });}

};
