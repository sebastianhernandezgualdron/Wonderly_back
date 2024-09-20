import express, { Router } from "express";
const router = express.Router();
import * as PersonController from "../controllers/PersonController.js";
import * as CountryController from "../controllers/CountryController.js";
import * as HotelController from "../controllers/HotelController.js";
import * as RoomController from "../controllers/RoomController.js";
import * as HotelServicesController from "../controllers/HotelServicesController.js";
import * as CityController from "../controllers/CityController.js";
import * as ActivityController from "../controllers/ActivityController.js";
import * as UserController from "../controllers/UserController.js";
import * as FavoriteActivitiesController from "../controllers/FavoriteActivitiesController.js";
import * as ActivitiesReservationController from "../controllers/ActivitiesReservationController.js";
import * as HotelCityController from "../controllers/HotelCityController.js";
import * as HotelRoomController from "../controllers/HotelRoomController.js";
import * as HotelCityServicesController from "../controllers/HotelCityServicesController.js";
import * as FavoriteHotelsController from "../controllers/FavoriteHotelsController.js";
import * as HotelRatingController from "../controllers/HotelRatingController.js";
import * as HotelReservationController from "../controllers/HotelReservationController.js";
import { authenticate } from "../middlewares/authenticate.js";


router.post("/register/", UserController.Store)
router.post("/login/", UserController.Login)

router.use(authenticate)


  //RUTAS PERSONAS
  .get("/person", PersonController.Index)
  .get("/person/:id", PersonController.Show)
  .post("/person", PersonController.Store)
  .put("/person/:id", PersonController.Amend)
  .delete("/person/:id", PersonController.Delete)

  //RUTAS PAISES
  .get("/country", CountryController.Index)
  .get("/country/:id", CountryController.Show)
  .post("/country", CountryController.Store)
  .put("/country/:id", CountryController.Amend)
  .delete("/country/:id", CountryController.Delete)

  //RUTAS HOTELES
  .get("/hotel", HotelController.Index)
  .get("/hotel/:id", HotelController.Show)
  .post("/hotel", HotelController.Store)
  .put("/hotel/:id", HotelController.Amend)
  .delete("/hotel/:id", HotelController.Delete)
 
  //RUTAS HABITACIONES
  .get("/room", RoomController.Index)
  .get("/room/:id", RoomController.Show)
  .post("/room", RoomController.Store)
  .put("/room/:id", RoomController.Amend)
  .delete("/room/:id", RoomController.Delete)

  //RUTAS SERVICIOS DE HOTEL
  .get("/services", HotelServicesController.Index)
  .get("/services/:id", HotelServicesController.Show)
  .post("/services", HotelServicesController.Store)
  .put("/services/:id", HotelServicesController.Amend)
  .delete("/services/:id", HotelServicesController.Delete)

  //RUTAS CIUDADES
  .get("/city/", CityController.Index)
  .get("/city/:id", CityController.Show)
  .post("/city/", CityController.Store)
  .put("/city/:id", CityController.Amend)
  .delete("/city/:id", CityController.Delete)

  //RUTAS ACTIVIDADES
  .get("/activity/", ActivityController.Index)
  .get("/activity/:id", ActivityController.Show)
  .post("/activity/", ActivityController.Store)
  .put("/activity/:id", ActivityController.Amend)
  .delete("/activity/:id", ActivityController.Delete)

  //RUTAS USUARIO
  .get("/user/", UserController.Index)
  .get("/user/:id", UserController.Show)

  .put("/user/:id", UserController.Amend)
  .delete("/user/:id", UserController.Delete)

  //RUTAS ACTIVIDADES FAVORITAS
  .get("/activities/favorite", FavoriteActivitiesController.Index)
  .get("/activities/favorite/:id", FavoriteActivitiesController.Show)
  .post("/activities/favorite/", FavoriteActivitiesController.Store)
  .put("/activities/favorite/:id", FavoriteActivitiesController.Amend)
  .delete("/activities/favorite/:id", FavoriteActivitiesController.Delete)
  .get("/activities/favorite/user/:id", FavoriteActivitiesController.FavoriteActivitiesByUser)

  //RUTAS ACTIVIDADES RESERVADAS
  .get("/reservation/activity", ActivitiesReservationController.Index)
  .get("/reservation/activity/:id", ActivitiesReservationController.Show)
  .post("/reservation/activity/", ActivitiesReservationController.Store)
  .put("/reservation/activity/:id", ActivitiesReservationController.Amend)
  .delete("/reservation/activity/:id", ActivitiesReservationController.Delete)
  .get("/reservation/activity/user/:id", ActivitiesReservationController.getActivitiesReservationsByUser)

  //RUTAS HOTELES EN CIUDAD
  .get("/hotels/city/", HotelCityController.Index)
  .get("/hotels/city/:id", HotelCityController.Show)
  .post("/hotels/city/", HotelCityController.Store)
  .put("/hotels/city/:id", HotelCityController.Amend)
  .delete("/hotels/city/:id", HotelCityController.Delete)

  //RUTAS HABITACIONES EN HOTEL
  .get("/hotels/room/", HotelRoomController.Index)
  .get("/hotels/room/:id", HotelRoomController.Show)
  .post("/hotels/room/", HotelRoomController.Store)
  .put("/hotels/room/:id", HotelRoomController.Amend)
  .delete("/hotels/room/:id", HotelRoomController.Delete)

  //RUTAS SERVICIOS EN HOTEL
  .get("/hotels/service/", HotelCityServicesController.Index)
  .get("/hotels/service/:id", HotelCityServicesController.Show)
  .post("/hotels/service/", HotelCityServicesController.Store)
  .put("/hotels/service/:id", HotelCityServicesController.Amend)
  .delete("/hotels/service/:id", HotelCityServicesController.Delete)

  //RUTAS HOTELES FAVORITOS
  .get("/hotels/favorite/", FavoriteHotelsController.Index)
  .get("/hotels/favorite/:id", FavoriteHotelsController.Show)
  .post("/hotels/favorite/", FavoriteHotelsController.Store)
  .put("/hotels/favorite/:id", FavoriteHotelsController.Amend)
  .delete("/hotels/favorite/:id", FavoriteHotelsController.Delete)
  .get("/hotels/favorite/user/:id", FavoriteHotelsController.FavoriteHotelsByUser)
  //RUTAS HOTELES RATINGS
  .get("/hotels/rating/", HotelRatingController.Index)
  .get("/hotels/rating/:id", HotelRatingController.Show)
  .post("/hotels/rating/", HotelRatingController.Store)
  .put("/hotels/rating/:id", HotelRatingController.Amend)
  .delete("/hotels/rating/:id", HotelRatingController.Delete)

  //RUTAS HOTELES RESERVACIONES
  .get("/hotels/reservation/", HotelReservationController.Index)
  .get("/hotels/reservation/:id", HotelReservationController.Show)
  .post("/hotels/reservation/", HotelReservationController.Store)
  .put("/hotels/reservation/:id", HotelReservationController.Amend)
  .delete("/hotels/reservation/:id", HotelReservationController.Delete)
  .get("/hotels/city/:id", HotelReservationController.getHotelsByCity)
  .get("/hotels/reservation/user/:id", HotelReservationController.getHotelReservationsByUser)



  ////FILTROOOOOOOS
  .get("/hotels/colombia", HotelCityController.getHotelsColombia);
export { router };
