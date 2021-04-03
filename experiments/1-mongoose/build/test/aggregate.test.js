"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
require("chai").should();
const chai_1 = require("chai");
describe("aggregate", function () {
    describe("tx with transfers", function () {
        let Tx;
        const TxSchema = new mongoose_1.default.Schema({
            transfers: [{ from: String, usd: Number }],
        });
        before(async function () {
            const mongod = new mongodb_memory_server_1.MongoMemoryServer();
            const uri = await mongod.getUri();
            const mongoOpts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
            const connection = await mongoose_1.default.createConnection(uri, mongoOpts);
            Tx = connection.model("Tx", TxSchema);
        });
        it("should create tx without transfers", async function () {
            const tx = await Tx.create({});
            chai_1.assert.lengthOf(tx.transfers, 0);
        });
        it("should create tx with transfers", async function () {
            const tx = await Tx.create({
                transfers: [
                    { from: "a", usd: 1 },
                    { from: "b", usd: 2 },
                ],
            });
            chai_1.assert.lengthOf(tx.transfers, 2);
        });
        it("push() should add new transfers to the end", async function () {
            let tx = await Tx.create({
                transfers: [{ from: "a", usd: 1 }],
            });
            tx.transfers.push({ from: "b", usd: 2 });
            await tx.save();
            tx = await Tx.findById(tx.id);
            chai_1.assert.lengthOf(tx.transfers, 2);
            tx.transfers[0].from.should.equal("a");
            tx.transfers[1].from.should.equal("b");
        });
        it("unshift() should add new transfers to the end", async function () {
            let tx = await Tx.create({
                transfers: [{ from: "a", usd: 1 }],
            });
            tx.transfers.unshift({ from: "b", usd: 2 });
            await tx.save();
            tx = await Tx.findById(tx.id);
            chai_1.assert.lengthOf(tx.transfers, 2);
            tx.transfers[0].from.should.equal("b");
            tx.transfers[1].from.should.equal("a");
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdncmVnYXRlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi90ZXN0L2FnZ3JlZ2F0ZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0Esd0RBQWdDO0FBQ2hDLGlFQUEwRDtBQUUxRCxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDekIsK0JBQThCO0FBSzlCLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDcEIsUUFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLElBQUksRUFBTyxDQUFDO1FBQ1osTUFBTSxRQUFRLEdBQUcsSUFBSSxrQkFBUSxDQUFDLE1BQU0sQ0FBQztZQUNuQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDO1NBQzNDLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxLQUFLO1lBQ1YsTUFBTSxNQUFNLEdBQUcsSUFBSSx5Q0FBaUIsRUFBRSxDQUFDO1lBRXZDLE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLE1BQU0sU0FBUyxHQUFHO2dCQUNoQixlQUFlLEVBQUUsSUFBSTtnQkFDckIsa0JBQWtCLEVBQUUsSUFBSTthQUd6QixDQUFDO1lBRUYsTUFBTSxVQUFVLEdBQUcsTUFBTSxrQkFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUNuRSxFQUFFLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsb0NBQW9DLEVBQUUsS0FBSztZQUM1QyxNQUFNLEVBQUUsR0FBRyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFL0IsYUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLGlDQUFpQyxFQUFFLEtBQUs7WUFDekMsTUFBTSxFQUFFLEdBQUcsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDO2dCQUN6QixTQUFTLEVBQUU7b0JBQ1QsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7b0JBQ3JCLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO2lCQUN0QjthQUNGLENBQUMsQ0FBQztZQUVILGFBQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxLQUFLO1lBQ3BELElBQUksRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDdkIsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNuQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDekMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsYUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRSxLQUFLO1lBQ3ZELElBQUksRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQztnQkFDdkIsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUNuQyxDQUFDLENBQUM7WUFFSCxFQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDNUMsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDaEIsRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDOUIsYUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29uc29sYSBmcm9tIFwiY29uc29sYVwiO1xuaW1wb3J0IG1vbmdvb3NlIGZyb20gXCJtb25nb29zZVwiO1xuaW1wb3J0IHsgTW9uZ29NZW1vcnlTZXJ2ZXIgfSBmcm9tIFwibW9uZ29kYi1tZW1vcnktc2VydmVyXCI7XG5cbnJlcXVpcmUoXCJjaGFpXCIpLnNob3VsZCgpO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSBcImNoYWlcIjtcbi8vIGNvbnNvbGEuaW5mbyhhc3NlcnQpO1xuXG5pbXBvcnQgeyBBIH0gZnJvbSBcIi4uL3NyY1wiO1xuXG5kZXNjcmliZShcImFnZ3JlZ2F0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gIGRlc2NyaWJlKFwidHggd2l0aCB0cmFuc2ZlcnNcIiwgZnVuY3Rpb24gKCkge1xuICAgIGxldCBUeDogYW55O1xuICAgIGNvbnN0IFR4U2NoZW1hID0gbmV3IG1vbmdvb3NlLlNjaGVtYSh7XG4gICAgICB0cmFuc2ZlcnM6IFt7IGZyb206IFN0cmluZywgdXNkOiBOdW1iZXIgfV0sXG4gICAgfSk7XG5cbiAgICBiZWZvcmUoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgbW9uZ29kID0gbmV3IE1vbmdvTWVtb3J5U2VydmVyKCk7XG5cbiAgICAgIGNvbnN0IHVyaSA9IGF3YWl0IG1vbmdvZC5nZXRVcmkoKTtcbiAgICAgIGNvbnN0IG1vbmdvT3B0cyA9IHtcbiAgICAgICAgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLFxuICAgICAgICB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUsXG4gICAgICAgIC8vIHVzZUZpbmRBbmRNb2RpZnk6IGZhbHNlLFxuICAgICAgICAvLyB1c2VDcmVhdGVJbmRleDogdHJ1ZSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGNvbm5lY3Rpb24gPSBhd2FpdCBtb25nb29zZS5jcmVhdGVDb25uZWN0aW9uKHVyaSwgbW9uZ29PcHRzKTtcbiAgICAgIFR4ID0gY29ubmVjdGlvbi5tb2RlbChcIlR4XCIsIFR4U2NoZW1hKTtcbiAgICB9KTtcblxuICAgIGl0KFwic2hvdWxkIGNyZWF0ZSB0eCB3aXRob3V0IHRyYW5zZmVyc1wiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0eCA9IGF3YWl0IFR4LmNyZWF0ZSh7fSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZih0eC50cmFuc2ZlcnMsIDApO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzaG91bGQgY3JlYXRlIHR4IHdpdGggdHJhbnNmZXJzXCIsIGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHR4ID0gYXdhaXQgVHguY3JlYXRlKHtcbiAgICAgICAgdHJhbnNmZXJzOiBbXG4gICAgICAgICAgeyBmcm9tOiBcImFcIiwgdXNkOiAxIH0sXG4gICAgICAgICAgeyBmcm9tOiBcImJcIiwgdXNkOiAyIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKHR4LnRyYW5zZmVycywgMik7XG4gICAgfSk7XG5cbiAgICBpdChcInB1c2goKSBzaG91bGQgYWRkIG5ldyB0cmFuc2ZlcnMgdG8gdGhlIGVuZFwiLCBhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgdHggPSBhd2FpdCBUeC5jcmVhdGUoe1xuICAgICAgICB0cmFuc2ZlcnM6IFt7IGZyb206IFwiYVwiLCB1c2Q6IDEgfV0sXG4gICAgICB9KTtcblxuICAgICAgdHgudHJhbnNmZXJzLnB1c2goeyBmcm9tOiBcImJcIiwgdXNkOiAyIH0pO1xuICAgICAgYXdhaXQgdHguc2F2ZSgpO1xuICAgICAgdHggPSBhd2FpdCBUeC5maW5kQnlJZCh0eC5pZCk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YodHgudHJhbnNmZXJzLCAyKTtcbiAgICAgIHR4LnRyYW5zZmVyc1swXS5mcm9tLnNob3VsZC5lcXVhbChcImFcIik7XG4gICAgICB0eC50cmFuc2ZlcnNbMV0uZnJvbS5zaG91bGQuZXF1YWwoXCJiXCIpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJ1bnNoaWZ0KCkgc2hvdWxkIGFkZCBuZXcgdHJhbnNmZXJzIHRvIHRoZSBlbmRcIiwgYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IHR4ID0gYXdhaXQgVHguY3JlYXRlKHtcbiAgICAgICAgdHJhbnNmZXJzOiBbeyBmcm9tOiBcImFcIiwgdXNkOiAxIH1dLFxuICAgICAgfSk7XG5cbiAgICAgIHR4LnRyYW5zZmVycy51bnNoaWZ0KHsgZnJvbTogXCJiXCIsIHVzZDogMiB9KTtcbiAgICAgIGF3YWl0IHR4LnNhdmUoKTtcbiAgICAgIHR4ID0gYXdhaXQgVHguZmluZEJ5SWQodHguaWQpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKHR4LnRyYW5zZmVycywgMik7XG4gICAgICB0eC50cmFuc2ZlcnNbMF0uZnJvbS5zaG91bGQuZXF1YWwoXCJiXCIpO1xuICAgICAgdHgudHJhbnNmZXJzWzFdLmZyb20uc2hvdWxkLmVxdWFsKFwiYVwiKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdfQ==