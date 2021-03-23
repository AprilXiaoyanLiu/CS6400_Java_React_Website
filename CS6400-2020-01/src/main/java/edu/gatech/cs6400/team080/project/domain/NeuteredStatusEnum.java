package edu.gatech.cs6400.team080.project.domain;

public enum NeuteredStatusEnum {
    not_neutered(0),
    neutered(1);
    private final int key;
    NeuteredStatusEnum(int key) {
        this.key = key;
    }

    public int getKey() {
        return this.key;
   }     

}