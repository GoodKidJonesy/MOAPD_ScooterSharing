import { GenerateUser, DeleteUser, checkUserExistance  } from "../Firebase.jsx";

// To start testing run: npm run test

GenerateUserTest();

function GenerateUserTest () {
    test("Generate a user, should return true ", async() => {
        const isAdded = await GenerateUser("test@mail.com", "pass123", 42);
        
        expect(isAdded).toBe(true);
    });

    test("Try generating an existing user, should return false", async() => {
        const isAdded = await GenerateUser("test@mail.com", "pass123", 42);

        expect(isAdded).toBe(false);
    });
}

