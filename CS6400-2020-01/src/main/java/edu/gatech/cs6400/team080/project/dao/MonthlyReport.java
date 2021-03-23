
String adopted_last12month = "select ad.adoption_date, ad.pet_id, a.species, ab.breed from AdoptionInformation ad left join Animal a on ad.pet_id = a.pet_id left join  AnimalBreed ab on a.species = ab.species and a.pet_id = ab.pet_id where ad.adoption_date >= DATE_SUB(now(), INTERVAL 12 MONTH)";

String adoption_by_breed = "select MONTH(adoption_date) as month, YEAR(adoption_date) as year, species, breed, count(distinct pet_id) as adoption_counts from " +
                            adopted_last12month + " group by 1,2,3,4;"


String adoption_by_sp = "select month, year, species, 'Total' as breed, count(*) as adoption_counts from " + adoption_by_breed +" group by month, year, species;"

String adoption_table = "select * from " + adoption_by_sp + "union select * from " + adoption_by_breed + ";"




String surrender_12 = "select ad.surrender_date, ad.pet_id, a.species, ab.breed from Surrender ad left join Animal a on ad.pet_id = a.pet_id left join  AnimalBreed ab on a.species = ab.species and a.pet_id = ab.pet_id where ad.surrender_date >= DATE_SUB(now(), INTERVAL 12 MONTH)";

String surrender_by_breed = "select MONTH(surrender_date) as month, YEAR(surrender_date) as year, species, breed, count(distinct pet_id) as surrender_counts from surrender_12 group by 1,2,3,4;"

 "select distinct species, breed from surrender_12 union select distinct species, breed from adopted_last12month"

 select b.year, b.month, a.species, a.breed from monthly_breed as a cross join (select distinct year, month from surrender_by_breed) as b;



 create view ref_monthly as select b.year, b.month, a.species, a.breed from monthly_breed as a cross join (select distinct year, month from surrender_by_breed) as b;

 create view surrender_table_monthly as select * from surrender_by_sp union select * from surrender_by_breed;

create view monthly_report
select r.month, r.year, r.species, r.breed, surrender_counts, adoption_counts from ref_monthly r left join adoption_table a on r.month = a.month and r.year = a.year and r.species = a.species and r.breed = a.breed left join surrender_table_monthly s on  r.month = s.month and r.year = s.year and r.species = s.species and r.breed = s.breed where surrender_counts > 0 or adoption_counts > 0 ;