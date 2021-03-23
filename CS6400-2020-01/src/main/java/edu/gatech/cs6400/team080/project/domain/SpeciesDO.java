package edu.gatech.cs6400.team080.project.domain;

public class SpeciesDO {
    private String species;

    public SpeciesDO(String species) {
        this.species = species;

    }

    public String getSpecies(){
        return this.species;
    }

    public void setSpecies(String species){
        this.species = species;
    }
}
