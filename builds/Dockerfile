# ==========================================
# PART 1: Base Operating System & Essentials
# ==========================================
FROM debian:stable-slim

# Prevents installers from freezing the build waiting for user inputs
ENV DEBIAN_FRONTEND=noninteractive

# Update system package repository and install basic downloaders
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    gnupg \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# PART 2: C / C++ & Python 3
# ==========================================
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    python3 \
    python3-pip \
    && pip3 install numpy --break-system-packages \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# PART 3: Go (Golang)
# ==========================================
RUN apt-get update && apt-get install -y \
    golang-go \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# PART 4: Node.js (v22.x) & Yarn
# ==========================================
RUN curl -sL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# PART 5: Java (Oracle JDK 25)
# ==========================================
RUN wget https://download.oracle.com/java/25/latest/jdk-25_linux-x64_bin.deb \
    && apt-get update && apt-get install -y ./jdk-25_linux-x64_bin.deb \
    && rm ./jdk-25_linux-x64_bin.deb \
    && rm -rf /var/lib/apt/lists/*

# ==========================================
# PART 6: Cleanup Build Utilities
# ==========================================
RUN apt-get purge -y wget curl gnupg && apt-get autoremove -y

# ==========================================
# PART 7: App Setup & Workspace
# ==========================================
WORKDIR /usr/src/Docker
COPY . /usr/src/Docker

RUN yarn install
RUN mkdir Files
EXPOSE 8000
CMD ["yarn", "start"]
