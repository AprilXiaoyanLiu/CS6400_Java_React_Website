package edu.gatech.cs6400.team080.project.controller;

import java.util.Map;
import org.apache.commons.collections4.map.LRUMap;

public class PetIdSynchronizer {
    private static class PetIdSynchronizerObjectInitializer {
        public final Long pet_id;
        public PetIdSynchronizerObjectInitializer(long pet_id) {
            this.pet_id = pet_id;
        }
        public String toString() {
            return pet_id.toString();
        }
    }
    private static final Map<Long, Object> cache = new LRUMap<>();

    public static synchronized final Object getPetIdSynchronizer(long pet_id) {
        cache.put(pet_id, new PetIdSynchronizerObjectInitializer(pet_id));
        return cache.get(pet_id);
    }
}