import {JSDOM} from 'jsdom';
import fetch from 'node-fetch';


const url = 'https://www.family.com.tw/Marketing/storemap/?v=1';
const userAgent = 'Mozilla/5.0 ( fake os ; Arm128)';

async function fetchHtml(url, userAgent) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': userAgent
    }
  });
  const html = await response.text();
  return html;
}

export async function parseHtmlToJSON() {
  try {
    const html = await fetchHtml(url, userAgent);

    const { window } = new JSDOM(html);
    const document = window.document;
    
    const list = [];

    const h3Elements = document.querySelectorAll('#accordion h3');
    // [{ "name": "LCoffee", "displayName": "咖啡複合店", "category": "複合店" },... ]

    h3Elements.forEach(h3Element => {
      const categoryName = h3Element.textContent.trim();
      
      const liElements = h3Element.nextElementSibling.querySelectorAll('ul > li');
      liElements.forEach(liElement => {
        const itemText = liElement.textContent.trim();
        const checkbox = liElement.querySelector('input[name="specialItem"]');
        const itemName = checkbox.value.toString().toLocaleLowerCase();
        
        list.push({name: itemName, displayName: itemText, category: categoryName});
      });
    });

    return list;
  } catch (error) {
    throw error;
  }
};
