export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const calculateDiscountPrice = (
  price: number,
  discountPercentage: number
) => {
  let discountedPrice = price - price * (discountPercentage / 100);

  return discountedPrice;
};
