USE ffx_monsters;

-- BESAID FIENDS
-- Dingo
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Dingo', 125, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Lupine' AND l.location_name = 'Besaid';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Potion or Sleeping Powder', 'Power Sphere'
FROM fiends f WHERE f.name = 'Dingo';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Dingo' AND e.element_name = 'Fire';

-- Condor
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Condor', 95, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Bird' AND l.location_name = 'Besaid';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Phoenix Down or Smoke Bomb', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Condor';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Condor' AND e.element_name = 'Fire';

-- Water Flan
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Water Flan', 315, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Flan' AND l.location_name = 'Besaid';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Fish Scale or Dragon Scale', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Water Flan';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Fire' as elem
 UNION SELECT 1.5, 'Lightning'
 UNION SELECT -1, 'Water') vals
WHERE f.name = 'Water Flan' 
AND e.element_name = vals.elem;

-- KILIKA FIENDS
-- Dinonix
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Dinonix', 140, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Reptile' AND l.location_name = 'Kilika';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Soft or Petrify Grenade', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Dinonix';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Fire' as elem
 UNION SELECT 1.5, 'Ice') vals
WHERE f.name = 'Dinonix' 
AND e.element_name = vals.elem;

-- Killer Bee
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Killer Bee', 110, 5, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Wasp' AND l.location_name = 'Kilika';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Antidote or Poison Fang', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Killer Bee';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Killer Bee' AND e.element_name = 'Ice';

-- Yellow Element
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Yellow Element', 300, 100, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Elemental' AND l.location_name = 'Kilika';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Electro or Lightning Marble', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Yellow Element';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Fire' as elem
 UNION SELECT 0.5, 'Ice'
 UNION SELECT 1.5, 'Water') vals
WHERE f.name = 'Yellow Element' 
AND e.element_name = vals.elem;

-- Ragora
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Ragora', 780, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Plant' AND l.location_name = 'Kilika';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Antidote or Remedy', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Ragora';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, CASE e.element_name 
    WHEN 'Fire' THEN 1.5 
    WHEN 'Water' THEN 0 
    END
FROM fiends f, elements e
WHERE f.name = 'Ragora' 
AND e.element_name IN ('Fire', 'Water');

-- MI'IHEN HIGHROAD FIENDS
-- Mi'ihen Fang
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Mi''ihen Fang', 180, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Canine' AND l.location_name = 'Mi''ihen Highroad';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Power Herb', 'Strength Sphere'
FROM fiends f WHERE f.name = 'Mi''ihen Fang';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Mi''ihen Fang' AND e.element_name = 'Lightning';

-- Ipiria
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Ipiria', 160, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Mi''ihen Highroad';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Antidote', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Ipiria';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Ipiria' AND e.element_name = 'Ice';

-- Floating Eye
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Floating Eye', 100, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Eye' AND l.location_name = 'Mi''ihen Highroad';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Stamina Tonic', 'Evasion Sphere'
FROM fiends f WHERE f.name = 'Floating Eye';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Floating Eye' AND e.element_name = 'Wind';

-- MI'IHEN HIGHROAD FIENDS (continued)
-- White Element
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'White Element', 250, 80, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Elemental' AND l.location_name = 'Mi''ihen Highroad';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Water Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'White Element';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Fire' as elem
 UNION SELECT 0.5, 'Ice'
 UNION SELECT 1.5, 'Lightning') vals
WHERE f.name = 'White Element' 
AND e.element_name = vals.elem;

-- Raldo
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Raldo', 130, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Golem' AND l.location_name = 'Mi''ihen Highroad';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Iron Ore', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Raldo';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Raldo' AND e.element_name = 'Water';

-- Vouivre
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Vouivre', 140, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Dragonfly' AND l.location_name = 'Mi''ihen Highroad';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Phoenix Down', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Vouivre';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Vouivre' AND e.element_name = 'Fire';

