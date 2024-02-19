const { hasUser } = require('../middlewares/guards');
const { createStone, getAllStones, getStoneById, deleteStoneById, editStoneById, likeStoneById, searchStonesByName } = require('../services/stoneService');
const { errorParser } = require('../utils/errorParser');

const stoneController = require('express').Router();

stoneController.get('/create', hasUser, (req, res) => {
    res.render('create', {
        title: 'Create Page'
    });
});

stoneController.post('/create', hasUser, async (req, res) => {
    try {
        createAndEditStoneDto(req);

        const data = {
            name: req.body.name,
            category: req.body.category,
            color: req.body.color,
            image: req.body.image,
            location: req.body.location,
            formula: req.body.formula,
            description: req.body.description,
            owner: req.userData._id
        }

        await createStone(data);

        res.redirect('/stones/dashboard');

    } catch (err) {
        const errors = errorParser(err);
        res.render('create', {
            errors,
            title: 'Create Page',
            name: req.body.name,
            category: req.body.category,
            color: req.body.color,
            image: req.body.image,
            location: req.body.location,
            formula: req.body.formula,
            description: req.body.description
        });
    }
});

stoneController.get('/dashboard', async (req, res) => {
    try {
        const stones = await getAllStones();
        res.render('dashboard', {
            title: 'Dashboard Page',
            stones
        });
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            title: '404 Page',
            errors
        });
    }
});

stoneController.get('/details/:id', async (req, res) => {
    try {
        const stone = await getStoneById(req.params.id);

        res.render('details', {
            title: 'Details Page',
            stone
        });
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            title: '404 Page',
            errors
        });
    }
});

stoneController.get('/edit/:id', hasUser, async (req, res) => {
    try {
        const stone = await getStoneById(req.params.id);

        if(stone.owner._id != req.userData._id) {
            return res.render('404', {
                title: '404 Page',
                errors: ['Only owner can edit stone']
            });
        }
    
        res.render('edit', {
            title: 'Edit Page',
            stone
        });
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            title: '404 Page',
            errors
        });   
    }
});

stoneController.post('/edit/:id', hasUser, async (req, res) => {
    try {
        createAndEditStoneDto(req);

        const stone = await getStoneById(req.params.id);

        if(stone.owner._id != req.userData._id) {
            return res.render('404', {
                title: '404 Page',
                errors: ['Only owner can edit stone']
            });
        }

        const data = {
            name: req.body.name,
            category: req.body.category,
            color: req.body.color,
            image: req.body.image,
            location: req.body.location,
            formula: req.body.formula,
            description: req.body.description,
            owner: req.userData._id
        }

        await editStoneById(req.params.id, data);

        res.redirect('/stones/details/'+req.params.id);
    } catch (err) {
        const errors = errorParser(err);
        const stone = {
            name: req.body.name,
            category: req.body.category,
            color: req.body.color,
            image: req.body.image,
            location: req.body.location,
            formula: req.body.formula,
            description: req.body.description,
            owner: req.userData._id
        };
        res.render('edit', {
            title: 'Edit Page',
            errors,
            stone
        });   
    }
});


stoneController.get('/delete/:id', hasUser, async (req, res) => {
    try {
        const stone = await getStoneById(req.params.id);

        if (stone.owner._id != req.userData._id) {
            return res.render('404', {
                title: '404 Page',
                errors: ['Only owner can delete stone']
            });
        }

        await deleteStoneById(req.params.id);

        res.redirect('/stones/dashboard');
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            title: '404 Page',
            errors
        });
    }
});

stoneController.get('/like/:id', hasUser, async (req, res) => {
    try {
        const stone = await getStoneById(req.params.id);

        if(stone.owner._id == req.userData._id) {
            return res.render('404', {
                title: '404 Page',
                errors: ['You cant like your own stone']
            });
        }

        if(isLiked(stone.likedList, req.userData._id)) {
            return res.render('404', {
                title: '404 Page',
                errors: ['You already like this stone!!!']
            });
        }
    
        await likeStoneById(req.params.id, req.userData._id);
        
        res.redirect('/stones/details/'+req.params.id);
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            title: '404 Page',
            errors
        });  
    }
});

stoneController.get('/search', async (req, res) => {
    try {
        const stones = await getAllStones();

        res.render('search', {
            title: 'Search Page',
            stones
        });   
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            title: '404 Page',
            errors
        }); 
    }
});

stoneController.post('/search', async (req, res) => {
    try {
        const stones = await searchStonesByName(req.body.name);

        res.render('search', {
            title: 'Search Page',
            stones
        });
           
    } catch (err) {
        const errors = errorParser(err);
        res.render('404', {
            title: '404 Page',
            errors
        }); 
    }
});

module.exports = stoneController;

function createAndEditStoneDto(req) {
    if (req.body.name == '' ||
        req.body.category == '' ||
        req.body.color == '' ||
        req.body.image == '' ||
        req.body.location == '' ||
        req.body.formula == '' ||
        req.body.description == '') {
        throw new Error('all fields are required');
    }

    if(req.body.name.length < 2) {
        throw new Error('The Name should be at least 2 characters');
    }
    if(req.body.category.length < 3) {
        throw new Error('The Category should be at least 3 characters');
    }
    if(req.body.color.length < 2) {
        throw new Error('The Color should be at least 2 characters');
    }
    if(req.body.formula.length < 2 || req.body.formula.length > 30) {
        throw new Error('The Formula should be between 3 and 30 characters');
    }
    if(req.body.location.length < 5 || req.body.location.length > 15) {
        throw new Error('The Location should be between 5 and 15 characters');
    }
    if(req.body.description.length < 10) {
        throw new Error('The Description should be a minimum of 10 characters long');
    }
    const imageRegex = /^(http:\/\/|https:\/\/)/;
    if(!imageRegex.test(req.body.image)) {
        throw new Error('The Stone Image should start with http:// or https://');
    }
}

function isLiked(likedList, userId) {
    for (const like of likedList) {
        if(like._id == userId){
            return true;
        }
    }
    return false;
}