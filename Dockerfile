FROM nvidia/cuda:11.7.0-runtime-ubuntu22.04
ARG DEBIAN_FRONTEND=noninteractive
ARG USERNAME=user_docker_api
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt update &&\
    apt install --no-install-recommends -y -qq build-essential &&\
    apt install --no-install-recommends -y -qq  git ffmpeg libsm6 libdbus-glib-1-dev libxext6 python3 python3-distutils-extra python3-apt python3-dev python3-pip python3-setuptools python3-distutils && \
    apt install -y -qq libcairo2 pkg-config libcairo2-dev libgirepository1.0-dev  &&\
    apt-get install -y sudo &&\
    apt clean && rm -rf /var/lib/apt/lists/*


# Create the user
RUN groupadd --gid $USER_GID $USERNAME &&\
     useradd --uid $USER_UID --gid $USER_GID -m $USERNAME &&\
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
     apt-get update &&\
     echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME &&\
     chmod 0444 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME

WORKDIR /api
COPY /api/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt \
    pip install torch torchvision torchaudio  --pre --extra-index-url https://download.pytorch.org/whl/cu116
COPY /api .
# RUN git clone https://github.com/ultralytics/yolov5.git
# RUN pip install --no-cache-dir --upgrade -r yolov5/requirements.txt 
# ENTRYPOINT cp best.pt /yolov5/
EXPOSE 8000