-- Bomb
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Bomb', 120, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Bomb' AND l.location_name = 'Mi''ihen Highroad';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Bomb Fragment', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Bomb';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Bomb' AND e.element_name = 'Ice';

-- Dual Horn
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Dual Horn', 160, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Mi''ihen Highroad';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Beast Claw', 'Strength Sphere'
FROM fiends f WHERE f.name = 'Dual Horn';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Dual Horn' AND e.element_name = 'Lightning';

-- MUSHROOM ROCK ROAD FIENDS
-- Raptor
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Raptor', 200, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Reptile' AND l.location_name = 'Mushroom Rock Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Raptor Claw', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Raptor';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Raptor' AND e.element_name = 'Fire';

-- MUSHROOM ROCK ROAD FIENDS (continued)
-- Gandarewa
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Gandarewa', 240, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Mushroom Rock Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Gandarewa Fang', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Gandarewa';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Gandarewa' AND e.element_name = 'Ice';

-- Thunder Flan
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Thunder Flan', 350, 35, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Flan' AND l.location_name = 'Mushroom Rock Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Thunder Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Thunder Flan';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Thunder Flan' AND e.element_name = 'Water';

-- Red Element
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Red Element', 300, 90, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Elemental' AND l.location_name = 'Mushroom Rock Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Red Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Red Element';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Fire' as elem
 UNION SELECT 0.5, 'Ice'
 UNION SELECT 1.5, 'Water') vals
WHERE f.name = 'Red Element' 
AND e.element_name = vals.elem;

-- Lamashtu
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Lamashtu', 400, 50, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Plant' AND l.location_name = 'Mushroom Rock Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Lamashtu Leaf', 'Poison Fang'
FROM fiends f WHERE f.name = 'Lamashtu';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Lamashtu' AND e.element_name = 'Ice';

-- Funguar
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Funguar', 150, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Fungus' AND l.location_name = 'Mushroom Rock Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Fungus Cap', 'Stamina Sphere'
FROM fiends f WHERE f.name = 'Funguar';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Funguar' AND e.element_name = 'Fire';

-- Garuda
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Garuda', 280, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Bird' AND l.location_name = 'Mushroom Rock Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Feather', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Garuda';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Garuda' AND e.element_name = 'Lightning';

-- DJOSE ROAD FIENDS
-- Garm
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Garm', 220, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Djose Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Garm Claw', 'Strength Sphere'
FROM fiends f WHERE f.name = 'Garm';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Garm' AND e.element_name = 'Fire';

-- DJOSE ROAD FIENDS (continued)
-- Simurgh
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Simurgh', 200, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Bird' AND l.location_name = 'Djose Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Feather', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Simurgh';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Simurgh' AND e.element_name = 'Ice';

-- Bite Bug
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Bite Bug', 120, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Insect' AND l.location_name = 'Djose Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Bug Leg', 'Agility Sphere'
FROM fiends f WHERE f.name = 'Bite Bug';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Bite Bug' AND e.element_name = 'Fire';

-- Snow Flan
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Snow Flan', 330, 40, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Flan' AND l.location_name = 'Djose Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Ice Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Snow Flan';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Snow Flan' AND e.element_name = 'Fire';

-- Bunyip
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Bunyip', 250, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Amphibian' AND l.location_name = 'Djose Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Bunyip Scale', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Bunyip';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Bunyip' AND e.element_name = 'Lightning';

-- Basilisk
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Basilisk', 280, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Reptile' AND l.location_name = 'Djose Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Basilisk Skin', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Basilisk';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Basilisk' AND e.element_name = 'Fire';

-- Ochu
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Ochu', 150, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Fish' AND l.location_name = 'Djose Road';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Ochu Fin', 'Stamina Sphere'
FROM fiends f WHERE f.name = 'Ochu';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Ochu' AND e.element_name = 'Water';

