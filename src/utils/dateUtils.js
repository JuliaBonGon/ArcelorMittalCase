import moment from 'moment';

export const formatDate = (dateString) => {
  const articleDate = moment(dateString);
  const now = moment();
  const diffInSeconds = now.diff(articleDate, 'seconds');

 if (diffInSeconds < 45) {
    return 'a few seconds ago';
  } else if (diffInSeconds < 90) {
    return 'a minute ago';
  } else if (diffInSeconds < 45 * 60) {
    return `${Math.round(diffInSeconds / 60)} minutes ago`;
  } else if (diffInSeconds < 90 * 60) {
    return 'an hour ago';
  } else if (diffInSeconds < 21 * 60 * 60) {
    return `${Math.round(diffInSeconds / 3600)} hours ago`;
  } else if (diffInSeconds < 35 * 60 * 60) {
    return 'a day ago';
  } else if (diffInSeconds < 26 * 24 * 60 * 60) {
    return `${Math.round(diffInSeconds / (24 * 60 * 60))} days ago`;
  } else if (diffInSeconds < 45 * 24 * 60 * 60) {
    return 'a month ago';
  } else if (diffInSeconds < 320 * 24 * 60 * 60) {
    return `${Math.round(diffInSeconds / (30 * 24 * 60 * 60))} months ago`;
  } else if (diffInSeconds < 548 * 24 * 60 * 60) {
    return 'a year ago';
  } else {
    return `${Math.round(diffInSeconds / (365 * 24 * 60 * 60))} years ago`;
  }
};
