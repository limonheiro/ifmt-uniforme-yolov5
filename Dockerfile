FROM nvidia/cuda:11.7.0-base-ubuntu22.04
ARG DEBIAN_FRONTEND=noninteractive
ARG USERNAME=user-name-goes-here
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN apt update && \
    apt install --no-install-recommends -y -qq build-essential software-properties-common && \
    add-apt-repository -y ppa:deadsnakes/ppa && \
    apt install --no-install-recommends -y -qq  git ffmpeg libsm6 libxext6 python3.9 python3-dev python3-pip python3-setuptools python3-distutils && \
    apt clean && rm -rf /var/lib/apt/lists/*


# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    #
    # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0444 /etc/sudoers.d/$USERNAME

# ********************************************************
# * Anything else you want to do like clean up goes here *
# ********************************************************

# [Optional] Set the default user. Omit if you want to keep the default as root.
USER $USERNAME

WORKDIR /api
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt \
    pip install torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu116
COPY /api .
# RUN git clone https://github.com/ultralytics/yolov5.git
# RUN pip install --no-cache-dir --upgrade -r yolov5/requirements.txt 
# ENTRYPOINT cp best.pt /yolov5/
EXPOSE 8000