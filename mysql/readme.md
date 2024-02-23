step 1 : docker build -t my-mysql-image .

step 2 : docker run -d --name my-mysql-container -p 3306:3306 my-mysql-image

starting_mysql : docker start my-mysql-container
