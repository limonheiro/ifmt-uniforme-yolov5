import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from tqdm import tqdm
from bs4 import BeautifulSoup
import time
import urllib.request

h = {
    'User-Agent': 'Mozilla/5.0'
    }

browser = webdriver.Firefox()
links = []

with open('links') as f:
    file = f.readlines()

with open('site02.links', 'w', errors='ignore') as s:    
    for f in tqdm(file):
            try:
                
                #r = requests.get(f, stream=True, headers=h)
                #time.sleep(3)
                #soup = BeautifulSoup(r.text, 'html.parser')
                #t =  soup.find('title')
                #The link you followed may be broken, or the page may have been removed.
                #if "IFMT" in str(t):
                browser.get(f)
                link = browser.find_element(By.XPATH,"/html/body/div[1]/div/div[3]/div[1]/div/div/div[5]/div[1]/div/div/div[1]/div/div/div[2]/span/div/span/a").get_attribute('href')
                if link:
                    filename = './fotos01/'+link.split('/')[-1].split('?')[0]
                    urllib.request.urlretrieve(link, filename)
                    s.write(link+'\n')
                time.sleep(5)
            except selenium.common.exceptions.NoSuchElementException:
                continue
