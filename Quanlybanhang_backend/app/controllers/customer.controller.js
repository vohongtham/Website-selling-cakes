const CustomerService = require("../services/customer.services");
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error");


exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const customerService = new CustomerService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await customerService.findByName(name);
        } else {
            documents = await customerService.find({});
        }
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const document = await customerService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(document);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const customerService = new CustomerService(MongoDB.client);
        //console.log(req.body, req.params.id);
        const document = await customerService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Contact not foud"));
        }
        //return res.send({ message: "Contact was updated successfully" });
        return res.send(req.body);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const document = await customerService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Contact not foud"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, `Could not delete contact with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (_req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const deletedCount = await customerService.deleteAll();
        return res.send({
            message: `${deletedCount} contact were deleted successfully`,
        });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while removing contacts")
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const customerService = new CustomerService(MongoDB.client);
        const documents = await customerService.findFavorite();
        return res.send(documents);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while retrieving favorite contacts")
        );
    }
};

exports.create = async (req, res, next) => {
    if (!req.body?.mskh) {
        return next(new ApiError(400, "MSKH can not be empty"));
    }
    try {
        const customerService = new CustomerService(MongoDB.client);
        console.log(req.body);
        const document = await customerService.create(req.body);
        return res.send(document);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
};