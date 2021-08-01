const modelRelations = (sequelize) => {
	const { review, reviews_photo, characteristic, characteristic_review } = sequelize.models;

  review.hasMany(reviews_photo, {
    as: 'photos',
    foreignKey: 'review_id'
  });
  reviews_photo.belongsTo(review, {
    foreignKey: 'review_id'
  });

  characteristic.hasMany(characteristic_review, {
    foreignKey: 'characteristic_id'
  });
  characteristic_review.belongsTo(characteristic, {
    foreignKey: 'characteristic_id'
  })
}

module.exports = { modelRelations };