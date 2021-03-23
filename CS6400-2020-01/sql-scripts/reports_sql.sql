
-- Volunteer
-- data validation
-- if user type in non-string type, it will be tranform to string typeCode
-- if user type noting in either first name or last name, transform into ''
select l.first_name, l.last_name, v.phone_number, l.email_address
from Volunteer v left join LoginUser l on v.username = l.username
where l.first_name like CONCAT('$First_Name', '%')
and l.last_name like CONCAT('$Last_Name', '%')
order by l.last_name, l.first_name


-- Monthly AdoptionInformation
--

with adoption as (
select bn.breed, bn.species, month(a.adoption_date) as month
from AdoptionInformation a inner join
(
select a.petId,GROUP_CONCAT(breed ORDER BY breed DESC SEPARATOR '/') as breed, b.species
from AdoptionInformation a left join AnimalBreed ab on a.petId = ab.petId
left join Breed b on b.breed  = ab.breed
group by a.petId, b.species
) breed_name bn on bn.petId = a.pedId
where a.adoption_date > DATE_SUB(DATE_FORMAT(NOW() ,'%Y-%m-01'), INTERVAL 12 month)
),
adoption_breed_count as (
select  month,species,breed,count(1) as counts
from adoption
group by month,speicies, breed)
adoption_species_count as (
  select month,species,'Total',count(1) as counts
  from adoption
  group by month,species
),
Surrenders as (
select bn.breed, bn.species, month(s.surrender_date) as month
from surrender s inner join
(
  select s.petId,GROUP_CONCAT(breed ORDER BY breed DESC SEPARATOR '/') as breed, b.species
  from Surrender s left join AnimalBreed ab on s.petId = ab.petId
  left join Breed b on b.breed  = ab.breed
  group by s.petId, b.species
) breed_name bn on bn.petId = s.pedId
  where s.surrender_date > DATE_SUB(DATE_FORMAT(NOW() ,'%Y-%m-01'), INTERVAL 12 month)
),
surrender_breed_count as (
  select  month,species,breed,count(1) as counts
  from surrenders
  group by month,speicies, breed
),
surrender_species_count as (
  select month,species,'Total',count(1) as counts
  from surrenders
  group by month,species
),
adoption_all as (select * from adoption_breed_count union adoption_species_count),
surrender_all as (select * from surrender_breed_count union surrender_species_count)
select case when aa.month is null then sa.month else aa.month end as month,
case when aa.species is null then sa.species else aa.species end as species,
case when aa.breed is null then sa.breed else aa.breed end as breed,
case when aa.counts is null then 0 else aa.counts end as Adoption_Number,
case when sa.counts is null then 0 else sa.counts end as Surrender_number
from adoption_all aa outer join surrender_alls sa on aa.month = sa.month
and aa.species = sa.species and aa.breed = sa.breed
order by aa.month,aa.species,aa.breed
