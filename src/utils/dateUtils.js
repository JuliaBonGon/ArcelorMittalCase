import moment from 'moment';
import 'moment/locale/nl'; 

export const formatDate = (dateString, language) => {
  moment.locale(language === 'nl' ? 'nl' : 'en'); 

  const articleDate = moment(dateString);
  const now = moment();
  const diffInSeconds = now.diff(articleDate, 'seconds');
  
  if (diffInSeconds < 45) {
    return language === 'nl' ? 'een paar seconden geleden' : 'a few seconds ago';
  } else if (diffInSeconds < 90) {
    return language === 'nl' ? 'een minuut geleden' : 'a minute ago';
  } else if (diffInSeconds < 45 * 60) {
    return `${Math.round(diffInSeconds / 60)} ${language === 'nl' ? 'minuten geleden' : 'minutes ago'}`;
  } else if (diffInSeconds < 90 * 60) {
    return language === 'nl' ? 'een uur geleden' : 'an hour ago';
  } else if (diffInSeconds < 21 * 60 * 60) {
    return `${Math.round(diffInSeconds / 3600)} ${language === 'nl' ? 'uren geleden' : 'hours ago'}`;
  } else if (diffInSeconds < 35 * 60 * 60) {
    return language === 'nl' ? 'een dag geleden' : 'a day ago';
  } else if (diffInSeconds < 26 * 24 * 60 * 60) {
    return `${Math.round(diffInSeconds / (24 * 60 * 60))} ${language === 'nl' ? 'dagen geleden' : 'days ago'}`;
  } else if (diffInSeconds < 45 * 24 * 60 * 60) {
    return language === 'nl' ? 'een maand geleden' : 'a month ago';
  } else if (diffInSeconds < 320 * 24 * 60 * 60) {
    return `${Math.round(diffInSeconds / (30 * 24 * 60 * 60))} ${language === 'nl' ? 'maanden geleden' : 'months ago'}`;
  } else if (diffInSeconds < 548 * 24 * 60 * 60) {
    return language === 'nl' ? 'een jaar geleden' : 'a year ago';
  } else {
    return `${Math.round(diffInSeconds / (365 * 24 * 60 * 60))} ${language === 'nl' ? 'jaren geleden' : 'years ago'}`;
  }
};
