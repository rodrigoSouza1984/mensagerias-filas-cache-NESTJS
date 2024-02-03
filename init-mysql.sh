#!/bin/bash

# Esperar até que o MySQL esteja pronto para aceitar conexões
until docker exec mysql-container mysqladmin ping -h localhost -u root -p123456; do
    >&2 echo "MySQL is unavailable - sleeping"
    sleep 1
done

# Executar o comando SQL para criar o banco de dados
docker exec -i mysql-container mysql -u root -p123456 -e "CREATE DATABASE IF NOT EXISTS pub_sub_com_redis;"