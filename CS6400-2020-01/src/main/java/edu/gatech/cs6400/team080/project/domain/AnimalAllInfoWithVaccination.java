package edu.gatech.cs6400.team080.project.domain;

import java.sql.Timestamp;
import java.util.List;

public class AnimalAllInfoWithVaccination {
    public Long pet_id;
    public String pet_name;
    public String sex;
    public Integer age;
    public String alteration_status;
    public String descriptions;
    public String microchipId;
    public SpeciesEnum species;
    public List<String> breed;
    public String adoption_status;
    public String surrender_reason;
    public Timestamp surrender_date;
    public Boolean surrender_by_animal_control;
	public String vaccination_type;
    public java.sql.Timestamp date_administered;
    public java.sql.Timestamp expiration_date;
    public Long vaccination_number;
    public String username;
}