import routes from "../routes"
import Video from "../models/Video";

// Global Router
// async : 너를 기다려줌// 기본적으로 자바스크립트는 기다려주지 않음.
// 예를 들어 Video를 확인해보라고 하면 확인하지만 끝나기를 기다리지 않음. 바로 다음으로 넘어감
export const home = async (req, res) => {
  try{
    const videos = await Video.find({});
    console.log(videos);
    res.render("home", {pageTitle: "Home", videos});
  } catch(error){
    console.log(error);
    res.render("home", {pageTitle: "Home", videos: [] });
  }
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

export const postUpload = async (req, res) => {
  const {
      body : { title, description },
      file : { path }
    } = req;
    
  // To Do : Upload and save Video 
    const newVideo = await Video.create({
      fileUrl: path,
      title,
      description
    });

    console.log(newVideo);

  res.redirect(routes.videoDetail(newVideo.id));
};


export const videoDetail = (req, res) => 
  res.render("videoDetail", {pageTitle: "Video Detail"});

export const editVideo = (req, res) =>
  res.render("editVideo", {pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => 
  res.render("deleteVideo", {pageTitle: "Delete Video"});