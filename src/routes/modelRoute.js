'use strict';

const express = require('express');
const dataModules = require('../models/index');
const basicAuth = require('../middleware/basic')
const bearerAuth = require('../middleware/bearer')
const capabilities = require('../middleware/acl')
const router = express.Router();
const modelParam = require('../middleware/modelParam')

router.param('model', modelParam);

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model',  handleCreate);
router.put('/:model/:id',  handleUpdate);
router.put('/users/:id/status', handleUpdateStatus);
router.delete('/:model/:id',  handleDelete);
router.get('/assignedSubjects/user/:userId', handleGetAssignedSubjectsByUser);
router.get('/assignedSubjects/subject/:subjectId', handleGetAssignedSubjectsBySubject);
router.post('/users/:userId/assignedSubjects/:subjectId', handleCreateRelation);
router.put('/users/:userId/assignedSubjects/:subjectId', handleUpdateRelation);

async function handleGetAll(req, res) {
  let allRecords = await req.model.get();
  res.status(200).json(allRecords);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let theRecord = await req.model.get(id);
  res.status(200).json(theRecord);
}

async function handleCreate(req, res) {
  let obj = req.body;
  let newRecord = await req.model.create(obj);
  res.status(201).json(newRecord);
}
async function handleCreateRelation(req, res) {
  try {
    const { userId, subjectId,subjectName } = req.body;

    // Check if the combination of subject ID and user ID already exists
    const existingRecord = await dataModules.assignedSubjects.model.findOne({ where: {  userId: userId,
      subjectId: subjectId,subjectName:subjectName, } }
       
      
    );

    if (existingRecord) {
      return res.status(400).json({ message: 'Record already exists' });
    }

    // If the combination doesn't exist, proceed with creating a new record
    let newRecord = await dataModules.assignedSubjects.model.create({ userId, subjectId,subjectName });
    res.status(201).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
async function handleUpdateRelation(req, res) {
  try {
    const { obtainedMark,subjectId,userId, subjectName} = req.body;

    // Check if the combination of subject ID and user ID already exists
    const assignedSubjects = await dataModules.assignedSubjects.model.findAll({
      where: {
        subjectName:subjectName,
        userId: userId,
        subjectId:subjectId
      },
    });
   console.log(assignedSubjects[0].dataValues.id)
    const id = assignedSubjects[0].dataValues.id
    const data = {obtainedMark:obtainedMark}
    // If the combination doesn't exist, proceed with creating a new record
    let newRecord = await dataModules.assignedSubjects.model.update(
      { obtainedMark: obtainedMark },
      { where: { id: id } }
    );
    res.status(200).json(newRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
async function handleUpdate(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await req.model.update(id, obj);
  res.status(202).json(updatedRecord);
}

async function handleUpdateStatus(req, res) {
  const userId = req.params.id;
  const { status } = req.body;

  try {
    const user = await dataModules.Users.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the logged-in user has the necessary privileges to update status
    // For example, you might have an isAdmin middleware to check the user's role

    // Update the user's status
    user.status = status;
    await user.save();

    // Respond with the updated user
    res.json({ message: 'User status updated successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleDelete(req, res) {
  let id = req.params.id;
  let deletedRecord = await req.model.delete(id);
  res.status(200).json(deletedRecord);
}
async function handleGetAssignedSubjectsByUser(req, res) {
  const userId = req.params.userId;

  try {
    const assignedSubjects = await dataModules.assignedSubjects.model.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).json(assignedSubjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function handleGetAssignedSubjectsBySubject(req, res) {
  const subjectId = req.params.subjectId;

  try {
    const assignedSubjects = await dataModules.assignedSubjects.findAll({
      where: {
        subjectId: subjectId,
      },
    });

    res.status(200).json(assignedSubjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = router;

