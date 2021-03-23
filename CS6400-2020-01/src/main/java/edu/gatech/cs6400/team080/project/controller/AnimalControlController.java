package edu.gatech.cs6400.team080.project.controller;

import edu.gatech.cs6400.team080.project.dao.AnimalControlMapper;
import edu.gatech.cs6400.team080.project.dao.RescueDO;
import edu.gatech.cs6400.team080.project.domain.AnimalControlDO;
import edu.gatech.cs6400.team080.project.domain.SexEnum;
import edu.gatech.cs6400.team080.project.domain.SpeciesEnum;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.sql.Timestamp;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class AnimalControlController {

    public static class AnimalControlDOWithIndex {
        public Integer pet_id;
        public int species;
        public int sex;
        public String alteration_status;
        public String microchipId;
        public String surrender_date;
        public String breed;
        public int year;
        public int month;
        public int day;
        public AnimalControlDOWithIndex(){

        }
        public AnimalControlDOWithIndex(AnimalControlDO animalControlDO) {
            this.pet_id = animalControlDO.pet_id;
            this.species = SpeciesEnum.valueOf(animalControlDO.species).getKey();
            this.sex = SexEnum.valueOf(animalControlDO.sex.substring(0, 1).toUpperCase() + animalControlDO.sex.substring(1).toLowerCase()).getKey();
            this.microchipId = animalControlDO.microchipId;
            this.surrender_date = animalControlDO.surrender_date.toString();
            this.year = animalControlDO.surrender_date.getYear();
            this.month = animalControlDO.surrender_date.getMonth();
            this.day = animalControlDO.surrender_date.getDay();
            this.breed = animalControlDO.breed;
            this.alteration_status = animalControlDO.alteration_status;
        }
    }

    public static class RescueDOWithIndex {
        public Long pet_id;
        public int species;
        public int sex;
        public String alteration_status;
        public String microchipId;
        public String surrender_date;
        public String breed;
        public int year;
        public int month;
        public int day;
        public int rescue_days;
        public RescueDOWithIndex(){

        }
        public RescueDOWithIndex(RescueDO animalControlDO) {
            this.pet_id = animalControlDO.pet_id;
            this.species = SpeciesEnum.valueOf(animalControlDO.species).getKey();
            this.sex = SexEnum.valueOf(animalControlDO.sex.substring(0, 1).toUpperCase() + animalControlDO.sex.substring(1).toLowerCase()).getKey();
            this.microchipId = animalControlDO.microchipId;
            this.surrender_date = animalControlDO.surrender_date.toString();
            this.year = animalControlDO.surrender_date.getYear();
            this.month = animalControlDO.surrender_date.getMonth();
            this.day = animalControlDO.surrender_date.getDay();
            this.breed = animalControlDO.breed;
            this.alteration_status = animalControlDO.alteration_status;
            this.rescue_days = animalControlDO.rescue_days;
        }
    }

    @Autowired
    private AnimalControlMapper animalControlMapper;
    @RequestMapping(value = "/animalControl/{selected_month}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public List<AnimalControlDOWithIndex> getByMonth(@PathVariable("selected_month") Integer selected_month){
        return animalControlMapper.getAnimalControlSurrenderByMonth(selected_month).stream().map(e->new AnimalControlDOWithIndex(e)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/animalControl", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public List<AnimalControlDOWithIndex> getAnimalControlSurrender(){
        return animalControlMapper.getAnimalControlSurrender().stream().map(e->new AnimalControlDOWithIndex(e)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/adoptedLongRescueAnimal/{selected_month}", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public List<AnimalControlDOWithIndex> selectByMonth(@PathVariable("selected_month") Integer selected_month){
        return animalControlMapper.getAdoptedByMonth(selected_month).stream().map(e->new AnimalControlDOWithIndex(e)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/adoptedLongRescueAnimal", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public List<RescueDOWithIndex> getAdopted(){
        return animalControlMapper.getAdopted().stream().map(e->new RescueDOWithIndex(e)).collect(Collectors.toList());
    }
}
