import { facker } from "@faker-js/faker";

const generarUsuarios = () => {
    return {
        id: facker.database.mongodbObjectId(),
        first_name: facker.person.firstName(),
        last_name: facker.person.lastName(),
        phone: facker.phone.number(),
        email: facker.internet.email(),
        
    }
}