create database med;
use med

CREATE TABLE olonas
(
    id INT AUTO_INCREMENT,
    nom VARCHAR(255),
    prenom VARCHAR(255),
    cin VARCHAR(255),
    date_de_naissance DATE,
    email VARCHAR(255),
    password VARCHAR(255),
    PRIMARY KEY (id) 
);