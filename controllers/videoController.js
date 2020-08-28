import routes from "../routes"
import Video from "../models/Video";

// Global Router
export const home = (req, res) => {
  res.render("home", {pageTitle: "Home", videos});
};

export const search = (req, res) => {
  //const searchingBy = console.log(req.query.term);
  const {
    query: { term: searchingBy}
  } = req;
  res.render("search", {pageTitle: "Search", searchingBy, videos});
};
// Video Router
export const getUpload = (req, res) => 
  res.render("upload", {pageTitle: "Upload"});

export const postUpload = (req, res) => {
  const {
    body : { file, title, description} 
    } = req;
  // To Do : Upload and save Video 
  res.redirect(routes.videoDetail(324393));
};


export const videoDetail = (req, res) => 
  res.render("videoDetail", {pageTitle: "Video Detail"});

export const editVideo = (req, res) =>
  res.render("editVideo", {pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => 
  res.render("deleteVideo", {pageTitle: "Delete Video"});