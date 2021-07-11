const router = require("express").Router();
const Relationship = require('../models/relationship');
const Persons = require('../models/persons');

class Graph {
    nodes;

    constructor() {
        this.nodes = {};
    }

    addNode(node) {
        this.nodes[node] = [];
    }

    addEdge(person1, person2) {
        if (!this.nodes[person1] || !this.nodes[person2]) {
            return false;
        }
        if (!this.nodes[person1].includes(person2)) {
            this.nodes[person1].push(person2)
        }
        if (!this.nodes[person2].includes(person1)) {
            this.nodes[person2].push(person1)
        }
    }
    returnNode() {
        return this.nodes
    }

    findPath(p1, p2) {
        const visited = {};
        for (var p in this.nodes) {
            visited[p] = false;
        }
        let path = [];
        path.push(p1);
        const result = this.dfs(visited, p1, p2, path);
        return result;
    }

    dfs(visited, p1, p2, path) {
        //console.log(this.nodes);
        visited[p1] = true;
        let dfsResult = [];
        if (p1 === p2) {
            dfsResult = [...path];
        }
        else {
            let neighbour = this.nodes[p1];
            for (let i = 0; i < neighbour.length; i++) {
                let y = neighbour[i];
                if (visited[y] === false) {
                    visited[y] = true;
                    path.push(y);
                    dfsResult = [...this.dfs(visited, y, p2, path)];
                    if (dfsResult.length) {
                        return dfsResult;
                    }
                    path.pop();
                }
            }
        }
        visited[p1] = false;
        return dfsResult;
    }
}

let g = new Graph();

router.get('/', async (req, res) => {
    console.log('hello');
})

router.post('/saveData', async (req, res) => {
    try {
        let success = false;
        const relations = req.body;
        let result = [];
        await Relationship.remove({});
        for (let i = 0; i < relations.length; i++) {
            let temp = new Relationship({
                firstPerson: relations[i].firstPerson,
                secondPerson: relations[i].secondPerson,
                relation: relations[i].relation,
                conclusion: relations[i].conclusion
            })
            temp = await temp.save();
            result.push(temp);
        }
        if (result) {
            success = true
        } else {
            success = false
        }
        console.log(result);
        res.status(200).json({ success: success });
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
})

// router.post('/addPersons', async (req, res) => {
//     try {
//         console.log(req.body.Peoples);
//         await Persons.remove({});
//         let persons = new Persons({
//             Peoples: req.body.Peoples,
//         })
//         persons = await persons.save();
//         res.status(200).json({ persons });
//     } catch (ex) {
//         console.log(ex);
//         throw ex;
//     }
// })

router.post('/addPersons', async (req, res) => {
    try {
        console.log(req.body);
        const name = req.body.name;
        const existingPerson = await Persons.findOne({ name: name });
        if (existingPerson) {
            const result = {
                message: "person already exists"
            }
            res.status(400).json({ result });
        }
        else {
            let persons = new Persons({
                name: name
            })
            persons = await persons.save();
            const result = await Persons.find({});
            res.status(200).json({ result });
        }
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
})

// router.post('/addRelations', async (req, res) => {
//     try {
//         console.log(req.body);
//         let person = new Relationship({
//             firstPerson: req.body.firstPerson,
//             secondPerson: req.body.secondPerson,
//             relation: req.body.relation,
//             conclusion: req.body.conclusion
//         })
//         relationship = await relationship.save();
//         res.status(200).json({ relationship });
//     } catch (ex) {
//         console.log(ex);
//         throw ex;
//     }
// })

router.get('/getRelations', async (req, res) => {
    try {
        let relationship = await Relationship.find({});
        let persons = await Persons.find({});
        persons.forEach(e => {
            g.addNode(e.name)
        })
        relationship.forEach(e => {
            g.addEdge(e.firstPerson, e.secondPerson)
        })
        const matrix = g.returnNode()
        res.status(200).json({ relationship, persons, matrix });
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
})

router.post('/degreeOfRelation', async (req, res) => {
    try {
        const p1 = req.body[0];
        const p2 = req.body[1];
        const result = g.findPath(p1, p2)
        console.log(result);
        res.status(200).json({ result: result });
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
})

module.exports = router;