-- THUNDER PLAINS FIENDS
-- Melusine
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Melusine', 240, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Serpent' AND l.location_name = 'Thunder Plains';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Melusine Scale', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Melusine';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Melusine' AND e.element_name = 'Lightning';

-- THUNDER PLAINS FIENDS (continued)
-- Aerouge
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Aerouge', 220, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Bird' AND l.location_name = 'Thunder Plains';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Aerouge Feather', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Aerouge';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Aerouge' AND e.element_name = 'Earth';

-- Buer
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Buer', 200, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Demon' AND l.location_name = 'Thunder Plains';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Buer Claw', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Buer';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Buer' AND e.element_name = 'Ice';

-- Gold Element
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Gold Element', 300, 100, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Elemental' AND l.location_name = 'Thunder Plains';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Gold Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Gold Element';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Fire' as elem
 UNION SELECT 0.5, 'Ice'
 UNION SELECT 1.5, 'Water') vals
WHERE f.name = 'Gold Element' 
AND e.element_name = vals.elem;

-- Kusariqqu
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Kusariqqu', 260, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Thunder Plains';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Kusariqqu Hide', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Kusariqqu';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Kusariqqu' AND e.element_name = 'Wind';

-- Larva
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Larva', 130, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Insect' AND l.location_name = 'Thunder Plains';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Larva Wing', 'Agility Sphere'
FROM fiends f WHERE f.name = 'Larva';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Larva' AND e.element_name = 'Fire';

-- Iron Giant
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Iron Giant', 350, 0, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Construct' AND l.location_name = 'Thunder Plains';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Iron Shard', 'HP Sphere'
FROM fiends f WHERE f.name = 'Iron Giant';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 0
FROM fiends f, elements e
WHERE f.name = 'Iron Giant' AND e.element_name = 'None';

-- Qactuar
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Qactuar', 160, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Thunder Plains';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Qactuar Hide', 'Strength Sphere'
FROM fiends f WHERE f.name = 'Qactuar';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Qactuar' AND e.element_name = 'Water';

-- MACALANIA FIENDS
-- Snow Wolf
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Snow Wolf', 350, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Wolf' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Wolf Fang', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Snow Wolf';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Snow Wolf' AND e.element_name = 'Fire';

-- MACALANIA FIENDS (continued)
-- Iguion
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Iguion', 300, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Feline' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Iguion Claw', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Iguion';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Iguion' AND e.element_name = 'Ice';

-- Wasp
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Wasp', 180, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Wasp' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Wasp Stinger', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Wasp';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Wasp' AND e.element_name = 'Lightning';

-- Evil Eye
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Evil Eye', 220, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Eye' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Evil Eye Lens', 'Evasion Sphere'
FROM fiends f WHERE f.name = 'Evil Eye';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Evil Eye' AND e.element_name = 'Wind';

-- Ice Flan
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Ice Flan', 400, 35, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Flan' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Ice Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Ice Flan';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Ice Flan' AND e.element_name = 'Fire';

-- Blue Element
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Blue Element', 320, 90, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Elemental' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Blue Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Blue Element';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Fire' as elem
 UNION SELECT 0.5, 'Ice'
 UNION SELECT 1.5, 'Lightning') vals
WHERE f.name = 'Blue Element' 
AND e.element_name = vals.elem;

-- Murussu
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Murussu', 280, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Murussu Hide', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Murussu';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Murussu' AND e.element_name = 'Fire';

-- Mafdet
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Mafdet', 260, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Mafdet Claw', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Mafdet';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Mafdet' AND e.element_name = 'Lightning';

-- Xiphos
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Xiphos', 240, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Reptile' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Xiphos Scale', 'Strength Sphere'
FROM fiends f WHERE f.name = 'Xiphos';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Xiphos' AND e.element_name = 'Ice';

-- Chimera
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Chimera', 360, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Hybrid' AND l.location_name = 'Macalania';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Chimera Mane', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Chimera';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Chimera' AND e.element_name = 'Fire';

