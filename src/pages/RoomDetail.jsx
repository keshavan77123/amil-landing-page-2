import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import RoomDetailView from '../components/RoomDetailView';
import { roomsData, getRoomById } from '../data/rooms';

export const RoomDetail = () => {
  const { roomId } = useParams();

  const room = roomsData.find((r) => r.id === roomId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [roomId]);

  if (!room) {
    return <Navigate to="/rooms" replace />;
  }

  return (
    <div className="bg-ivory pt-24 pb-20">
      <RoomDetailView room={room} />
    </div>
  );
};

export default RoomDetail;
