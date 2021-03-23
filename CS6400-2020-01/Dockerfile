# Derived from official mysql image (our base image)
FROM mysql
# Add a database
ENV MYSQL_DATABASE team080

# adding the java and gradle development environment

RUN mkdir -p /usr/share/man/man1 && \
    apt-get update -y && \
    apt-get install -y openjdk-8-jdk
RUN apt-get install unzip -y && \
    apt-get autoremove -y
RUN apt-get install wget -y

RUN wget https://services.gradle.org/distributions/gradle-6.0.1-bin.zip -P /tmp
RUN unzip -d /opt/gradle /tmp/gradle-*.zip

ENV GRADLE_HOME=/opt/gradle/gradle-6.0.1
ENV PATH=$PATH:$GRADLE_HOME/bin JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64


# Add the content of the sql-scripts/ directory to your image
# All scripts in docker-entrypoint-initdb.d/ are automatically
# executed during container startup

COPY ./sql-scripts/init.sql /docker-entrypoint-initdb.d/

COPY . /cs6400
WORKDIR /cs6400
EXPOSE 8080

CMD gradle bootRun