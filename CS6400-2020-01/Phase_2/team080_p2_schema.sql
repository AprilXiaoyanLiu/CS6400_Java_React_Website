
CREATE TABLE Animal (
    pet_id INT NOT NULL AUTO_INCREMENT,
    pet_name  VARCHAR(25),
    sex varchar(15),
    age  INT(11),
    alteration_status varchar(25),
    descriptions varchar(255),
    microchipId varchar(255),
    PRIMARY KEY (pet_id)
);


CREATE TABLE Breed (
    breed VARCHAR(255) NOT NULL ,
    species  VARCHAR(25),
    PRIMARY KEY (breed)
);


CREATE TABLE LoginUser(
    username VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email_address VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    start_date TIMESTAMP,
    usertype VARCHAR(255) NOT NULL,
    PRIMARY KEY (username)
);

CREATE TABLE AnimalBreed(
    pet_id INT(11) NOT NULL,
    breed VARCHAR(255) NOT NULL,
    FOREIGN KEY (pet_id) REFERENCES Animal(pet_id),
    FOREIGN KEY (breed) REFERENCES Breed(breed),
    PRIMARY KEY (pet_id, breed)
);

CREATE TABLE Surrender(
    surrender_id INT NOT NULL AUTO_INCREMENT,
    pet_id INT(11) NOT NULL,
    animalcontrol BOOLEAN NOT NULL DEFAULT FALSE,
    surrender_reason VARCHAR(255),
    surrender_date TIMESTAMP,

    FOREIGN KEY (pet_id) REFERENCES Animal(pet_id),
    PRIMARY KEY (surrender_id)
);

CREATE TABLE Species(

    species VARCHAR(255) NOT NULL,
    limit_num INT(11),
    PRIMARY KEY (species)
);

CREATE TABLE VaccineType (
    vaccine_type VARCHAR(255) NOT NULL,
    PRIMARY KEY (vaccine_type)
);

CREATE TABLE VaccineSpecies(
    species VARCHAR(255) NOT NULL,
    vaccine_type VARCHAR(255) NOT NULL,
    required_for_adoption BOOLEAN,
    FOREIGN KEY (species) REFERENCES Species(species),
    FOREIGN KEY (vaccine_type) REFERENCES VaccineType(vaccine_type),
    PRIMARY KEY (species, vaccine_type)
);

CREATE TABLE AnimalVaccine(
    animalvaccine_id INT NOT NULL AUTO_INCREMENT,

    pet_id INT(11) NOT NULL,
    vaccine_type VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    date_administered TIMESTAMP NOT NULL,
    expiration_date TIMESTAMP NOT NULL,
    vaccination_number INT(11),
    FOREIGN KEY (pet_id) REFERENCES Animal(pet_id),
    FOREIGN KEY (vaccine_type) REFERENCES VaccineType(vaccine_type),
    FOREIGN KEY (username) REFERENCES LoginUser(username),
    PRIMARY KEY (animalvaccine_id)
);

CREATE TABLE Volunteer(
    username VARCHAR(255),
    phone_number VARCHAR(255),
    FOREIGN KEY (username) REFERENCES LoginUser(username),
    PRIMARY KEY (username)
);


CREATE TABLE VolunteerWorkHours(
    username VARCHAR(255),
    dateWorked DATE NOT NULL,
    hoursWorked INT(11),
    FOREIGN KEY (username) REFERENCES Volunteer(username),
    PRIMARY KEY (username, dateWorked)
);


CREATE TABLE ApplicantInformation(
    application_number INT(11) NOT NULL AUTO_INCREMENT,
    applicant_first_name VARCHAR(255),
    applicant_last_name VARCHAR(255),
    coapplicant_first_name VARCHAR (255),
    coapplicant_last_name VARCHAR(255),
    street VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zipcode INT(11),
    phone_number VARCHAR(255),
    application_date TIMESTAMP,
    status VARCHAR(255),
    PRIMARY KEY (application_number)
);

CREATE TABLE Adopter(
    email VARCHAR(255) NOT NULL,
    application_number INT(11),
    PRIMARY KEY (email),
    FOREIGN KEY (application_number) REFERENCES ApplicantInformation(application_number)
);


CREATE TABLE AdoptionInformation(
    application_number INT(11) NOT NULL,
    pet_id INT(11) NOT NULL,
    adoption_date TIMESTAMP,
    adoption_fee INT(11),
    FOREIGN KEY (application_number) REFERENCES ApplicantInformation(application_number),
    FOREIGN KEY (pet_id) REFERENCES Animal(pet_id),
    PRIMARY KEY (application_number, pet_id)
);
