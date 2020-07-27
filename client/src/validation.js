exports.capitalize = string => {
  let words = string.split(' ');
  if (words.length >= 2) {
      const capitalizedWords = words.map(word => word[0].toLocaleUpperCase() + word.substring(1).toLocaleLowerCase());
      console.log('cac')
      return capitalizedWords.join(' ');
  } else {
    return string[0].toLocaleUpperCase() + string.substring(1).toLocaleLowerCase();
  }
}