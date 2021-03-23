package edu.gatech.cs6400.team080.project.domain;

public class VaccineSpeciesDO {
	private String species;
	private String vaccine_type;
	private Boolean required_for_adoption;
	
	public VaccineSpeciesDO(String species, String vaccine_type, Boolean required_for_adoption) {
		this.species = species;
		this.vaccine_type = vaccine_type;
		this.required_for_adoption = required_for_adoption;
	}

	public String getSpecies() {
		return this.species;
	}

	public String getVaccine_type() {
		return this.vaccine_type;
	}

	public Boolean getRequired_for_adoption(){
		return this.required_for_adoption;
	}
}
