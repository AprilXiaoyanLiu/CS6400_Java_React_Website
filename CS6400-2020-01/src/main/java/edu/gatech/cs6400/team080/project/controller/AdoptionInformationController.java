package edu.gatech.cs6400.team080.project.controller;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.gatech.cs6400.team080.project.dao.AdoptionInformationMapper;
import edu.gatech.cs6400.team080.project.dao.AnimalVaccineMapper;
import edu.gatech.cs6400.team080.project.dao.AnimalMapper;

import edu.gatech.cs6400.team080.project.domain.AdoptionInformationDO;
import edu.gatech.cs6400.team080.project.domain.AdoptionInformationDOInsert;
import edu.gatech.cs6400.team080.project.domain.AlterationStatusNumber;
import edu.gatech.cs6400.team080.project.domain.Animal;
import edu.gatech.cs6400.team080.project.domain.AnimalVaccineDO;
import edu.gatech.cs6400.team080.project.domain.YyyyMMddToSqlTimeStamp;

@RestController
public class AdoptionInformationController {
    public static class AdoptionInformationDOWithDates {
        public Long application_number;
        public Long pet_id;
        public String adoption_date;
        public Long adoption_fee;
        public Integer adoption_date_year;
        public Integer adoption_date_month;
        public Integer adoption_date_day;
        public AdoptionInformationDOWithDates(AdoptionInformationDO adoptionInformationDO) {
            this.application_number = adoptionInformationDO.application_number;
            this.pet_id = adoptionInformationDO.pet_id;
            this.adoption_date =adoptionInformationDO.adoption_date.toString();
            this.adoption_fee = adoptionInformationDO.adoption_fee;
            this.adoption_date_year = adoptionInformationDO.adoption_date.getYear();
            this.adoption_date_month = adoptionInformationDO.adoption_date.getMonth();
            this.adoption_date_day = adoptionInformationDO.adoption_date.getDay();
            
        }
    }
    @Autowired
    private AdoptionInformationMapper adoptionInformationMapper;

    @Autowired
    private AnimalMapper animalMapper;


    @Autowired
    private AnimalVaccineMapper animalVaccineMapper;
    @RequestMapping(value = "/adoptionInformation", method = RequestMethod.GET)
    @CrossOrigin(origins = "http://localhost:3000")

    @ResponseBody
    public List<AdoptionInformationDOWithDates> selectAll(){
        return adoptionInformationMapper.selectAll().stream().map(e->new AdoptionInformationDOWithDates(e)).collect(Collectors.toList());
    }

    @RequestMapping(value = "/adoptionInformation", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:3000")
    @ResponseBody
    public boolean insertAdoptionInformation(@RequestBody AdoptionInformationDOInsert adoptionInformationDO){

        if (adoptionInformationDO.pet_id==null) {
            return false;
        }
        Animal animalInfo = animalMapper.selectBaseAnimalById(adoptionInformationDO.pet_id);
        if (animalInfo == null) {
            return false;
        }

        if (AlterationStatusNumber.getInt(animalInfo.alteration_status)!=1) {
            return false;
        }

        List<AnimalVaccineDO> allVacines = animalVaccineMapper.selectAllVaccineOfOneAnimalByPetId(adoptionInformationDO.pet_id);
        if (allVacines==null || allVacines.size()==0) {
            return false;
        }
        synchronized (PetIdSynchronizer.getPetIdSynchronizer(adoptionInformationDO.pet_id)) {
            adoptionInformationMapper.addAdoptionInformation(
                adoptionInformationDO.application_number,
                adoptionInformationDO.pet_id,
                YyyyMMddToSqlTimeStamp.getTimeFromString(adoptionInformationDO.adoption_date),
                adoptionInformationDO.adoption_fee);
        }

        return true;

            // todo, change another table from not adopted to adopted
            // has done, because the adoptionInformation has been added

    }
}