-- CALM LANDS FIENDS
-- Skoll
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Skoll', 220, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Wolf' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Skoll Fang', 'Strength Sphere'
FROM fiends f WHERE f.name = 'Skoll';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Skoll' AND e.element_name = 'Ice';

-- Nebiros
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Nebiros', 240, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Demon' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Nebiros Claw', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Nebiros';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Nebiros' AND e.element_name = 'Fire';

-- Flame Flan
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Flame Flan', 350, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Flan' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Flame Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Flame Flan';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Flame Flan' AND e.element_name = 'Water';

-- Shred
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Shred', 300, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Shred Claw', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Shred';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Shred' AND e.element_name = 'Ice';

-- Anacondaur
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Anacondaur', 400, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Snake' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Anacondaur Scale', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Anacondaur';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Anacondaur' AND e.element_name = 'Lightning';

-- Ogre
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Ogre', 500, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Giant' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Ogre Club', 'HP Sphere'
FROM fiends f WHERE f.name = 'Ogre';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 0
FROM fiends f, elements e
WHERE f.name = 'Ogre' AND e.element_name = 'None';

-- Coeurl
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Coeurl', 280, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Cat' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Coeurl Claw', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Coeurl';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Coeurl' AND e.element_name = 'Water';

-- Chimera Brain
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Chimera Brain', 260, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Brain' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Chimera Brain Matter', 'Intelligence Sphere'
FROM fiends f WHERE f.name = 'Chimera Brain';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Chimera Brain' AND e.element_name = 'Fire';

-- Malboro
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Malboro', 640, 35, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Plant' AND l.location_name = 'Calm Lands';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Malboro Spore', 'Dark Matter (chance)'
FROM fiends f WHERE f.name = 'Malboro';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 1.5 as multiplier, 'Fire' as elem
 UNION SELECT -1, 'Water') vals
WHERE f.name = 'Malboro' 
AND e.element_name = vals.elem;

-- MT. GAGAZET FIENDS
-- Bandersnatch
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Bandersnatch', 320, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Bandersnatch Claw', 'Strength Sphere'
FROM fiends f WHERE f.name = 'Bandersnatch';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Bandersnatch' AND e.element_name = 'Fire';

-- Ahriman
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Ahriman', 280, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Demon' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Ahriman Scale', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Ahriman';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Ahriman' AND e.element_name = 'Lightning';

-- Dark Flan
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Dark Flan', 360, 35, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Flan' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Dark Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Dark Flan';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Dark Flan' AND e.element_name = 'Fire';

-- Grenade
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Grenade', 300, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Bomb' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Grenade Fragment', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Grenade';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Grenade' AND e.element_name = 'Ice';

-- Grat
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Grat', 260, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Grat Claw', 'Strength Sphere'
FROM fiends f WHERE f.name = 'Grat';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Grat' AND e.element_name = 'Water';

-- Grendel
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Grendel', 340, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Giant' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Grendel Hide', 'HP Sphere'
FROM fiends f WHERE f.name = 'Grendel';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Grendel' AND e.element_name = 'Fire';

-- Bashura
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Bashura', 300, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Bashura Claw', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Bashura';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Bashura' AND e.element_name = 'Lightning';

-- Mandragora
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Mandragora', 240, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Plant' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Mandragora Leaf', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Mandragora';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Mandragora' AND e.element_name = 'Fire';

-- Behemoth
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Behemoth', 450, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Giant' AND l.location_name = 'Mt. Gagazet';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Behemoth Horn', 'HP Sphere'
FROM fiends f WHERE f.name = 'Behemoth';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 0
FROM fiends f, elements e
WHERE f.name = 'Behemoth' AND e.element_name = 'None';

-- STOLEN FAYTH CAVERN FIENDS
-- Yowie
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Yowie', 250, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Yowie Claw', 'Luck Sphere'
FROM fiends f WHERE f.name = 'Yowie';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Yowie' AND e.element_name = 'Ice';

