exports.formatRatingsRecommend = (reviews) => {
  let ratings = {};
  let recommend = {};
  reviews.forEach((review) => {
    !ratings[review.rating] ? ratings[review.rating] = 1 : ratings[review.rating]++;
    !recommend[review.recommend] ? recommend[review.recommend] = 1 : recommend[review.recommend]++
  });
  return {
    ratings: ratings,
    recommend: recommend
  }
}

exports.formatCharacteristics = (characteristics) => {
  let formattedCharacteristics = {};
  characteristics.forEach((characteristic) => {
    let value = 0;
    characteristic.characteristic_reviews.forEach((review) => {
      value += review.value;
    })
    value = value / characteristic.characteristic_reviews.length; // round, zero fill, stringify
    formattedCharacteristics[characteristic.name] = {
      id: characteristic.id,
      value: value // add a default value here?
    };
  });
  return formattedCharacteristics;
}