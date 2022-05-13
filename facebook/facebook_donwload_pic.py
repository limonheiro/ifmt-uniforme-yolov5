from xml.etree.ElementPath import xpath_tokenizer
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import time
from lxml import etree
import csv

h = {
    'User-Agent': 'Mozilla/5.0'
    }

file = "./linha_tempo.html"
links = []

with open(file, 'r', errors='ignore') as f:
    contents = f.readlines()

soup = BeautifulSoup(str(contents), 'html.parser')
pag_img = soup.find_all(class_="_39pi")
for p in pag_img:
    links.append(p.get("href"))

with open('links', 'w') as csvfile:
    list = csv.writer(csvfile, delimiter='\n')
    list.writerow(links)

link_picture = []

for l in links:
    g = requests.get(l, stream=True,  headers=h)
#    with open('site.html', 'w', errors='ignore') as s:
#        s.write(g.text)
    soup = BeautifulSoup(g.content, 'html.parser')
    #pic = soup.find_all(xpath_tokenizer='/html/body/div[1]/div/div[3]/div[1]/div/div/div[5]/div[1]/div/div/div[1]/div/div/div[2]/span/div/span/a')
    dom = etree.HTML(str(soup))
    print(dom.xpath('/html/body/div[1]/div/div[3]/div[1]/div/div/div[5]/div[1]/div/div/div[1]/div/div/div[2]/span/div/span/a'))
    #if len(pic) == 1:
    #    print(pic)
        #link_picture.append(pic[1].get('href'))
    break
    

for l in tqdm(link_picture):
    data = requests.get(l, stream=True, headers=h)
    with open('./fotos/'+l.split('/')[-1].split('?')[0], 'wb') as ft:
        ft.write(data.content)
    time.sleep(3)
