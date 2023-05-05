export const formatDuration = (durationInMinutes) => {
	const hours = Math.floor(durationInMinutes / 60);
	const minutes = durationInMinutes % 60;

	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}`;
};
