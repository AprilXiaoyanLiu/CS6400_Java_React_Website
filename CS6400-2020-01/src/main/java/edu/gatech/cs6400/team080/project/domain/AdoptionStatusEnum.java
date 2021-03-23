package edu.gatech.cs6400.team080.project.domain;

public enum AdoptionStatusEnum {
    not_adopted(0),
    adopted(1);
    private final int key;
    AdoptionStatusEnum(int key) {
        this.key = key;
    }

    public int getKey() {
        return this.key;
   }     

   
}