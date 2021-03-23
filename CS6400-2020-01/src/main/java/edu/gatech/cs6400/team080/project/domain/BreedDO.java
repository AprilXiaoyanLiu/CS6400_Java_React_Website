package edu.gatech.cs6400.team080.project.domain;

public class BreedDO {
    private String breed;
    private String species;

    public BreedDO(String species, String breed) {
        this.species = species;
        this.breed = breed;

    }

    public String getSpecies(){
        return this.species;
    }

    public void setSpecies(String species){
        this.species = species;
    }

    public String getBreed(){
        return this.breed;
    }

    public void setBreed(){
        this.breed = breed;
    }
}
