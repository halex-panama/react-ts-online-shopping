import { Link } from "react-router-dom";
import { Products } from "../store/productsSlice";
import { formatPrice, calculateDiscountPrice } from "../utils/formatPrice";
import { star } from "../utils/images";

type Props = {
  product: Products;
};

const ProductCard = ({ product }: Props) => {
  let discountedPrice = calculateDiscountPrice(
    product.price,
    product.discountPercentage
  );

  return (
    <Link to={`/products/${product.id}`}>
      <div className="product-item bg-white border-white hover:border-primary border-2 relative rounded-lg transition-all hover:scale-[1.01]">
        <div className="category-product-card absolute left-[-5px] top-2 bg-primary text-white capitalize text-sm py-1 px-4">
          {product.category}
        </div>
        <div className="product-item-img flex justify-center">
          <img
            className="h-64 overflow-hidden rounded-t-lg"
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className="product-item-info text-base py-3 px-5 text-center font-Manrope">
          <div className="title py-2 capitalize border-b-2 border-black/20">
            {product.title}
          </div>
          <div className="price relative py-2">
            <span className="old-price opacity-70 line-through text-xs">
              {formatPrice(product.price)}
            </span>
            <span className="new-price mx-1 my-0 font-bold text-base">
              {formatPrice(discountedPrice)}
            </span>
            <span className="discount font-semibold text-[13px] text-primary">
              {product.discountPercentage}%
            </span>
          </div>
          <div className="return text-end">
            <span className="flex items-center gap-1 bg-yellow/35 w-fit px-1 text-sm rounded-sm border border-yellow">
              <img src={star} className="h-3" />
              <span>{product.rating}</span>
            </span>
            <span className="text-xs border border-primary text-primary px-1 rounded-sm">
              {product.returnPolicy}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
