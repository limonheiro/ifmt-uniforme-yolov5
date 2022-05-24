from tqdm import tqdm
import time
import ssl
from bs4 import BeautifulSoup

import requests

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

h = {
    'User-Agent': 'Mozilla/5.0'
    }

#browser = webdriver.Firefox()
links = []

xpathselector = "/html/body/div[1]/div/div[3]/div[1]/div/div/div[5]/div[1]/div/div/div[1]/div/div/div[2]/span/div/span/a"

with open('links') as f:
    file = f.readlines()

size = len(file)

try:
    with open('pos', 'r') as p:
        pos = int(p.readline())
except:
    pos=0

print(f'{pos}/{size}')

with open('site02.links', 'w', errors='ignore') as s:
    while True:    
        for f in tqdm(range(pos,size)):
                #browser.get(f)
                #link = browser.find_element(By.XPATH,"/html/body/div[1]/div/div[3]/div[1]/div/div/div[5]/div[1]/div/div/div[1]/div/div/div[2]/span/div/span/a").get_attribute('href')
                try:
                    r = requests.get(file[f])
                    soup = BeautifulSoup(r.content, 'html.parser')

                    l = soup.select('span._2vja > a:nth-child(1)')
                    link = str(l).split()[2].split('href=')[-1].replace('amp;','').replace("\"","")
                    time.sleep(5)
                    
                    filename = './fotos01/'+link.split('/')[-1].split('?')[0]
                    r = requests.get(link, stream=True)
                    
                    with open(filename ,'wb') as ft:
                        ft.write(r.content)
                    time.sleep(5)
                    pos+=1
                except:
                    with open('pos', 'w') as p:
                        p.write(str(pos))
                    break
        time.sleep(60*60)