function convertToTimestamp(dateString: Date) {
  const timestamp = new Date(dateString).getTime();
  return timestamp;
}
export default convertToTimestamp;
