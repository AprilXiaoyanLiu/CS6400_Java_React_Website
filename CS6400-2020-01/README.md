# CS6400-2020-01-Team080
Repository for CS6400-2020-01-Team080
Participant:
Xining Li,
Yi Zhao,
Xiaoyan Liu,
Yaguang Chen

To do the local deployment
```
docker-compose up
```

after login to the db

```
mysql -u team080 -p
use team080;
show tables;
describe VolunteerWorkHours;
```


compile the project

```
 ./gradlew clean build
```

check all users


```
curl http://localhost:8080/user/selectAll
```




And here is the limitation of MySQL

In other database implementations, we can have this.

Because we don't have this kind of trigger in mysql
We cannot ensure that the animal breed is associated with the animal's species
SAD....
``` 
CREATE TRIGGER animalSpeciesTrigger BEFORE INSERT ON AnimalBreed WHEN EXISTS 
	(SELECT * FROM Animal WHERE pet_id == NEW.pet_id AND Animal.species<>NEW.species) 
		BEGIN  SELECT RAISE(FAIL, "a special with the same ID already exists"); 
END;

```