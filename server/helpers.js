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
    if (characteristic.characteristic_reviews.length) {
      value = value / characteristic.characteristic_reviews.length;
    }
    // IMPROVE THIS HELPER FUNC
    value = value.toString().split('.');
    let integer = value[0];
    let decimals = !value[1] ? '0000000000000000' : value[1];
    if (decimals.length < 16) {
      while (decimals.length < 16) {
        decimals+='0';
      }
    } else {
      decimals = decimals.slice(0, 16);
    }
    let formattedValue = integer + '.' + decimals;
    formattedCharacteristics[characteristic.name] = {
      id: characteristic.id,
      value: formattedValue === '0.0000000000000000' ? null : formattedValue
    };
  });
  return formattedCharacteristics;
}