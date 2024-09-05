const MerchandiseService = require("../services/merchandise.services");
const MongoDB = require("../utils/mongodb.util")
const ApiError = require("../api-error");


exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const merchandiseService = new MerchandiseService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await merchandiseService.findByName(name);
        } else {
            documents = await merchandiseService.find({});
        }
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while retrieving merchandises")
        );
    }
    return res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const merchandiseService = new MerchandiseService(MongoDB.client);
        const document = await merchandiseService.findById(req.params.id);
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
        const merchandiseService = new MerchandiseService(MongoDB.client);
        //console.log(req.body, req.params.id);
        const document = await merchandiseService.update(req.params.id, req.body);
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
        const merchandiseService = new MerchandiseService(MongoDB.client);
        const document = await merchandiseService.delete(req.params.id);
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
        const merchandiseService = new MerchandiseService(MongoDB.client);
        const deletedCount = await merchandiseService.deleteAll();
        return res.send({
            message: `${deletedCount} contact were deleted successfully`,
        });
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while removing merchandises")
        );
    }
};

exports.findAllFavorite = async (_req, res, next) => {
    try {
        const merchandiseService = new MerchandiseService(MongoDB.client);
        const documents = await merchandiseService.findFavorite();
        return res.send(documents);
    } catch (error) {
        console.error(error);
        return next(
            new ApiError(500, "An error occurred while retrieving favorite merchandises")
        );
    }
};

exports.create = async (req, res, next) => {
    if (!req.body?.mshh) {
        return next(new ApiError(400, "MSHH can not be empty"));
    }
    try {
        const merchandiseService = new MerchandiseService(MongoDB.client);
        console.log(req.body);
        const document = await merchandiseService.create(req.body);

        if (document.insertedId) {
            // Trả về kết quả thành công
            return res.send(document);
        } else {
            // Xử lý lỗi cụ thể khi tạo tài liệu không thành công
            return next(new ApiError(500, "Failed to create the contact: " + document.message));
        }
    } catch (error) {
        console.error(error);
        return next(new ApiError(500, "An error occurred while creating the contact: " + error.message));
    }
};