-- Imp
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Imp', 130, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Demon' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Imp Wing', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Imp';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Imp' AND e.element_name = 'Fire';

-- Dark Element
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Dark Element', 300, 80, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Elemental' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Dark Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Dark Element';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Light' as elem
 UNION SELECT 1.5, 'Fire') vals
WHERE f.name = 'Dark Element' 
AND e.element_name = vals.elem;

-- Nidhogg
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Nidhogg', 450, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Dragon' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Dragon Scale', 'HP Sphere'
FROM fiends f WHERE f.name = 'Nidhogg';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Nidhogg' AND e.element_name = 'Lightning';

-- Thorn
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Thorn', 160, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Plant' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Thorn', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Thorn';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Thorn' AND e.element_name = 'Fire';

-- Valaha
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Valaha', 280, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Valaha Hide', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Valaha';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Valaha' AND e.element_name = 'Ice';

-- Epaaj
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Epaaj', 200, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Reptile' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Epaaj Scale', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Epaaj';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Epaaj' AND e.element_name = 'Fire';

-- Ghost
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Ghost', 150, 50, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Undead' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Ghost Essence', 'Spirit Sphere'
FROM fiends f WHERE f.name = 'Ghost';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Ghost' AND e.element_name = 'Holy';

-- Tonberry
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Tonberry', 500, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Dwarf' AND l.location_name = 'Stolen Fayth Cavern';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Tonberry Blade', 'Luck Sphere'
FROM fiends f WHERE f.name = 'Tonberry';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Tonberry' AND e.element_name = 'Ice';

-- BIKANEL DESERT FIENDS
-- Sand Wolf
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Sand Wolf', 300, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Wolf' AND l.location_name = 'Bikanel';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Sand Claw', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Sand Wolf';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Sand Wolf' AND e.element_name = 'Fire';

-- Alcyone
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Alcyone', 350, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Bird' AND l.location_name = 'Bikanel';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Feather', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Alcyone';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Alcyone' AND e.element_name = 'Ice';

-- Mushussu
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Mushussu', 400, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Dragon' AND l.location_name = 'Bikanel';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Scale', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Mushussu';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Mushussu' AND e.element_name = 'Lightning';

-- Zu
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Zu', 200, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Insect' AND l.location_name = 'Bikanel';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Zu Wing', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Zu';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Zu' AND e.element_name = 'Fire';

-- Sand Worm
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Sand Worm', 450, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Worm' AND l.location_name = 'Bikanel';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Worm Tooth', 'HP Sphere'
FROM fiends f WHERE f.name = 'Sand Worm';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Sand Worm' AND e.element_name = 'Water';

-- Cactuar
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Cactuar', 120, 10, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Plant' AND l.location_name = 'Bikanel';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Cactuar Spine', 'Speed Sphere'
FROM fiends f WHERE f.name = 'Cactuar';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Cactuar' AND e.element_name = 'Fire';

-- OMEGA RUINS FIENDS (continued)
-- Floating Death
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Floating Death', 300, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Spirit' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Death Essence', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Floating Death';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Floating Death' AND e.element_name = 'Lightning';

-- Black Element
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Black Element', 350, 80, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Elemental' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Black Gem', 'Mana Sphere'
FROM fiends f WHERE f.name = 'Black Element';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, multiplier
FROM fiends f, elements e,
(SELECT 0.5 as multiplier, 'Fire' as elem
 UNION SELECT 0.5, 'Ice'
 UNION SELECT 1.5, 'Water') vals
WHERE f.name = 'Black Element' 
AND e.element_name = vals.elem;

-- Halma
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Halma', 320, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Halma Horn', 'HP Sphere'
FROM fiends f WHERE f.name = 'Halma';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Halma' AND e.element_name = 'Wind';

