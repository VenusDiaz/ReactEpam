export const formatDuration = (durationInMinutes) => {
	const hours = Math.floor(durationInMinutes / 60);
	const minutes = durationInMinutes % 60;

	const formattedHours = String(hours).padStart(2, '0');
	const formattedMinutes = String(minutes).padStart(2, '0');

	return `${formattedHours}:${formattedMinutes}`;
};

export const searchCourses = (searchTerm, allCourses) => {
	if (searchTerm !== '')
		return allCourses.filter((course) => {
			const lowercaseQuery = searchTerm.toLowerCase();
			const lowercaseTitle = course.title.toLowerCase();
			const lowercaseId = course.id.toLowerCase();

			return (
				lowercaseTitle.includes(lowercaseQuery) ||
				lowercaseId.includes(lowercaseQuery)
			);
		});
	return allCourses;
};
