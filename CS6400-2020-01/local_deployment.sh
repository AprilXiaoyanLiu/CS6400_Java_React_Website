docker rm team080-mysql -f
docker build -t team080-mysql .
docker run -d -p 3307:3306 -p 8081:8080 --name team080-mysql -e MYSQL_ROOT_PASSWORD=password team080-mysql
