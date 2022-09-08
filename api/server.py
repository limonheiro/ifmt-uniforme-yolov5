from typing import List, Optional
from fastapi import FastAPI, Request, Form, File, UploadFile
from fastapi.templating import Jinja2Templates
from fastapi.responses import StreamingResponse
import uvicorn
import argparse

from pathlib import Path
import cv2
import numpy as np

import torch
import base64

from yolov5_.detect import run

app = FastAPI()
templates = Jinja2Templates(directory = 'templates')


color = (0,200,0) #for bbox plotting

##############################################
#-------------GET Request Routes--------------
##############################################
@app.get("/")
def home(request: Request):

    return templates.TemplateResponse('home.html', {"request": request,})


@app.get("/about/")
def about_us(request: Request):
    '''
    Display about us page
    '''

    return templates.TemplateResponse('about.html', {"request": request})


##############################################
#------------POST Request Routes--------------
##############################################
@app.post("/")
async def detect_via_web_form(request: Request,
                            file_list: List[UploadFile] = File(...),
                            ):
    
    '''
    Requires an image file upload, model name (ex. yolov5s). Optional image size parameter (Default 640).
    Intended for human (non-api) users.
    Returns: HTML template render showing bbox data and base64 encoded image
    '''

    model = torch.hub.load('yolov5_', 'custom', path='yolov5_/best.pt', force_reload=True, source='local')
    #assume input validated properly if we got here


    img_batch = [cv2.imdecode(np.fromstring(await file.read(), np.uint8), cv2.IMREAD_COLOR)
                    for file in file_list]

    #create a copy that corrects for cv2.imdecode generating BGR images instead of RGB
    #using cvtColor instead of [...,::-1] to keep array contiguous in RAM
    img_batch_rgb = [cv2.cvtColor(img, cv2.COLOR_BGR2RGB) for img in img_batch]

    results = model(img_batch_rgb, size = 640)

    json_results = results_to_json(results,model)

    img_str_list = []
    #plot bboxes on the image
    for img, bbox_list in zip(img_batch, json_results):
        for bbox in bbox_list:
            label = f'{bbox["class_name"]} {bbox["confidence"]:.2f}'
            plot_one_box(bbox['bbox'], img, label=label, 
                    color=color, line_thickness=1)

        img_str_list.append(base64EncodeImage(img))

    #escape the apostrophes in the json string representation
    encoded_json_results = str(json_results).replace("'",r"\'").replace('"',r'\"')

    return templates.TemplateResponse('show_results.html', {
            'request': request,
            'bbox_image_data_zipped': zip(img_str_list,json_results), #unzipped in jinja2 template
            'bbox_data_str': encoded_json_results,
        })
    
@app.post("/video")
async def video(request: Request, file: UploadFile = File(...)):
       
    content = await file.read()
    
    if(len(content)>2000000):
        return "Apenas aquivos menores que 1,3MB."
    
    file_name = file.filename
    dir = Path("infer")
    
    dir_input = dir / "input" / file_name
    dir_output = dir / "output"
    file_output = dir_output / file_name
    
    with open(dir_input, "wb") as f:
        f.write(content)
        
    run(weights="yolov5_/best.pt", source=dir_input, project=dir_output,  name="", exist_ok=True, line_thickness=1)

    async def iterfile(file_output):  # 
        with open(file_output, mode="rb") as file_like:  # 
            yield file_like.read()  # 

    return StreamingResponse(iterfile(file_output), headers={'Content-Disposition': f'attachment; filename="{file_name}"'})
    
    
##############################################
#--------------Helper Functions---------------
##############################################

def results_to_json(results, model):
    ''' Converts yolo model output to json (list of list of dicts)'''
    return [
                [
                    {
                    "class": int(pred[5]), #class
                    "class_name": model.model.names[int(pred[5])],
                    "bbox": [int(x) for x in pred[:4].tolist()], #convert bbox results to int from float
                    "confidence": float(pred[4]),
                    }
                for pred in result
                ]
            for result in results.xyxy
            ]


def plot_one_box(x, im, color=(50, 250, 50), label=None, line_thickness=2):
    # Directly copied from: https://github.com/ultralytics/yolov5/blob/cd540d8625bba8a05329ede3522046ee53eb349d/utils/plots.py
    # Plots one bounding box on image 'im' using OpenCV
    assert im.data.contiguous, 'Image not contiguous. Apply np.ascontiguousarray(im) to plot_on_box() input image.'

    tl = line_thickness or round(0.02 * (im.shape[0] + im.shape[1]) / 2) + 1  # line/font thickness
    c1, c2 = (int(x[0]), int(x[1])), (int(x[2]), int(x[3]))
    cv2.rectangle(im, c1, c2, color, thickness=tl, lineType=cv2.LINE_AA)
    if label:
        tf = max(tl - 1, 1)  # font thickness
        t_size = cv2.getTextSize(label, 0, fontScale=tl / 3, thickness=tf)[0]
        c2 = c1[0] + t_size[0], c1[1] - t_size[1] - 3
        cv2.rectangle(im, c1, c2, color, -1, cv2.LINE_AA)  # filled
        cv2.putText(im, label, (c1[0], c1[1] - 2), 0, tl / 3, [225, 255, 255], thickness=tf, lineType=cv2.LINE_AA)


def base64EncodeImage(img):
    ''' Takes an input image and returns a base64 encoded string representation of that image (jpg format)'''
    _, im_arr = cv2.imencode('.jpg', img)
    im_b64 = base64.b64encode(im_arr.tobytes()).decode('utf-8')

    return im_b64

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--host', default = 'localhost')
    parser.add_argument('--port', default = 8000)
    # parser.add_argument('--gpu', action='store_false', help="Choise GPU instance")
    opt = parser.parse_args()
    
    
    app_str = 'server:app' #make the app string equal to whatever the name of this file is
    uvicorn.run(app_str, host= opt.host, port=opt.port, reload=True)
