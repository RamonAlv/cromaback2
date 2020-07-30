FROM node:10.15.3

LABEL maintainer="Stephen Afam-Osemene <stephenafamo@gmail.com>"

# ------------------------------------------
# install the adonis CLI
# ------------------------------------------
RUN npm i -g @adonisjs/cli

# ------------------------------------------
# change the working directory
# ------------------------------------------
WORKDIR /var/www

# ------------------------------------------
# copy our initialization file and set permissions
# ------------------------------------------
COPY init.sh /init.sh
RUN chmod 755 /init.sh

CMD ["/init.sh"]