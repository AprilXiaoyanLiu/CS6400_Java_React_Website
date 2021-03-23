package edu.gatech.cs6400.team080.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import edu.gatech.cs6400.team080.project.dao.AnimalVaccineMapper;
import edu.gatech.cs6400.team080.project.dao.VaccineReminderMapper;
import edu.gatech.cs6400.team080.project.domain.AnimalAvailableVacTuple;
import edu.gatech.cs6400.team080.project.domain.VaccineReminderDO;
import edu.gatech.cs6400.team080.project.domain.VaccineSpeciesDO;

@RestController
public class VaccineController {

    public static class VaccineReminderDOWithDates {
        public String first_name;
        public String last_name;
        public String username;
        public String pet_id;
        public String expiration_date;
        public String vaccine_type;
        public String surrender_date;
        public String alteration_status;
        public String sex;
        public String microchipId;
        public String breed;
        public String species;
        public Integer expiration_date_year;
        public Integer expiration_date_month;
        public Integer expiration_date_day;
        public Integer surrender_date_year;
        public Integer surrender_date_month;
        public Integer surrender_date_day;
        public VaccineReminderDOWithDates(VaccineReminderDO vaccineReminderDO) {
            this.first_name = vaccineReminderDO.first_name;
            this.last_name = vaccineReminderDO.last_name;
            this.username = vaccineReminderDO.username;
            this.pet_id = vaccineReminderDO.pet_id;
            this.expiration_date = vaccineReminderDO.expiration_date.toString();
            this.vaccine_type = vaccineReminderDO.vaccine_type;
            this.surrender_date = vaccineReminderDO.surrender_date.toString();
            this.alteration_status = vaccineReminderDO.alteration_status;
            this.sex = vaccineReminderDO.sex;
            this.microchipId = vaccineReminderDO.microchipId;
            this.breed = vaccineReminderDO.breed;
            this.species = vaccineReminderDO.species;
            this.expiration_date_year = vaccineReminderDO.expiration_date.getYear();
            this.expiration_date_month = vaccineReminderDO.expiration_date.getMonth();
            this.expiration_date_day = vaccineReminderDO.expiration_date.getDay();
            this.surrender_date_year = vaccineReminderDO.surrender_date.getYear();
            this.surrender_date_month = vaccineReminderDO.surrender_date.getMonth();
            this.surrender_date_day = vaccineReminderDO.surrender_date.getDate();
        }
    }

    private final Logger LOGGER = LoggerFactory.getLogger(VaccineController.class);

    @Autowired
    private edu.gatech.cs6400.team080.project.dao.VaccineSpeciesMapper vaccineSpeciesMapper;
    @Autowired
    private AnimalVaccineMapper animalVaccineMapper;

    @Autowired
    private VaccineReminderMapper vaccineReminderMapper;

    @RequestMapping("/vaccineSpecies")
    @CrossOrigin(origins = "http://localhost:3000")

    public List<VaccineSpeciesDO> selectAll(){
        List<VaccineSpeciesDO> result = vaccineSpeciesMapper.selectAll();
        return result;
    }

    @RequestMapping(value = "/vaccineSpecies", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public boolean insertVaccineSpecies(@RequestBody VaccineSpeciesDO vaccineSpecies) {
        boolean result = vaccineSpeciesMapper.insertVaccineType(vaccineSpecies.getSpecies(),
                vaccineSpecies.getVaccine_type(), vaccineSpecies.getRequired_for_adoption());
        return result;
    }

    @RequestMapping(value = "/animalAvailableVaccines", method = RequestMethod.GET)
    public Map<Long, List<String>> getAnimalAvailableVaccines(){
        Map<Long, List<String>> result = new HashMap<Long, List<String>>();

        List<AnimalAvailableVacTuple> tmpRes = animalVaccineMapper.getAnimalAvailableVaccinationTuples();
        for (AnimalAvailableVacTuple tuple: tmpRes) {
            result.putIfAbsent(tuple.pet_id, new ArrayList<>());
            result.get(tuple.pet_id).add(tuple.vaccine_type);
        }
        return result;
    }


    @RequestMapping(value = "/vaccineReminder", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")

    public List<VaccineReminderDOWithDates> getVaccineReminder(){
        return vaccineReminderMapper.selectAll().stream().map(e->new VaccineReminderDOWithDates(e)).collect(Collectors.toList());
    }

}
