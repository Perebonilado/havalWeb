import { UploadChoice } from "../types";
import { AutoStories, AudioFile } from "@mui/icons-material";

export const UploadChoiceData: UploadChoice[] = [
  {
    title: "Book",
    path: "/upload/book",
    icon: <AutoStories sx={{ fill: "#42a5f5", fontSize: 35 }} />,
    isActive: true
  },
  {
    title: "Audio",
    path: "/upload/audio",
    icon: <AudioFile sx={{ fill: "#42a5f5", fontSize: 35 }} />,
    isActive: false
  },
  {
    title: "Video",
    path: "/upload/video",
    icon: <AudioFile sx={{ fill: "#42a5f5", fontSize: 35 }} />,
    isActive: false
  },
];

export const allowedBookGenres: string[] = [
    "religion",
    "drama",
    "fiction",
    "non-fiction",
    "health",
    "comedy",
    "romance",
  ];
  
