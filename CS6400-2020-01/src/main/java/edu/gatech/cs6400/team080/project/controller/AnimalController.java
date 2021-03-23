package edu.gatech.cs6400.team080.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import edu.gatech.cs6400.team080.project.ApplicationConfig;
import edu.gatech.cs6400.team080.project.dao.AnimalBreedMapper;
import edu.gatech.cs6400.team080.project.dao.AnimalMapper;
import edu.gatech.cs6400.team080.project.dao.AnimalVaccineMapper;
import edu.gatech.cs6400.team080.project.dao.BreedMapper;
import edu.gatech.cs6400.team080.project.dao.SurrenderMapper;
import edu.gatech.cs6400.team080.project.dao.VaccineTypeMapper;
import edu.gatech.cs6400.team080.project.domain.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import com.google.gson.Gson;

@RestController
public class AnimalController {
    public static class AnimalWithIndex {
        private Integer pet_id;
        private String pet_name;
        private int sex;
        private Integer age;
        private int alteration_status;
        private String descriptions;
        private String microchipId;
        private int species;
        private String breed;
        private int adoption_status; 
        public  AnimalWithIndex(){

        }
        public AnimalWithIndex(Animal animal) {
            this.pet_id = animal.pet_id;
            this.pet_name = animal.pet_name;
            if (animal.sex==null) {
                this.sex = SexEnum.Unknown.getKey();
            } else {
                try {
                    this.sex = SexEnum.valueOf(animal.sex.substring(0, 1).toUpperCase() + animal.sex.substring(1).toLowerCase()).getKey();
                } catch (Exception e) {
                    this.sex = SexEnum.Unknown.getKey(); 
                }
            }
            this.age = animal.age;
            this.alteration_status = AlterationStatusNumber.getInt(animal.alteration_status);
            this.descriptions = animal.descriptions;
            this.microchipId = animal.microchipId;
            if (animal.species==null) {
                this.species = SexEnum.Unknown.getKey();
            } else {

                try {
                    this.species = SpeciesEnum.valueOf(animal.species.substring(0, 1).toUpperCase() + animal.species.substring(1).toLowerCase()).getKey();
                } catch (Exception e) {
                    this.species = SexEnum.Unknown.getKey(); 
                }

            }

            this.breed = animal.breed;
            if (animal.adoption_status==null) {
                this.adoption_status = animal.adoption_status.not_adopted.getKey();
            } else {
                this.adoption_status = animal.adoption_status.getKey();

            }
        }
    }
    @Autowired
    private AnimalMapper animalMapper;
    @Autowired
    private AnimalBreedMapper animalBreedMapper;
    @Autowired
    private SurrenderMapper surrenderMapper;
    @Autowired
    private AnimalVaccineMapper animalVaccineMapper;
    @Autowired
    private VaccineTypeMapper vaccineTypeMapper;
    @Autowired
    private BreedMapper breedMapper;



