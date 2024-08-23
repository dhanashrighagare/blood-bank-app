const express = require('express');
const {
  addBloodToInventoryController,
  getAllBloodRecordsController,
  getBloodByIdController,
  updateBloodRecordController,
  deleteBloodRecordController,
} = require('../controllers/bloodController');
const authMiddelware = require('../middlewares/authMiddelware');

const router = express.Router();

router.post('/add', authMiddelware, addBloodToInventoryController);
router.get('/', authMiddelware, getAllBloodRecordsController);
router.get('/:id', authMiddelware, getBloodByIdController);
router.put('/:id', authMiddelware, updateBloodRecordController);
router.delete('/:id', authMiddelware, deleteBloodRecordController);

module.exports = router;
