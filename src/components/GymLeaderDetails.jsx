import React from 'react';
import EditGymLeaderForm from './EditGymLeaderForm';

const GymLeaderDetails = ({ gymLeader }) => {
  return (
    <div>
      <h2>{gymLeader.name}</h2>
      <p><strong>Gym:</strong> {gymLeader.gym}</p>
      <p><strong>Badge:</strong> {gymLeader.badge}</p>
      <p><strong>Description:</strong> {gymLeader.description}</p>

      <EditGymLeaderForm gymLeaderId={gymLeader._id} />
    </div>
    );
};

export default GymLeaderDetails;
