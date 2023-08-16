import mongoose from "mongoose";
import jobsModel from "../models/jobsModel.js";
import moment from "moment";

export const createJobController = async (req, res) => {
       //const {position, company} = req.body;

       req.body.createdBy = req.user.userId;
       const job = await jobsModel.create(req.body);
       res.status(201).json({job});
};

export const getAllJobsController = async (req, res) => {
       const {status, workType, search, sortByTime, sortByPosition} = req.query;
       if (sortByTime && sortByPosition){
             return res.status(400).send({message: "both filters can't be used at same time"});
       }

       const queryObject = {
              createdBy: req.user.userId,
       }
       if (status && status !== "all"){
              queryObject.status = status;
       }
       if (workType && workType !== "all"){
              queryObject.workType = workType;
       }
       if (search) {
              queryObject.position = { $regex: search, $options: "i"};
       }

       let queryResult = jobsModel.find(queryObject);

       // sorting here by time
       if (sortByTime === "latest"){
             queryResult = queryResult.sort("-createdAt");
       }
       if (sortByTime === "oldest"){
             queryResult = queryResult.sort("createdAt");
       }

       // ascending or descending order according to position
       if (sortByPosition === "a-z"){
             queryResult = queryResult.sort("position");
       }
       if (sortByPosition === "z-a"){
             queryResult = queryResult.sort("-position");   
       }
       
       // pagination
       const page = Number(req.query.page) || 1;
       const limit = Number(req.query.limit) || 10;

       const skip = (page - 1) * limit;

       queryResult = queryResult.skip(skip).limit(limit);

       // count records
       const totalJobs = await jobsModel.countDocuments(queryResult);
       const numberOfPage = Math.ceil(totalJobs/limit);

       const jobs = await queryResult;

       // const jobs = await jobsModel.find({createdBy: req.user.userId});
       res.status(200).json({
              totalJobs,
              jobs,
              numberOfPage
       });
};

export const updateJobController = async (req, res) => {
       const {id} = req.params;
       const {position, company} = req.body;

       const job = await jobsModel.findOne({_id:id});

       if (!job) {
          return res.status(404).send({
               message: `no job found with this id: ${id}`
              });
       }
       if (req.user.userId !== job.createdBy.toString()) {
           return res.status(403).send({
              message:"not authorized to update this job"
           });
       }

       const updatedJob = await jobsModel.findOneAndUpdate({_id:id}, req.body, {
              new: true,
              runValidators: true
       });

       res.status(200).json({ updatedJob });
};

export const deleteJobController = async (req, res) => {
       const {id} = req.params;

       const job = await jobsModel.findOne({_id:id});
       console.log(job);
       if (!job){
         return res.status(404).send({
              message: `no job found with this id: ${id}`
         });
       }
       if (req.user.userId !== job.createdBy.toString()) {
              return res.status(403).send({
                 message:"not authorized to delete this job"
              });
          }
   
       await job.deleteOne();
       res.status(200).json({
              message: "job deleted successfully"
       });
};

export const jobStatsController = async (req, res) => {
       const stats = await jobsModel.aggregate([
             {
              $match:{
                  createdBy: new mongoose.Types.ObjectId(req.user.userId)
              },
             },
             {
              $group:{
                  _id: "$status",
                  count: { $sum: 1}
              }
             }
       ]);

       // monthly and yearly updates
       let monthlyJobs = await jobsModel.aggregate([
              {
               $match:{
                createdBy: new mongoose.Types.ObjectId(req.user.userId)
              },
              },
              {
               $group:{
                 _id: {
                   year: { $year: "$createdAt"},
                   month: { $month: "$createdAt"},
                      },
                 count: {
                     $sum: 1
                       },
                     },
              },
       ]);

       monthlyJobs = monthlyJobs.map(item => {
             const {_id: {year, month}, count} = item;
             const date = moment().month(month - 1).year(year).format('MMM Y');
             return { date, count};
       }).reverse();

       res.status(200).json({ totalCount:stats.length, stats, monthlyJobs });
}