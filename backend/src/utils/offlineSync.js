// Offline sync utility for handling queued operations
// Stores pending bookings and syncs when connection restored

const queuedBookings = [];

export function queueBooking(bookingData) {
  const queuedItem = {
    id: `queued-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    data: bookingData,
    timestamp: new Date(),
    status: 'queued'
  };

  queuedBookings.push(queuedItem);
  console.log(`📥 Queued booking: ${queuedItem.id}`);
  
  return queuedItem;
}

export function getQueuedBookings() {
  return queuedBookings;
}

export function removeQueuedBooking(id) {
  const index = queuedBookings.findIndex(item => item.id === id);
  if (index !== -1) {
    queuedBookings.splice(index, 1);
    console.log(`✅ Removed queued booking: ${id}`);
    return true;
  }
  return false;
}

export function clearQueue() {
  queuedBookings.length = 0;
  console.log('🧹 Cleared booking queue');
}
