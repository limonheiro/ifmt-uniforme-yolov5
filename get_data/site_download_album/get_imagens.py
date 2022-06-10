import requests
from bs4 import BeautifulSoup
import re
import os
from tqdm import tqdm 

pre = "https://cba.ifmt.edu.br"
galeria =[]
urls =[
    'https://cba.ifmt.edu.br/conteudo/galerias/',
    'https://cba.ifmt.edu.br/conteudo/galerias/?page=2'
    ]

# Coletando as paginas galeria

for url in urls:
    page = requests.get(url)
    soup = BeautifulSoup(page.text, 'html.parser')
    padding =  soup.find_all(class_="padding-bottom-duplo")

    for i,p in enumerate(padding):
        img = p.find_all('img')
        if img:
            #Coletando apenas o href referente ao link da galeria de imagens
            galeria.append(pre+re.findall("\"(.*?)\"",[i for i in str(padding[i]).split('<') if 'href=' in i][0])[0] )

#extraindo fotos
fotos = []
for g in  galeria:
    g = requests.get(g)
    soup = BeautifulSoup(g.text, 'html.parser')
    pic = soup.find_all(class_="th")
    for p in pic:
        fotos.append(pre+p.get('href'))

for foto in tqdm(fotos):
    data = requests.get(foto, stream=True)
    if not os.path.isdir('../data/'):
        os.mkdir('../data/')
    with open('../data/'+foto.split('/')[-1].split('__')[0], 'wb') as ft:
        ft.write(data.content)

