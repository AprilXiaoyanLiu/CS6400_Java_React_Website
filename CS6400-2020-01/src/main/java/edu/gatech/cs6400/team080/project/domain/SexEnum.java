package edu.gatech.cs6400.team080.project.domain;

public enum SexEnum {
    Female(0),
    Male(1),
    Unknown(2);
    private final int key;
    SexEnum(int key) {
        this.key = key;
    }

    public int getKey() {
        return this.key;
   }     

   public static SexEnum fromKey(int key) {
        for(SexEnum type : SexEnum.values()) {
             if(type.getKey() == key) {
                  return type;
             }
        }
        return null;
   }
   
}