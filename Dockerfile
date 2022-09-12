FROM nvidia/cuda:11.7.0-runtime-ubuntu22.04
ARG DEBIAN_FRONTEND=noninteractive
ARG USERNAME=user_docker_api
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt-get update &&\
    apt-get install --no-install-recommends -y -qq \
    build-essential \
    git \
    ffmpeg \
    x264 \
    libx264-dev \
    libsm6 \
    libdbus-glib-1-dev \
    libxext6 \
    python3 \
    python3-distutils-extra \
    python3-apt \
    python3-dev \
    python3-pip \
    python3-setuptools \ 
    python3-distutils \
    libcairo2 \
    pkg-config \
    libcairo2-dev \
    libgirepository1.0-dev \
    sudo \
&& rm -rf /var/lib/apt/lists/*


# Create the user
RUN groupadd --gid $USER_GID $USERNAME &&\
    useradd --uid $USER_UID --gid $USER_GID -m $USERNAME --shell /bin/bash &&\
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME &&\
    pip install pipenv --user   &&\
    chmod 0444 /etc/sudoers.d/$USERNAME

ENV PATH=$PATH:/home/$USERNAME/.local/bin 

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME

WORKDIR /home/$USERNAME/api
COPY /api/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt \
    pip install --no-cache-dir torch torchvision torchaudio  --pre --extra-index-url https://download.pytorch.org/whl/cu116
COPY /api .

USER root
RUN chmod 777 /home/$USERNAME/api/infer/* 
# RUN git clone https://github.com/ultralytics/yolov5.git
# RUN pip install --no-cache-dir --upgrade -r yolov5/requirements.txt 
# ENTRYPOINT cp best.pt /yolov5/
USER $USERNAME
EXPOSE 8000