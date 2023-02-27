const request = require("supertest");
const app = require("../../app");

describe("Todo", () => {
    let id = null;
    test("Create", async () => {
        const {body, statusCode} = await request(app).post('/api/todo').send({
            name: 'Test 2',
            description: 'Test 2 Desc'
        });
        expect(statusCode).toBe(201);
        expect(body).toBeInstanceOf(Object);
        expect('_id' in body).toBe(true);
        id = body._id;
    });
    test("Update", async () => {
        const {body, statusCode} = await request(app).put(`/api/todo/${id}`).send({
            name: 'Test 3',
            description: 'Test 3 Desc'
        });
        expect(statusCode).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(Object.keys(body).length).toBeGreaterThan(0);
    });
    test("Get", async () => {
        const {body, statusCode} = await request(app).get(`/api/todo/${id}`);
        expect(statusCode).toBe(200);
        expect(body).toBeInstanceOf(Object);
        expect(Object.keys(body).length).toBeGreaterThan(0);
    });
    test("GetAll", async () => {
        const {body, statusCode} = await request(app).get('/api/todo');
        expect(statusCode).toBe(200);
        expect(body).toBeInstanceOf(Array);
        expect(body.length).toBeGreaterThan(0);
    });
    test("Delete", async () => {
        const {statusCode} = await request(app).delete(`/api/todo/${id}`);
        expect(statusCode).toBe(204);
    });
});