# FROM node:10.15.3

# # ------------------------------------------
# # install the adonis CLI
# # ------------------------------------------
# RUN npm i -g @adonisjs/cli

# # ------------------------------------------
# # change the work directory
# # ------------------------------------------
# #WORKDIR /var/www
# WORKDIR /urs/src/app

# # ------------------------------------------
# # copy our initilization file and set permissions
# # ------------------------------------------
# COPY init.sh /init.sh
# RUN chmod 755 /init.sh

# CMD ["/init.sh"]
# Base Image

FROM ubuntu:18.04

# Add a user. This is mostly for production. This disallows commands being run as root
RUN adduser --disabled-password --home=/home/ubuntu --gecos "" ubuntu
RUN echo "ubuntu ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN echo 'ubuntu:docker' | chpasswd

# We added installation for locales in order to get the correct region time. Since I am in Nigeria, Africa, 
# I set the timezone to 'Africa/Lagos'
RUN apt-get update && apt-get install -yq locales && locale-gen en_US.UTF-8 && update-locale LANG=en_US.UTF-8

RUN apt-get update && apt-get install -yq tzdata && echo "Africa/Lagos" > /etc/timezone && dpkg-reconfigure -f noninteractive tzdata

# We install git and curl in order to install node
RUN apt-get update && apt-get install -yq git curl

# Install nodeJS 10.x on the container
RUN curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh && bash nodesource_setup.sh

RUN apt-get install -yq nodejs

RUN node -v && npm -v

# Make the dir for our code, logs and set the working directory
RUN mkdir code/
WORKDIR code/

ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8

RUN mkdir -p /tmp/logs/nginx
RUN mkdir -p /tmp/logs/ogun_community

# Install Nginx and Mysql client
RUN apt-get update && apt-get install -yq systemd && apt-get install -yq nginx mysql-client

# We remove the nginx default config in order to use our own configs
RUN rm -f /etc/nginx/sites-enabled/default

# This block is to copy over a couple of config files for our setup to work correctly
COPY ./services/nginx.conf /etc/nginx/nginx.conf
COPY ./services/ogun-api.conf /etc/nginx/sites-enabled/ogun-api.conf
COPY ./services/start.sh /etc/start.sh

RUN chmod +x /etc/start.sh

COPY package.json package.json
COPY .env.example /code/.env

# Expose port 80 for nginx to be able to connect
EXPOSE 80

# Install pm2, the node modules and the AdonisJS Cli tool
RUN npm install pm2 -g && npm install

RUN npm i -g @adonisjs/cli

CMD ["/etc/start.sh"]