-- Puroboros
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Puroboros', 400, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Reptile' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Puroboros Scale', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Puroboros';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Puroboros' AND e.element_name = 'Fire';

-- Spirit
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Spirit', 260, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Ghost' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Spirit Essence', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Spirit';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Spirit' AND e.element_name = 'Holy';

-- Machea
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Machea', 300, 15, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Reptile' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Machea Skin', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Machea';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Machea' AND e.element_name = 'Fire';

-- Master Coeurl
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Master Coeurl', 350, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Cat' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Master Coeurl Claw', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Master Coeurl';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Master Coeurl' AND e.element_name = 'Water';

-- Master Tonberry
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Master Tonberry', 380, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Dwarf' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Master Tonberry Blade', 'Luck Sphere'
FROM fiends f WHERE f.name = 'Master Tonberry';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Master Tonberry' AND e.element_name = 'Ice';

-- Varuna
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Varuna', 320, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Spirit' AND l.location_name = 'Omega Dungeon';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Varuna Scale', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Varuna';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Varuna' AND e.element_name = 'Lightning';

-- INSIDE SIN FIENDS
-- Exoray
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Exoray', 180, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Specter' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Spirit Orb', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Exoray';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Exoray' AND e.element_name = 'Holy';

-- Continue this pattern for each location... 

-- INSIDE SIN FIENDS (continued)
-- Wraith
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Wraith', 220, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Undead' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Wraith Essence', 'Spirit Sphere'
FROM fiends f WHERE f.name = 'Wraith';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Wraith' AND e.element_name = 'Holy';

-- Gemini (Sword)
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Gemini (Sword)', 240, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Twin' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Twin Blade Fragment', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Gemini (Sword)';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Gemini (Sword)' AND e.element_name = 'Fire';

-- Gemini (Club)
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Gemini (Club)', 240, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Twin' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Twin Club Fragment', 'Defense Sphere'
FROM fiends f WHERE f.name = 'Gemini (Club)';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Gemini (Club)' AND e.element_name = 'Ice';

-- Demonolith
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Demonolith', 300, 40, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Rock' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Demonolith Shard', 'Magic Sphere'
FROM fiends f WHERE f.name = 'Demonolith';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Demonolith' AND e.element_name = 'Light';

-- Great Malboro
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Great Malboro', 680, 40, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Plant' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Malboro Spore', 'Dark Matter (chance)'
FROM fiends f WHERE f.name = 'Great Malboro';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Great Malboro' AND e.element_name = 'Fire';

-- Barbatos
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Barbatos', 400, 30, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Beast' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Barbatos Hide', 'Attack Sphere'
FROM fiends f WHERE f.name = 'Barbatos';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 1.5
FROM fiends f, elements e
WHERE f.name = 'Barbatos' AND e.element_name = 'Lightning';

-- Adamantoise
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Adamantoise', 500, 20, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Turtle' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Shell Fragment', 'HP Sphere'
FROM fiends f WHERE f.name = 'Adamantoise';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 0
FROM fiends f, elements e
WHERE f.name = 'Adamantoise' AND e.element_name = 'None';

-- Behemoth King
INSERT INTO fiends (name, hp, mp, fiend_type_id, location_id) 
SELECT 'Behemoth King', 600, 25, ft.fiend_type_id, l.location_id
FROM fiend_types ft, locations l
WHERE ft.type_name = 'Giant' AND l.location_name = 'Inside Sin';

INSERT INTO drops (fiend_id, common_drop, bribe_drop)
SELECT f.fiend_id, 'Behemoth King Horn', 'HP Sphere'
FROM fiends f WHERE f.name = 'Behemoth King';

INSERT INTO elemental_weaknesses (fiend_id, element_id, multiplier)
SELECT f.fiend_id, e.element_id, 0
FROM fiends f, elements e
WHERE f.name = 'Behemoth King' AND e.element_name = 'None';