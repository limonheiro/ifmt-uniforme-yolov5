import string
from tqdm import tqdm
import time
from bs4 import BeautifulSoup
import pyautogui 
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
import curses
import os
import requests

def save_page(link : string, driver_firefox_path :string) -> webdriver:

    #convert desktop link to mobile
    link = link.replace('https://www','https://m')
    # init driver
    s = Service(driver_firefox_path)
    driver = webdriver.Firefox(service=s)
    #link album
    driver.get(link)

    shell = curses.initscr()
    shell.addstr(0, 0, "Pressione 'q' no terminal para salvar a página quando ela completar de carregar\n")
    shell.nodelay(True)
    curses.cbreak()


    while True:
        if shell.getch() == 113:
            break
        else:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    curses.nocbreak()
    curses.endwin()

    #save page
    # open 'Save as...' to save html and assets
    url = driver.current_url
    os.system(f"xdotool search --name '{driver.title}' | xargs xdotool windowactivate > /dev/null")
    os.system('pwd > /tmp/path')
    with open ('/tmp/path') as tpm:
        path = tpm.readline()
    print(path)
    time.sleep(1)


    pyautogui.hotkey('ctrl', 's')
    time.sleep(1)
    pyautogui.typewrite('album')

    shell = curses.initscr()
    shell.addstr(0, 0, "Pressione 'q' no terminal quando o download da página estiver completo\n")
    shell.nodelay(True)
    curses.cbreak()

    while True:
        if shell.getch() == 113:
            break
    curses.nocbreak()
    curses.endwin()


def get_links(html_file="album.html" ) -> None:
    with open(html_file, 'r') as al:
        page = al.readlines()

    soup = BeautifulSoup(str(page), 'html.parser')
    elements = soup.find_all(class_='_39pi')

    links = []

    for el in  elements:
        links.append(el.get('href'))

    with open('links', 'w') as f:
        f.writelines("\n".join(str(link) for link in links))


def download_pictures(file_links='links') -> None:
    with open(file_links, 'r') as l:
        file = l.readlines()

    size = len(file)

    try:
        with open('pos', 'r') as p:
            pos = int(p.readline())
    except:
        pos=0

    print(f'{pos}/{size}')

    with open('site.links', 'w', errors='ignore') as s:
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
                        if not os.path.isdir('fotos'):
                            os.mkdir('fotos')
                        filename = './fotos/'+link.split('/')[-1].split('?')[0]
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
