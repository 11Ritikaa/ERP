import StatusCode from "http-status-codes";
import { standardResponseTemplate as successResponse } from "../utils/response.js";
import {BadRequestError} from "../errors/index.js"
import db from "../models/index.js"


const categoryController = {
    getCategories: async (req, res, next) => {
        try {
            let response = null;
            const data = await db.CategoryModel.findAll({
                where: {
                    parent_id: null
                },
                attributes: ['id', 'name']
            });
            response = successResponse("success", {
                result: data,
                count: data.length,
            });
            return res.status(StatusCode.OK).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    },
    getSubCategories: async (req, res, next) => {
        try {
            let response = null;
            const parent_id = req.params.parentId;
            const data = await db.CategoryModel.findAll({
                where: {
                    parent_id
                },
                attributes: ['id', "name"]
            });
            response = successResponse("success",{
                result: data,
                count: data.length,
            })
            res.status(StatusCode.OK).json(response);

        } catch (error) {
            console.log(error)
            next(error);
        }
    },
    getTaxonomyCategories: async (req, res, next) => {
        try {
            let response = null
            const data = await db.TaxonomyIdModel.findAll({
                attributes: ['id', "name"]
            });
            response = successResponse("success",{
                result: data,
                count: data.length
            });

            return res.status(StatusCode.OK).json(response);

        }catch(error){
            console.error(error);
            next(error)
        }
    },
    createCategory: async (req, res, next) => {
        try {
            let response = null;
            let name = req.body.name;

            if(typeof name !== "string"){
                throw new BadRequestError("Number sent, expected a string")
            }
            name = name.trim().toLowerCase();
            const isValid = /[^a-z0-9 ]/.test(name);
            if(isValid){
                throw new BadRequestError("category name must have any special characters");
            }
            const data = await db.CategoryModel.create({name, parent_id: null});
            response = successResponse("success",{result: data, message: `category ${data.name} created successfully`});
            return res.status(StatusCode.CREATED).json(response);
        }catch(error){
            console.error(error);
            next(error);
        }
    },
    createSubCategory: async (req, res, next) => {
        try{
            let response = null;
            const parentId = req.params.parentId;
            let {name} = req.body;
            if(typeof name !== "string"){
                throw new BadRequestError("Number sent, expected a string")
            }
            name = name.trim().toLowerCase();
            const isValid = /[^a-z0-9 ]/.test(name);

            if(isValid){
                throw new BadRequestError("category name must have any special characters");
            }
            const data = await db.CategoryModel.create({parent_id: parentId, name});
            response = successResponse("success",{result: data, message: `category ${data.name} created successfully`});
            return res.status(StatusCode.CREATED).json(response);

        }catch(error) {
            console.error(error);
            next(error);
        }
    }
}

export default categoryController;