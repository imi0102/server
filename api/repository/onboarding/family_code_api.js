const FamilyCodeModel = require("../../../models/family_code_model");
const ResponseModel = require("../../../models/response_model");

exports.addFamilyCode = async (req, res) => {
    try {
        const { familyCode } = req.body;

        // Check if the family code already exists
        const existingFamilyCode = await FamilyCodeModel.findOne({ familyCode });

        if (existingFamilyCode) {
            res.status(400).json(ResponseModel.error('Family code already exists', 400));
        }

        // Create a new family code document
        const newFamilyCode = new FamilyCodeModel({ familyCode });
        await newFamilyCode.save();
        res.status(200).json(ResponseModel.success(newFamilyCode, 'Family code added successfully'));
    } catch (error) {
        console.error('Failed to add family code:', error);
        res.status(500).json(ResponseModel.error('Failed to add family code'));
    }
};