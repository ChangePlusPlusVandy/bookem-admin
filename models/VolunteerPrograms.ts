import mongoose from 'mongoose';

// VolunteerProgramSchema describes what our documents should look like in our VolunteerProgram collections
const VolunteerProgramSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    schools: [{ type: String }],
    programDate: { type: Date, required: true },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'volunteerPrograms',
  }
);

export default mongoose.models.VolunteerProgram ||
  mongoose.model('VolunteerProgram', VolunteerProgramSchema);
