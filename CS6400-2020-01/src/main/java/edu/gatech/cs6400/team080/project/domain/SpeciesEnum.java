package edu.gatech.cs6400.team080.project.domain;

public enum SpeciesEnum {
    Unknown(2),
    Cat(0),
    Dog(1);
    private Integer key;
    SpeciesEnum(int key) {
        this.key = key;
    }

    public int getKey() {
        return this.key;
   }     

   public static SpeciesEnum fromKey(int key) {
        for(SpeciesEnum type : SpeciesEnum.values()) {
             if(type.getKey() == key) {
                  return type;
             }
        }
        return null;
   }


}