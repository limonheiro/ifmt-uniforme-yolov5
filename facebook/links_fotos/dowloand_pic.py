from tqdm import tqdm
import time
import sys
import urllib.request


with open(sys.argv[1], 'r', errors='ignore') as f:
    contents = f.readlines()

for l in tqdm(contents):
    filename = './fotos/'+l.split('/')[-1].split('?')[0]
    urllib.request.urlretrieve(l, filename)
    time.sleep(3)