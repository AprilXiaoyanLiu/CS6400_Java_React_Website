package edu.gatech.cs6400.team080.project.domain;

public class AlterationStatusNumber {
    public static int getInt(String english) {
        if (english==null) return 0;
        if ("neutered".equals(english.toLowerCase()) || "spayed".equals(english.toLowerCase())) {
            return 1;
        } else {
            return 0;
        }
    }

    public static String getString(int status) {
        if (status == 1) {
            return "neutered";
        } else {
            return "not neutered";
        }
    }
}