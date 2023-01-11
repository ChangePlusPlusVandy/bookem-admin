import mongoose from 'mongoose';

// VolunteerProgramApplicationSchema describes what our documents should look like in our VolunteerProgramApplication collections
const VolunteerProgramApplicationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    programId: {
      type: mongoose.Types.ObjectId,
      ref: 'Program',
      required: true,
    },
    formData: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
    collection: 'volunteerProgramApplications',
  }
);

export default mongoose.models.VolunteerProgramApplication ||
  mongoose.model(
    'VolunteerProgramApplication',
    VolunteerProgramApplicationSchema
  );
