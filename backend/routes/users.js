const router = require('express').Router();
let User = require('../models/userModel');

router.route('/').get((req, res)=> {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: "+err));
});

router.route('/:id').get((req, res)=> {
    User.findOne({id: req.params.id})
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: "+err));
});
router.route('/:id').delete((req, res) => {
    User.deleteOne({id: req.params.id})
        .then(()=> res.json("User deleted!"))
        .catch(err => res.status(400).json("Error: "+err));
})
router.route('/search/:query').get((req, res) => {
    User.findOne({$text: {$search: req.params.query}})
        .then(users => res.json(users))
        .catch(err => res.status(400).json("Error: "+err));
})
router.route('/update/:id').post((req, res) => {
    User.findOne({id: req.params.id})
        .then(user => {
            user.id = req.body.id;
            user.name = req.body.name;
            user.save()
                .then(() => res.json("User updated!"))
                .catch(err => res.status(400).json("Error: "+err));
        })
        .catch(err => res.status(400).json("Error: "+err));
})

router.route('/add').post((req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    const newUser = new User({id, name});

    newUser.save()
        .then(() => res.json("User added!"))
        .catch(err => res.status(400).json("Error: "+err));
});



module.exports = router;