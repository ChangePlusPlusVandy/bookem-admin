import mongoose from 'mongoose';

// VolunteerFormSchema describes what our documents should look like in our VolunteerForm collections
const VolunteerFormSchema = new mongoose.Schema({
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false, required: true },
  emergencyContact: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true },
  },
  workStatus: { type: String, required: false },
  employer: { type: String, required: false },
  //   trackHours: {type: Boolean, default: false, required: true}
  opportunities: [{ type: String, required: false }],
  createDate: { type: Date, default: Date.now },
});

export default mongoose.models.VolunteerForm ||
  mongoose.model('VolunteerForm', VolunteerFormSchema);
