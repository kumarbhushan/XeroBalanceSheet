import request from 'supertest';
import axios from 'axios';
import app from './index';
import { XERO_API_URL } from './config/app.config';
import { afterEach, describe } from 'node:test';
jest.mock('axios');
jest.mock("winston", () => {
    const winston = jest.requireActual("winston");
    winston.transports.Console.prototype.log = jest.fn();
    return winston;
});
describe('GET /balance-sheet', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });
    afterEach(async () => {
        jest.clearAllMocks();
    });
    it('should return balance sheet data successfully', async () => {
        const mockResponseData = { Reports: [{ title: 'Balance Sheet' }] };
        // Mock axios to resolve successfully
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockResponseData });
        const response = await request(app).get('/balance-sheet');

        // Assertions
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockResponseData);
        expect(axios.get).toHaveBeenCalledWith(XERO_API_URL);
    });
    it('should handle non-existent routes with 404', async () => {
        const response = await request(app).get('/non-existent-route');
        expect(response.status).toBe(404);
    });
    it('should handle rate-limiting and security headers', async () => {
        // Send multiple requests to trigger rate limiting
        for (let i = 0; i < 100; i++) {
            await request(app).get('/balance-sheet');
        }

        const rateLimitedResponse = await request(app).get('/balance-sheet');

        // Assertions
        expect(rateLimitedResponse.status).toBe(429); // Too many requests

        // Test security headers are applied
        const response = await request(app).get('/balance-sheet');
        expect(response.headers['x-dns-prefetch-control']).toBe('off');        
        expect(response.headers['x-content-type-options']).toBe('nosniff');
        expect(response.headers['strict-transport-security']).toBeDefined();
    });
});

