const express = require('express');
const pets = require('../services/pets');

const router = new express.Router();


/**
 * Returns all pets from the system that the user has access to
 * 
 * Nam sed condimentum est. Maecenas tempor sagittis sapien, 
 * nec rhoncus sem sagittis sit amet. Aenean at gravida augue, 
 * ac iaculis sem. Curabitur odio lorem, ornare eget elementum 
 * nec, cursus id lectus. Duis mi turpis, pulvinar ac eros ac, 
 * tincidunt varius justo. In hac habitasse platea dictumst. 
 * Integer at adipiscing ante, a sagittis ligula. Aenean 
 * pharetra tempor ante molestie imperdiet. Vivamus id aliquam 
 * diam. Cras quis velit non tortor eleifend sagittis. Praesent 
 * at enim pharetra urna volutpat venenatis eget eget mauris. 
 * In eleifend fermentum facilisis. Praesent enim enim, gravida 
 * ac sodales sed, placerat id erat. Suspendisse lacus dolor, 
 * consectetur non augue vel, vehicula interdum libero. Morbi 
 * euismod sagittis libero sed lacinia.
 * 
 * 
 * Sed tempus felis lobortis leo pulvinar rutrum. Nam mattis 
 * velit nisl, eu condimentum ligula luctus nec. Phasellus 
 * semper velit eget aliquet faucibus. In a mattis elit. 
 * Phasellus vel urna viverra, condimentum lorem id, rhoncus 
 * nibh. Ut pellentesque posuere elementum. Sed a varius odio. 
 * Morbi rhoncus ligula libero, vel eleifend nunc tristique 
 * vitae. Fusce et sem dui. Aenean nec scelerisque tortor. 
 * Fusce malesuada accumsan magna vel tempus. Quisque mollis 
 * felis eu dolor tristique, sit amet auctor felis gravida. Sed 
 * libero lorem, molestie sed nisl in, accumsan tempor nisi. 
 * Fusce sollicitudin massa ut lacinia mattis. Sed vel eleifend 
 * lorem. Pellentesque vitae felis pretium, pulvinar elit eu, 
 * euismod sapien.
 * 
 */
router.get('/', async (req, res, next) => {
  const options = {
    tags: req.query['tags'],
    limit: req.query['limit']
  };

  try {
    const result = await pets.findPets(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Creates a new pet in the store.  Duplicates are allowed
 */
router.post('/', async (req, res, next) => {
  const options = {
    body: req.body
  };

  try {
    const result = await pets.addPet(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * Returns a user based on a single ID, if the user does not 
 * have access to the pet
 */
router.get('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await pets.findPetById(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

/**
 * deletes a single pet based on the ID supplied
 */
router.delete('/:id', async (req, res, next) => {
  const options = {
    id: req.params['id']
  };

  try {
    const result = await pets.deletePet(options);
    res.status(result.status || 200).send(result.data);
  } catch (err) {
    return res.status(500).send({
      status: 500,
      error: 'Server Error'
    });
  }
});

module.exports = router;