    @RequestMapping(value = "/animalBreed", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean insertAnimalBreed(@RequestBody AnimalBreed animalBreed) {
        System.out.println("printing the animal breed");
        System.out.println(ApplicationConfig.gson.toJson(animalBreed));

        String speciesTmp= animalBreed.species;
        String species = "Unknown";
        SpeciesEnum [] speciesEnums = SpeciesEnum.values();
        for (SpeciesEnum speciesEnum: speciesEnums) {
            if (speciesEnum.name().toLowerCase().equals(speciesTmp.toLowerCase()) || Integer.toString(speciesEnum.getKey()).equals(speciesTmp)) {
                species = speciesEnum.name();
                break;
            }
        }

        System.out.println("species animal");
        System.out.println(species);
        
        return animalBreedMapper.insertNewAnimalBreed(animalBreed.pet_id, animalBreed.breed, species);
    }



    @RequestMapping(value = "/animal", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    public List<AnimalWithIndex> selectAll(){
        List<Animal> tmp = animalMapper.selectAll();
        List<AnimalWithIndex> result = new ArrayList<AnimalWithIndex>();
        for (Animal animal : tmp) {
            result.add(new AnimalWithIndex(animal));
        }
        return result;
    }

    @RequestMapping("/animalAllInfo")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<AnimalAllInfo> selectAllInfo(){
        List<AnimalAllInfo> result = animalMapper.selectAnimalAllInfoAll();
        return result;
    }

    
    @RequestMapping(value = "/animalAllInfo/{pet_id}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public AnimalAllInfo selectById(@PathVariable("pet_id") String pet_id){
        return animalMapper.selectAnimalAllInfoAllById(pet_id);
    }


     @RequestMapping("/animalbase")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<BaseAnimal> selectBaseAnimal(){
        List<BaseAnimal> result = animalMapper.selectBaseAnimal();
        return result;
    }


    /*
            private Integer pet_id;
        private String pet_name;
        private int sex;
        private Integer age;
        private int alteration_status;
        private String descriptions;
        private String microchipId;
        private int species;
        private String breed;
        private int adoption_status;    


            public Long pet_id;
    public String pet_name;
    public String sex;
    public Integer age;
    public String alteration_status;
    public String descriptions;
    public String microchipId;


*/
    @RequestMapping(value = "/animalWithIndexPost", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    public boolean animalWithIndexPost(@RequestBody AnimalWithIndex animalWithIndex){
        System.out.println("animalWithIndex");
        System.out.println(animalWithIndex);
        AnimalDO animalBasePayload = new AnimalDO();
        animalBasePayload.pet_id = Long.valueOf(animalWithIndex.pet_id.toString());

        AnimalAllInfo baseAnimalInDB = animalMapper.selectAnimalAllInfoAllById(animalWithIndex.pet_id.toString());
        if (baseAnimalInDB==null) {
            throw new IllegalArgumentException("no such animal in DB, cannot update");
        }

        animalBasePayload.pet_name = animalWithIndex.pet_name.toString();

        
        animalBasePayload.sex = "unknown";
        String origSex = baseAnimalInDB.sex;
        if (!origSex.toLowerCase().equals("unknown")) {
            animalBasePayload.sex = origSex;
        } else {
            if (animalWithIndex.sex == 0) {
                animalBasePayload.sex = "female";
            }
            if (animalWithIndex.sex == 1) {
                animalBasePayload.sex = "male";
            }    
        }
        animalBasePayload.age = animalWithIndex.age;
        animalBasePayload.alteration_status = AlterationStatusNumber.getString(animalWithIndex.alteration_status);
        animalBasePayload.descriptions = animalWithIndex.descriptions;
        animalBasePayload.microchipId = animalWithIndex.microchipId;



        animalMapper.insertAnimal(
            animalBasePayload.pet_id,
            animalBasePayload.pet_name, 
            animalBasePayload.sex, 
            animalBasePayload.age, 
            animalBasePayload.alteration_status, 
            animalBasePayload.descriptions, 
            animalBasePayload.microchipId, 
            animalBasePayload.species
        );

/*
    Unknown(-1),
    Cat(0),
    Dog(1);
        private int species;
        private String breed;
        private int adoption_status;    

*/ 
        if (!baseAnimalInDB.species.equals("Unknown")) {
            return true;
        }
        String tmpSpecies = "Unknown";
        if (animalWithIndex.species == 0) {
            tmpSpecies = "Cat";
        }

        if (animalWithIndex.species == 1) {
            tmpSpecies = "Dog";
        }
        
        breedMapper.insertBreed(animalWithIndex.breed, tmpSpecies);
        animalBreedMapper.insertNewAnimalBreed(animalBasePayload.pet_id, animalWithIndex.breed, tmpSpecies);

        return true;
    }


    //@RequestMapping(value = "/animalbase", method = RequestMethod.POST)
    @RequestMapping(value = "/animal", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public synchronized boolean insertAnimal(@RequestBody AnimalDO animal){
        Long pet_id = animal.pet_id;
        String pet_name = animal.pet_name;
        Integer age = animal.age;
        String alteration_status = animal.alteration_status;
        String descriptions = animal.descriptions;
        String microchipId = animal.microchipId;
        String sex = "unknown";

        if (animal.sex.toLowerCase().equals("male")||animal.sex.toLowerCase().equals("1")) {
            sex = "male";
        }

        if (animal.sex.toLowerCase().equals("female")||animal.sex.toLowerCase().equals("0")) {
            sex = "female";
        }

        boolean result = animalMapper.insertAnimal(pet_id, pet_name, sex, age, alteration_status, descriptions, microchipId, animal.species);
        return result;
    }


    @RequestMapping(value = "/getLastInsertAnimalId", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public synchronized String getLastInsertAnimalId(){
        return animalMapper.getLastInsertAnimalId();
    }




    @RequestMapping(value = "/animalAllInfoWithVaccination", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public synchronized boolean insertAnimalAllInfoWithVaccination(@RequestBody AnimalAllInfoWithVaccinationInsert animalAllInfoWithVaccination){
        System.out.println("animalAllInfoWithVaccination");
        System.out.println(ApplicationConfig.gson.toJson(animalAllInfoWithVaccination));

        try {
            YyyyMMddToSqlTimeStamp.getTimeFromString(animalAllInfoWithVaccination.surrender_date);
            YyyyMMddToSqlTimeStamp.getTimeFromString(animalAllInfoWithVaccination.date_administered);
            YyyyMMddToSqlTimeStamp.getTimeFromString(animalAllInfoWithVaccination.expiration_date);

        } catch (Exception e) {
            throw new IllegalArgumentException("Illegal date format! Not performing insertion");
        }
        // support multiple breed
        Set<String> allVacines = vaccineTypeMapper.selectAll().stream().map(e->e.toString()).collect(Collectors.toSet());
        System.out.println("allVacines---");
        System.out.println(allVacines);
        if (!allVacines.contains(animalAllInfoWithVaccination.vaccine_type)) {
            throw new IllegalArgumentException("vaccine_type is not in DB, not performing insertion");
        }
        Gson gson = new Gson();
        String jsonStr = gson.toJson(animalAllInfoWithVaccination);
        System.out.println(jsonStr);
        String pet_name = animalAllInfoWithVaccination.pet_name;
        String sex = "unknown";

        if (animalAllInfoWithVaccination.sex.toLowerCase().equals("male")||animalAllInfoWithVaccination.sex.toLowerCase().equals("1")) {
            sex = "male";
        }

        if (animalAllInfoWithVaccination.sex.toLowerCase().equals("female")||animalAllInfoWithVaccination.sex.toLowerCase().equals("0")) {
            sex = "female";
        }


        
        Integer age = animalAllInfoWithVaccination.age;
        String alteration_status = animalAllInfoWithVaccination.alteration_status;
        String descriptions = animalAllInfoWithVaccination.descriptions;
        String microchipId = animalAllInfoWithVaccination.microchipId;
        boolean result = animalMapper.insertAnimal(null, pet_name, sex, age, alteration_status, descriptions, microchipId, animalAllInfoWithVaccination.species);
        Long lastInsertedId = Long.parseLong(animalMapper.getLastInsertAnimalId());

        synchronized (PetIdSynchronizer.getPetIdSynchronizer(lastInsertedId)) {
            String speciesTmp = animalAllInfoWithVaccination.species;
            String species = "Unknown";
            SpeciesEnum [] speciesEnums = SpeciesEnum.values();
            for (SpeciesEnum speciesEnum: speciesEnums) {
                if (speciesEnum.name().toLowerCase().equals(speciesTmp.toLowerCase()) || Integer.toString(speciesEnum.getKey()).equals(speciesTmp)) {
                    species = speciesEnum.name();
                    break;
                }
            }

            List<String> breeds = animalAllInfoWithVaccination.breed;
            for (String bd: breeds) {
                animalBreedMapper.insertNewBreedInSpecies(bd, species);
            }
            System.out.println("printing the lastInsertedId");
            System.out.println(lastInsertedId);
    
    
            for (String bd: breeds) {
                animalBreedMapper.insertNewAnimalBreed(lastInsertedId, bd, species);
            }
    
            boolean insertSurrenderInfoSuccessful = surrenderMapper.insertSurrenderInfo(
                lastInsertedId,
                animalAllInfoWithVaccination.surrender_by_animal_control, 
                animalAllInfoWithVaccination.surrender_reason, 
                YyyyMMddToSqlTimeStamp.getTimeFromString(animalAllInfoWithVaccination.surrender_date));
            
    
            boolean insertAnimalVaccineSuccessful = animalVaccineMapper.insertAnimalVaccine(
                lastInsertedId,
                animalAllInfoWithVaccination.vaccine_type,
                animalAllInfoWithVaccination.username,
                YyyyMMddToSqlTimeStamp.getTimeFromString(animalAllInfoWithVaccination.date_administered),
                YyyyMMddToSqlTimeStamp.getTimeFromString(animalAllInfoWithVaccination.expiration_date),
                animalAllInfoWithVaccination.vaccination_number
            );
            return result;
        }


    }
}
