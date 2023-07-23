
import express  from "express"
import { createNote, deleteNote, getNotes, singleNote, updatedNote } from "../controllers/note.controller";
const router  = express.Router();


router.get("/",  getNotes)
router.post("/", createNote)
router.get("/:id", singleNote)
router.patch("/:id", updatedNote)
router.delete("/:id", deleteNote)

export default router