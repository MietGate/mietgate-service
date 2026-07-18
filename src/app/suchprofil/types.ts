export interface SearchProfile {


  id?: string;

  user_id?: string;



  city_id: string | null;

  city: string | null;

  radius: number | null;



  rooms: number | null;

  living_space: number | null;



  warm_rent: number | null;



  move_in_date: string | null;



  household_size: number | null;



  pets: boolean;



  districts: string[];


}