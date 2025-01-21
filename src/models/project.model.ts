import mongoose, { Document, Schema } from "mongoose";

export interface ProjectDoucment extends Document {
  name: string;
  description: string;
  emoji: string;
  workspace: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<ProjectDoucment>({
  name: { type: String, required: true, trim: true },
  emoji: { type: String, required: true, trim: true, default: "📊"},
  description: { type: String, trim: false },
  workspace: { type: Schema.Types.ObjectId, ref: "Workspace", required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, {
    timestamps: true,
});

const ProjectModel = mongoose.model<ProjectDoucment>("Project", projectSchema);
export default ProjectModel;