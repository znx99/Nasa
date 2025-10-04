import { Builder, By } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";
import fs from "fs";
import csv from "csv-parser";

async function scrapeWithSelenium() {
  const links = [];

  // Lê o CSV e extrai a segunda coluna
  await new Promise((resolve, reject) => {
    fs.createReadStream("dados.csv")
      .pipe(csv({ headers: false, separator: "," }))
      .on("data", (row) => {
        const link = row["1"]?.trim();
        if (link) {
          links.push(link);
        }
      })
      .on("end", resolve)
      .on("error", reject);
  });

  console.log("Links extraídos:", links);

  const resultados = [];

  // Configura o Chrome (headless)
  let options = new chrome.Options();
  //options.addArguments("--headless=new"); // se quiser ver o navegador, comente esta linha
  options.addArguments("--disable-gpu");
  options.addArguments("--no-sandbox");

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    for (let link of links) {
        if (!link.startsWith("http")) {
            console.warn("Link inválido ignorado:", link);
            continue;
        }
        resultados.push("LINK: " + link);


        console.log("Acessando:", link);
        await driver.get(link);

        const textos = await driver.findElements(By.css("p"));
        for (let texto of textos) {
            const txt = await texto.getText();
            resultados.push(txt);
        }
    }
  } finally {
    await driver.quit();
    fs.writeFileSync("paragrafos.txt", resultados.join("\n"), "utf8");
    console.log("✅ Parágrafos salvos em paragrafos.txt");
  }
}

scrapeWithSelenium();
