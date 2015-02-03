##############################################################
##
##
##  Taiga-front
##
##
###############################################################


FROM debian:wheezy

MAINTAINER Clayton Santos da Silva "clayton@xdevel.com.br"



RUN apt-get update && apt-get install -y nginx

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

VOLUME ["/usr/share/nginx/html"]
VOLUME ["/etc/nginx"]
VOLUME ["/var/log/nginx"]

RUN echo "alias ll='ls -atrhlF'" >> ~/.bashrc


COPY dist /usr/local/nginx/html
COPY taiga.conf /etc/nginx/sites-enabled/default
WORKDIR /usr/local/nginx/html
ENV PATH /usr/local/nginx/sbin:$PATH


EXPOSE 80 8000

CMD ["nginx", "-g", "daemon off;"]
