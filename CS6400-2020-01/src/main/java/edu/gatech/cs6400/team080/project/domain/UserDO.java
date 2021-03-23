package edu.gatech.cs6400.team080.project.domain;
import java.io.Serializable;
import java.sql.Timestamp;
import edu.gatech.cs6400.team080.project.domain.UserType;


public class UserDO implements Serializable{
    private String username;
    private String first_name;
    private String last_name;
    private String email_address;

    private String password;
    private Timestamp start_date;
    private UserType usertype;

    public UserType getUsertype () {
        return this.usertype;
    }

    public String getPassword() {
        return this.password;
    }

	public String getUsername() {
		return this.username;
	}


    public String getFirst_name() {
        return this.first_name;
    }


    public String getLast_name() {
        return this.last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getEmail_address() {
        return this.email_address;
    }

    public Timestamp getStart_date() {
        return this.start_date;
    }

    
}