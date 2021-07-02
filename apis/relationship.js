const router = require("express").Router();
const Relationship = require('../models/relationship');

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

router.post('/addRelations', async (req, res) => {
    try {
        console.log(req.body);
        let relationship = new Relationship({
            firstPerson: req.body.firstPerson,
            secondPerson: req.body.secondPerson,
            relation: req.body.relation,
            conclusion: req.body.conclusion
        })
        relationship = await relationship.save();
        res.status(200).json({ relationship });
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
})

router.get('/getRelations', async (req, res) => {
    try {
        console.log("you rae in apis now");
        let relationship = await Relationship.find({});
        res.status(200).json({ relationship });
    } catch (ex) {
        console.log(ex);
        throw ex;
    }
})

module.exports = router;