import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app.js'; 
import { adoptionsService, usersService, petsService } from '../services/index.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('tests funcionales del aouter adoption', function () {
    this.timeout(5000);

    before(() => {
        sinon.stub(adoptionsService, 'getAll').resolves([
            { _id: '12345', owner: 'user123', pet: 'pet456' },
        ]);
        sinon.stub(adoptionsService, 'getBy').resolves({
            _id: '12345',
            owner: 'user123',
            pet: 'pet456',
        });
        sinon.stub(adoptionsService, 'create').resolves({ message: 'Pet adopted' });

        sinon.stub(usersService, 'getUserById').resolves({
            _id: 'user123',
            name: 'Test User',
            pets: [],
        });
        sinon.stub(petsService, 'getBy').resolves({
            _id: 'pet456',
            name: 'Test Pet',
            adopted: false,
        });
        sinon.stub(petsService, 'update').resolves();
        sinon.stub(usersService, 'update').resolves();
    });

    
    after(() => {
        sinon.restore();
    });

    it('debe devolver todas las adopciones', (done) => {
        chai.request(app)
            .get('/api/adoptions')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').eql('success');
                expect(res.body).to.have.property('payload').that.is.an('array');
                done();
            });
    });

    it('debe devolver una adopcion especifica por id', (done) => {
        chai.request(app)
            .get('/api/adoptions/12345')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').eql('success');
                expect(res.body).to.have.property('payload').that.is.an('object');
                done();
            });
    });

    it('debe crear una nueva adopcion', (done) => {
        chai.request(app)
            .post('/api/adoptions/user123/pet456')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').eql('success');
                expect(res.body).to.have.property('message').eql('Pet adopted');
                done();
            });
    });
});
