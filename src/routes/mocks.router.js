import { Router } from "express";
import mocksController from "../controllers/Mocks.controller.js";

const router = Router();

// Crear la ruta para obtener mascotas:
router.get("/mockingpets", mocksController.getMockingPets);

// Crear la ruta para obtener usuarios:
router.get("/mockingusers", mocksController.getMockingUsers); 

// Crear un ruta que reciba dos parametros numericos (usuarios y mascotas )
router.post("/generatedata", mocksController.generateData);

export default router;
