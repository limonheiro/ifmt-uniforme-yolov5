from tqdm import tqdm
import time
from bs4 import BeautifulSoup
import pyautogui 
from selenium import webdriver
import curses
import os

def load_page(link=""):
    # init driver
    browser = webdriver.Firefox(executable_path='../driver/geckodriver')
    #link album
    browser.get('https://m.facebook.com/IFMT.Oficial/photos/?mt_nav=1&tab=album&album_id=290430931000276&ref=page_internal')
    
    return browser

def save_page(driver=load_page()):

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
    os.system(f"xdotool search --name '{driver.title}' | xargs xdotool windowactivate &> /dev/null")
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


def get_links(html_file="album.html"):
    with open(html_file, 'r') as al:
        page = al.readlines()

    soup = BeautifulSoup(str(page), 'html.parser')
    elements = soup.find_all(class_='_39pi')

    links = []

    for el in  elements:
        links.append(el.get('href'))

    with open('links', 'w') as f:
        f.writelines("\n".join(str(link) for link in links))


def download_pictures(file_links='links'):
    with open('links', 'r') as l:
        file = l.readlines()

    size = len(file)

    try:
        with open('pos', 'r') as p:
            pos = int(p.readline())
    except:
        pos=0

    print(f'{pos}/{size}')

    with open(file_links, 'w', errors='ignore') as s:
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
                        
                        print('A')
                        print(file[f])
                        with open(filename ,'wb') as ft:
                            ft.write(r.content)
                        time.sleep(5)
                        pos+=1
                    except:
                        with open('pos', 'w') as p:
                            p.write(str(pos))
                        break
            time.sleep(60*60)
# save_page()
get_links()
download_pictures()