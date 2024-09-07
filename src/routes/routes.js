import express from "express";
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


router

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
  .get("/hotels/services", HotelServicesController.Index)
  .get("/hotels/services/:id", HotelServicesController.Show)
  .post("/hotels/services", HotelServicesController.Store)
  .put("/hotels/services/:id", HotelServicesController.Amend)
  .delete("/hotels/services/:id", HotelServicesController.Delete)

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
   .post("/login/", UserController.Store)
   .put("/user/:id", UserController.Amend)
   .delete("/user/:id", UserController.Delete)

   //RUTAS ACTIVIDADES FAVORITAS
   .get("/activities/favorite", FavoriteActivitiesController.Index)
   .get("/activities/favorite/:id", FavoriteActivitiesController.Show)
   .post("/activities/favorite/", FavoriteActivitiesController.Store)
   .put("/activities/favorite/:id", FavoriteActivitiesController.Amend)
   .delete("/activities/favorite/:id", FavoriteActivitiesController.Delete)

   //RUTAS ACTIVIDADES RESERVADAS
   .get("/reservation/activity", ActivitiesReservationController.Index)
   .get("/reservation/activity/:id", ActivitiesReservationController.Show)
   .post("/reservation/activity/", ActivitiesReservationController.Store)
   .put("/reservation/activity/:id", ActivitiesReservationController.Amend)
   .delete("/reservation/activity/:id", ActivitiesReservationController.Delete);
export { router };
